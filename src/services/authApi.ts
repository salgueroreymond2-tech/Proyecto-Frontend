import type { UserProfile } from '../types';

const SESSION_KEY = 'kas_session_v1';

type ApiUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  favoriteTeamId: string;
  role: 'admin' | 'user';
};

type Session = { token: string; user: ApiUser };

export type AdminSummary = {
  users: Array<Omit<ApiUser, 'role'> & { role: 'admin' | 'user'; createdAt?: string }>;
  memberships: Array<{ id: string; userId: string; tournamentId: string; paymentId: string; status: string; grantedAt: string }>;
  payments: Array<{ id: string; userId: string; tournamentId: string; amount: string; provider: string; status: string; createdAt: string; capturedAt?: string }>;
  sessions: Array<{ userId: string; expiresAt: string; tokenPreview: string }>;
  stats: {
    usersTotal: number;
    adminsTotal: number;
    activeMemberships: number;
    paymentsCaptured: number;
    revenue: string;
    activeSessions: number;
  };
};

function toProfile(user: ApiUser): UserProfile {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`,
    favoriteTeamId: user.favoriteTeamId,
    points: 0,
    exactHits: 0,
    tendencyHits: 0,
    currentStreak: 0,
    maxStreak: 0,
    multiplier: 1,
    accuracyRate: 0,
    level: 1,
    countryRankPercentile: 100,
    unlockedAchievements: [],
    role: user.role,
    isAdmin: user.role === 'admin',
    isEnabled: true,
  };
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const session = getStoredSession();
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(session ? { Authorization: `Bearer ${session.token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(data.error || 'No se pudo completar la solicitud.');
  return data;
}

function saveSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getStoredSession(): Session | null {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) as Session : null;
  } catch {
    return null;
  }
}

export function clearStoredSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function signIn(email: string, password: string) {
  const session = await request<Session>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  saveSession(session);
  return { token: session.token, user: toProfile(session.user) };
}

export async function signUp(input: { email: string; password: string; name: string; username: string; favoriteTeamId: string }) {
  const session = await request<Session>('/auth/register', { method: 'POST', body: JSON.stringify(input) });
  saveSession(session);
  return { token: session.token, user: toProfile(session.user) };
}

export async function simulatePayPalCheckout(tournamentId: string, amount: string) {
  const order = await request<{ order: { id: string } }>('/payments/paypal/orders', {
    method: 'POST',
    body: JSON.stringify({ tournamentId, amount }),
  });
  return request<{ membership: { tournamentId: string } }>(`/payments/paypal/orders/${order.order.id}/capture`, { method: 'POST' });
}

export async function getAdminSummary() {
  return request<AdminSummary>('/admin/summary');
}
