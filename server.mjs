import 'dotenv/config';
import express from 'express';
import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const app = express();
const port = Number(process.env.SPORTS_API_PORT || 3100);
const cache = new Map();
const allowedCompetitions = new Set(['CL', 'PL', 'PD', 'SA', 'PPL']);
const databasePath = new URL('./data/db.json', import.meta.url);

app.use(express.json());

async function readDatabase() {
  const raw = await readFile(databasePath, 'utf8');
  return JSON.parse(raw);
}

async function updateDatabase(mutator) {
  const database = await readDatabase();
  const result = await mutator(database);
  await writeFile(databasePath, `${JSON.stringify(database, null, 2)}\n`);
  return result;
}

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  return { salt, hash: scryptSync(password, salt, 64).toString('hex') };
}

function passwordMatches(password, user) {
  const candidate = Buffer.from(hashPassword(password, user.passwordSalt).hash, 'hex');
  const stored = Buffer.from(user.passwordHash, 'hex');
  return candidate.length === stored.length && timingSafeEqual(candidate, stored);
}

function publicUser(user) {
  const { passwordHash, passwordSalt, ...safeUser } = user;
  return safeUser;
}

function createSession(database, userId) {
  const token = randomBytes(32).toString('hex');
  database.sessions = database.sessions.filter((session) => session.expiresAt > new Date().toISOString());
  database.sessions.push({ token, userId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString() });
  return token;
}

async function requireUser(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return response.status(401).json({ error: 'Sesion requerida.' });
  const database = await readDatabase();
  const session = database.sessions.find((item) => item.token === token && item.expiresAt > new Date().toISOString());
  const user = session && database.users.find((item) => item.id === session.userId);
  if (!user) return response.status(401).json({ error: 'Sesion expirada o invalida.' });
  request.database = database;
  request.user = user;
  request.token = token;
  return next();
}

app.post('/api/auth/register', async (request, response) => {
  const { email, password, name, username, favoriteTeamId } = request.body || {};
  if (!email || !password || !name || !username || !favoriteTeamId) return response.status(400).json({ error: 'Completa todos los campos requeridos.' });
  if (String(password).length < 8) return response.status(400).json({ error: 'La contrasena debe tener al menos 8 caracteres.' });

  try {
    const session = await updateDatabase((database) => {
      const normalizedEmail = String(email).trim().toLowerCase();
      const normalizedUsername = `@${String(username).trim().replace(/^@/, '')}`;
      if (database.users.some((user) => user.email === normalizedEmail)) throw new Error('Ese correo ya esta registrado.');
      if (database.users.some((user) => user.username.toLowerCase() === normalizedUsername.toLowerCase())) throw new Error('Ese nombre de usuario ya esta registrado.');
      const passwordData = hashPassword(String(password));
      const user = { id: randomUUID(), email: normalizedEmail, name: String(name).trim(), username: normalizedUsername, favoriteTeamId, role: 'user', createdAt: new Date().toISOString(), passwordHash: passwordData.hash, passwordSalt: passwordData.salt };
      database.users.push(user);
      return { token: createSession(database, user.id), user: publicUser(user) };
    });
    return response.status(201).json(session);
  } catch (error) {
    return response.status(409).json({ error: error instanceof Error ? error.message : 'No se pudo crear la cuenta.' });
  }
});

app.post('/api/auth/login', async (request, response) => {
  const { email, password } = request.body || {};
  const database = await readDatabase();
  const user = database.users.find((item) => item.email === String(email).trim().toLowerCase());
  if (!user || !passwordMatches(String(password || ''), user)) return response.status(401).json({ error: 'Correo o contrasena incorrectos.' });
  const token = await updateDatabase((nextDatabase) => createSession(nextDatabase, user.id));
  return response.json({ token, user: publicUser(user) });
});

app.post('/api/auth/logout', requireUser, async (request, response) => {
  await updateDatabase((database) => { database.sessions = database.sessions.filter((session) => session.token !== request.token); });
  response.status(204).end();
});

app.get('/api/memberships/:tournamentId', requireUser, (request, response) => {
  const membership = request.database.memberships.find((item) => item.userId === request.user.id && item.tournamentId === request.params.tournamentId && item.status === 'active');
  response.json({ active: Boolean(membership), membership: membership || null });
});

app.post('/api/payments/paypal/orders', requireUser, async (request, response) => {
  const { tournamentId, amount } = request.body || {};
  if (!tournamentId || !amount) return response.status(400).json({ error: 'Torneo y monto requeridos.' });
  const order = { id: `SIM-${randomUUID()}`, userId: request.user.id, tournamentId, amount: String(amount), provider: 'paypal-sandbox', status: 'created', createdAt: new Date().toISOString() };
  await updateDatabase((database) => { database.payments.push(order); });
  response.status(201).json({ order });
});

app.post('/api/payments/paypal/orders/:orderId/capture', requireUser, async (request, response) => {
  try {
    const membership = await updateDatabase((database) => {
      const payment = database.payments.find((item) => item.id === request.params.orderId && item.userId === request.user.id);
      if (!payment) throw new Error('Orden no encontrada.');
      payment.status = 'captured';
      payment.capturedAt = new Date().toISOString();
      let record = database.memberships.find((item) => item.userId === request.user.id && item.tournamentId === payment.tournamentId);
      if (!record) {
        record = { id: randomUUID(), userId: request.user.id, tournamentId: payment.tournamentId, paymentId: payment.id, status: 'active', grantedAt: new Date().toISOString() };
        database.memberships.push(record);
      }
      return record;
    });
    response.json({ membership });
  } catch (error) {
    response.status(404).json({ error: error instanceof Error ? error.message : 'No se pudo capturar el pago.' });
  }
});

function getCached(key) {
  const entry = cache.get(key);
  return entry && entry.expiresAt > Date.now() ? entry.body : undefined;
}

async function fetchJson(url, options) {
  const cached = getCached(url);
  if (cached) return cached;

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Proveedor respondio ${response.status}`);

  const body = await response.json();
  cache.set(url, { body, expiresAt: Date.now() + 60_000 });
  return body;
}

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    providers: {
      footballData: Boolean(process.env.FOOTBALL_DATA_API_KEY),
      apiSports: Boolean(process.env.API_SPORTS_KEY),
      ballDontLie: Boolean(process.env.BALLDONTLIE_API_KEY),
    },
  });
});

app.get('/api/football-data/competitions/:competitionCode/matches', async (request, response) => {
  const competitionCode = request.params.competitionCode.toUpperCase();
  if (!allowedCompetitions.has(competitionCode)) {
    return response.status(400).json({ error: 'Competicion no permitida.' });
  }

  const token = process.env.FOOTBALL_DATA_API_KEY;
  if (!token) {
    return response.status(503).json({ error: 'Football-Data.org no esta configurada.' });
  }

  try {
    const body = await fetchJson(
      `https://api.football-data.org/v4/competitions/${competitionCode}/matches`,
      { headers: { 'X-Auth-Token': token } },
    );
    return response.json(body);
  } catch (error) {
    return response.status(502).json({ error: error instanceof Error ? error.message : 'Error consultando Football-Data.org.' });
  }
});

app.listen(port, () => {
  console.log(`KAS sports API listening on http://localhost:${port}`);
});
