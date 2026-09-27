import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { getTeamById } from '../data/teams';
import { TeamBadge } from './TeamBadge';
import {
  ShieldCheck,
  Users,
  Trophy,
  CalendarDays,
  Trash2,
  Save,
  BadgeDollarSign,
  Database,
  Activity,
  LockKeyhole,
  Server,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    currentUser,
    matches,
    leaderboard,
    socialPosts,
    selectedRound,
    setSelectedRound,
    updateRealMatchScore,
    deleteUser,
    setUserEnabled,
    calculateAllPoints,
  } = useTournament();
  const [activeSection, setActiveSection] = useState<'overview' | 'tournaments' | 'matches' | 'users' | 'dbjson'>('overview');

  if (currentUser.role !== 'admin' && !currentUser.isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-3">
        <ShieldCheck className="w-12 h-12 mx-auto text-red-400" />
        <h1 className="text-2xl font-heading font-black text-white">Acceso restringido</h1>
        <p className="text-sm text-[#d5c0d7]">Esta sección solo está disponible para administradores.</p>
      </div>
    );
  }

  const roundMatches = matches.filter((match) => match.round === selectedRound);
  const finishedMatches = matches.filter((match) => match.status === 'finished').length;
  const activeTournaments = [
    { name: 'UEFA Champions League 2024-2025', sport: 'Futbol Internacional', status: 'En curso', price: '$14.99 USD', clients: '3,420', validity: '42 dias', leader: '150 PTS', token: '#KAS-UCL-25' },
    { name: 'Torneo Clausura UNAFUT Liga Promerica 2025', sport: 'Futbol Costa Rica', status: 'Fecha 18 - Clasico', price: '$19.99 USD', clients: '2,150', validity: '56 dias', leader: 'SAP 2 - 1 LDA', token: '#KAS-CR-904' },
    { name: 'Copa del Cafe 60 Edicion ITF J300', sport: 'Tenis Costa Rica', status: 'Fase final', price: '$9.99 USD', clients: '1,280', validity: '4 dias', leader: 'In-Play', token: '#KAS-ITF-60' },
    { name: 'NBA Playoffs 2025: Western & Eastern Finals', sport: 'Baloncesto USA', status: 'Pre-venta early bird', price: '$11.99 USD', clients: '890', validity: '18 dias', leader: '200 PTS', token: '#KAS-NBA-25' },
  ];
  const adminKpis = [
    { icon: <Users />, label: 'Usuarios totales', value: '24,850', detail: '6,430 tokens VIP activos' },
    { icon: <Trophy />, label: 'Torneos PPT', value: '8', detail: '4 en curso / 4 en preparacion' },
    { icon: <BadgeDollarSign />, label: 'Pases mes', value: '$142,890', detail: '+22.4% vs mes anterior' },
    { icon: <ShieldCheck />, label: 'RBAC Smart', value: '100%', detail: '0 incidentes de expiracion' },
  ];
  const rbacUsers = leaderboard.slice(0, 6).map((user, index) => ({
    ...user,
    roleLabel: user.isAdmin || user.role === 'admin' ? 'SUPERADMIN' : index % 3 === 0 ? 'CLIENTE ACTIVO' : index % 3 === 1 ? 'POR VENCER' : 'USUARIO INVITADO',
    pass: index % 2 === 0 ? 'KAS-UCL-25' : 'KAS-CR-904',
    expiry: index % 3 === 0 ? 'En 41 dias' : index % 3 === 1 ? 'En 3 dias' : 'N/A',
  }));
  const dbLogs = [
    '[2026-09-26 14:35:20] POST /api/v1/tournaments/ucl-2025/passes -> token emitido',
    '[2026-09-26 14:35:19] CRON /rbac/expire-check -> 18 tokens validados',
    '[2026-09-26 14:35:18] PUT /api/v1/scores/unafut/clasico -> marcador actualizado',
    '[2026-09-26 14:35:17] GET /api/v1/users?role=cliente_activo -> 24,850 registros',
  ];

  const handleDelete = (userId: string, userName: string) => {
    if (userId === currentUser.id) return;
    if (confirm(`¿Eliminar a ${userName} de la plataforma?`)) deleteUser(userId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#3c313e] pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Panel protegido
          </div>
          <h1 className="text-3xl font-heading font-black text-white mt-1">Centro de Administración</h1>
          <p className="text-sm text-[#d5c0d7]">Control general de usuarios, resultados y actividad.</p>
        </div>
        <span className="text-xs font-mono text-[#00f0ff]">Sesión: {currentUser.username}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={<Users />} label="Usuarios" value={leaderboard.length} />
        <StatCard icon={<CalendarDays />} label="Partidos" value={matches.length} />
        <StatCard icon={<Trophy />} label="Finalizados" value={finishedMatches} />
        <StatCard icon={<Save />} label="Publicaciones" value={socialPosts.length} />
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-[#3c313e] pb-2">
        {[
          ['overview', 'Resumen'],
          ['tournaments', 'Torneos PPT'],
          ['matches', 'Marcadores'],
          ['users', 'Usuarios/RBAC'],
          ['dbjson', 'db.json REST'],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveSection(id as typeof activeSection)}
            className={`px-4 py-2 rounded-lg text-xs font-mono shrink-0 ${
              activeSection === id ? 'bg-[#bf00ff] text-white' : 'bg-[#221824] text-[#d5c0d7]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-500/10 border border-amber-400/30 rounded-xl p-3">
        <div>
          <p className="text-sm font-bold text-amber-200">Cálculo de puntos</p>
          <p className="text-xs text-[#d5c0d7]">Compara los pronósticos guardados con los resultados finalizados.</p>
        </div>
        <button
          onClick={calculateAllPoints}
          className="px-3 py-2 rounded-lg bg-amber-400 text-black text-xs font-bold shrink-0"
        >
          Ejecutar cálculo
        </button>
      </div>

      {activeSection === 'overview' && (
        <div className="space-y-4">
          <section className="rounded-2xl border border-[#EA7301]/40 bg-[#19001f] p-5 shadow-2xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#EA7301]">Operaciones centralizadas</p>
                <h2 className="mt-2 max-w-xl font-heading text-3xl font-black leading-tight text-white">
                  Consola maestra KAS: usuarios, RBAC, torneos PPT y sincronizacion db.json
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#d5c0d7]">
                  Membresias, pases tokenizados, roles y auditoria REST integrados desde los dashboards del ZIP.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveSection('tournaments')} className="rounded-lg bg-[#EA7301] px-4 py-2 text-xs font-bold text-white">
                  Crear Torneo PPT
                </button>
                <button onClick={() => setActiveSection('users')} className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white">
                  Registrar Usuario
                </button>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {adminKpis.map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[#EA7301]">{kpi.icon}</div>
                  <p className="mt-2 text-[10px] font-mono uppercase text-[#d5c0d7]">{kpi.label}</p>
                  <p className="font-heading text-2xl font-black text-white">{kpi.value}</p>
                  <p className="text-[11px] text-emerald-300">{kpi.detail}</p>
                </div>
              ))}
            </div>
          </section>

        <div className="grid md:grid-cols-2 gap-4">
          <section className="bg-[#19101c] border border-[#3c313e] rounded-2xl p-4 space-y-3">
            <h2 className="font-heading font-bold text-white">Actividad reciente</h2>
            {socialPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center gap-3 border-b border-[#3c313e]/60 pb-2 last:border-0">
                <img src={post.userAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="text-xs text-white truncate">{post.userName}</p>
                  <p className="text-[11px] text-[#d5c0d7] truncate">{post.content}</p>
                </div>
              </div>
            ))}
          </section>
          <section className="bg-[#19101c] border border-[#3c313e] rounded-2xl p-4 space-y-3">
            <h2 className="font-heading font-bold text-white">Top del ranking</h2>
            {leaderboard.slice(0, 5).map((user, index) => (
              <div key={user.id} className="flex items-center justify-between border-b border-[#3c313e]/60 pb-2 last:border-0">
                <span className="text-xs font-mono text-[#00f0ff]">#{index + 1}</span>
                <span className="text-xs text-white flex-1 px-3 truncate">{user.username}</span>
                <span className="text-xs font-mono text-amber-300">{user.points.toLocaleString()} pts</span>
              </div>
            ))}
          </section>
        </div>
        </div>
      )}

      {activeSection === 'tournaments' && (
        <section className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-[#EA7301]">Gestion de Torneos Pay-Per-Tournament</p>
              <h2 className="font-heading text-3xl font-black text-white">Torneos PPT activos</h2>
              <p className="mt-1 text-sm text-[#d5c0d7]">Pases tokenizados, cuotas, vigencia y quiniela lider por torneo.</p>
            </div>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-mono text-emerald-300">
              Bloqueo db.json listo
            </span>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {activeTournaments.map((tournament) => (
              <article key={tournament.name} className="rounded-xl border border-[#EA7301]/30 bg-[#2a0e2e] p-4 text-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-[#EA7301]">{tournament.sport}</p>
                    <h3 className="mt-1 font-heading text-xl font-black leading-tight">{tournament.name}</h3>
                  </div>
                  <span className="rounded-full bg-[#EA7301] px-2.5 py-1 text-[11px] font-mono font-bold text-white">{tournament.price}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <MetricPill label="Clientes" value={tournament.clients} />
                  <MetricPill label="Vigencia" value={tournament.validity} />
                  <MetricPill label="Quiniela" value={tournament.leader} />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                  <span className="text-emerald-300">{tournament.status}</span>
                  <span className="font-mono text-[#d5c0d7]">{tournament.token}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'matches' && (
        <section className="bg-[#19101c] border border-[#00f0ff]/50 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-heading font-bold text-white">Editar marcadores oficiales</h2>
              <p className="text-xs text-[#d5c0d7]">Los cambios actualizan tabla y ranking.</p>
            </div>
            <select
              value={selectedRound}
              onChange={(event) => setSelectedRound(Number(event.target.value))}
              className="bg-[#140b16] border border-[#00f0ff]/60 rounded-lg px-2 py-2 text-xs text-white"
            >
              {Array.from({ length: 24 }, (_, index) => index + 1).map((round) => (
                <option key={round} value={round}>Jornada {round}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            {roundMatches.map((match) => {
              const home = getTeamById(match.homeTeamId);
              const away = getTeamById(match.awayTeamId);
              return (
                <div key={match.id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-[#221824] rounded-xl p-3">
                  <span className="flex items-center justify-end gap-2 text-xs text-white text-right">
                    {home.name}
                    <TeamBadge team={home} size="xs" />
                  </span>
                  <div className="flex items-center gap-1">
                    <ScoreInput value={match.homeScore} onChange={(value) => updateRealMatchScore(match.id, value, match.awayScore, value === null ? 'scheduled' : 'finished')} />
                    <span className="text-white">-</span>
                    <ScoreInput value={match.awayScore} onChange={(value) => updateRealMatchScore(match.id, match.homeScore, value, value === null ? 'scheduled' : 'finished')} />
                  </div>
                  <span className="flex items-center gap-2 text-xs text-white">
                    <TeamBadge team={away} size="xs" />
                    {away.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {activeSection === 'users' && (
        <section className="bg-[#19101c] border border-red-400/40 rounded-2xl p-4 space-y-3">
          <div>
            <h2 className="font-heading font-bold text-white">Directorio institucional de usuarios & RBAC</h2>
            <p className="text-xs text-[#d5c0d7]">Supervision de pases tokenizados, estados de conexion y puntos de prestigio.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <MetricPill label="Todos" value="24,850" />
            <MetricPill label="Activos" value="6,430" />
            <MetricPill label="Invitados" value="18,420" />
            <MetricPill label="Por vencer" value="412" />
          </div>
          {rbacUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 bg-[#221824] rounded-xl p-3">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-[11px] font-mono text-[#d5c0d7] truncate">{user.username} · {user.pass} · {user.expiry}</p>
              </div>
              {user.isAdmin ? (
                <span className="text-[10px] font-mono text-amber-300">{user.roleLabel}</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className={`hidden rounded-full px-2 py-1 text-[10px] font-mono sm:inline ${
                    user.roleLabel === 'CLIENTE ACTIVO' ? 'bg-emerald-500/20 text-emerald-300' :
                    user.roleLabel === 'POR VENCER' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-white/10 text-[#d5c0d7]'
                  }`}>{user.roleLabel}</span>
                  <button
                    onClick={() => setUserEnabled(user.id, !(user.isEnabled ?? true))}
                    className={`px-2 py-1 rounded-md text-[10px] font-mono ${
                      user.isEnabled === false ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {user.isEnabled === false ? 'Habilitar' : 'Deshabilitar'}
                  </button>
                  <button onClick={() => handleDelete(user.id, user.name)} className="p-2 text-red-400 hover:bg-red-950/50 rounded-lg" title="Eliminar usuario">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {activeSection === 'dbjson' && (
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-emerald-400/30 bg-[#17051a] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-mono uppercase text-emerald-300">Streaming live</p>
                <h2 className="font-heading text-2xl font-black text-white">Consola de Auditoria & Sincronizacion db.json REST</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-mono text-emerald-300">24ms</span>
            </div>
            <div className="mt-4 rounded-xl bg-black/30 p-4 font-mono text-xs text-emerald-200">
              {dbLogs.map((log) => (
                <p key={log} className="border-b border-white/10 py-2 last:border-0">{log}</p>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-lg bg-[#EA7301] px-4 py-2 text-xs font-bold text-white">Forzar sincronizacion</button>
              <button className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white">Exportar dump</button>
            </div>
          </div>
          <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
            <h3 className="font-heading text-xl font-black text-white">Inspector de esquema</h3>
            <div className="mt-4 space-y-3">
              <SchemaRow icon={<Database />} label="Endpoints REST" value="12/12 activos" />
              <SchemaRow icon={<LockKeyhole />} label="Integridad RBAC" value="100% OK" />
              <SchemaRow icon={<Server />} label="Auto-sync" value="Cada 15 segundos" />
              <SchemaRow icon={<Activity />} label="Ultimo snapshot" value="1.4 MB" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({ icon, label, value }) => (
  <div className="bg-[#221824] border border-[#3c313e] rounded-xl p-3">
    <div className="text-[#00f0ff] w-5 h-5">{icon}</div>
    <div className="text-2xl font-heading font-black text-white mt-1">{value}</div>
    <div className="text-[10px] font-mono text-[#d5c0d7] uppercase">{label}</div>
  </div>
);

const MetricPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
    <p className="text-[10px] font-mono uppercase text-[#d5c0d7]">{label}</p>
    <p className="mt-0.5 truncate font-heading text-base font-black text-white">{value}</p>
  </div>
);

const SchemaRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-3">
    <div className="flex items-center gap-3">
      <div className="text-[#EA7301]">{icon}</div>
      <span className="text-sm font-bold text-white">{label}</span>
    </div>
    <span className="text-xs font-mono text-emerald-300">{value}</span>
  </div>
);

const ScoreInput: React.FC<{ value: number | null; onChange: (value: number | null) => void }> = ({ value, onChange }) => (
  <input
    type="number"
    min="0"
    max="15"
    value={value ?? ''}
    onChange={(event) => onChange(event.target.value === '' ? null : Number(event.target.value))}
    className="w-10 h-9 bg-[#140b16] border border-[#00f0ff] rounded-lg text-center font-bold text-white"
  />
);
