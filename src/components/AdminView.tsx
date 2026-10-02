import React, { useEffect, useMemo, useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { getTeamById } from '../data/teams';
import { getAdminSummary, type AdminSummary } from '../services/authApi';
import { TeamBadge } from './TeamBadge';
import {
  Activity,
  BadgeDollarSign,
  CalendarDays,
  Database,
  LayoutDashboard,
  LockKeyhole,
  MessageSquare,
  Save,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Trophy,
  Users,
} from './Icon';

type AdminSection = 'overview' | 'analytics' | 'users' | 'memberships' | 'payments' | 'matches' | 'system' | 'roadmap';
export type AdminTournament = {
  id: string;
  name: string;
  sportName: string;
  season: string;
  status: string;
  price: string;
  enabled: boolean;
};

const adminSections: Array<{
  id: AdminSection;
  label: string;
  detail: string;
  icon: React.ReactNode;
}> = [
  { id: 'overview', label: 'Resumen', detail: 'Operacion diaria', icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: 'analytics', label: 'Analitica', detail: 'Ingresos y demanda', icon: <Activity className="h-4 w-4" /> },
  { id: 'users', label: 'Usuarios', detail: 'Roles y cuentas', icon: <Users className="h-4 w-4" aria-hidden="true" /> },
  { id: 'memberships', label: 'Torneos', detail: 'Inventario PPT', icon: <Trophy className="h-4 w-4" aria-hidden="true" /> },
  { id: 'payments', label: 'Pagos', detail: 'Capturas y cobros', icon: <BadgeDollarSign className="h-4 w-4" aria-hidden="true" /> },
  { id: 'matches', label: 'Marcadores', detail: 'Resultados oficiales', icon: <CalendarDays className="h-4 w-4" aria-hidden="true" /> },
  { id: 'system', label: 'Sistema', detail: 'Seguridad y DB', icon: <Server className="h-4 w-4" /> },
  { id: 'roadmap', label: 'Roadmap Admin', detail: 'Secciones recomendadas', icon: <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> },
];

const recommendedAdminAreas = [
  {
    title: 'Operaciones del Torneo',
    priority: 'Alta',
    text: 'Crear temporadas, activar torneos, administrar equipos, fixture, playoffs, marcadores, reglas de puntaje y publicacion de resultados.',
  },
  {
    title: 'Usuarios, Roles y Soporte',
    priority: 'Alta',
    text: 'Buscar usuarios, ver perfil operativo, membresias compradas, estado de cuenta, bloqueo/pausa, soporte y bitacora del usuario.',
  },
  {
    title: 'Membresias y Billing',
    priority: 'Alta',
    text: 'Estado de membresia por torneo, pagos, reintentos, reembolsos, cupones, precios por torneo, vencimientos y conciliacion financiera.',
  },
  {
    title: 'Auditoria y Seguridad',
    priority: 'Alta',
    text: 'Registro de acciones admin, cambios en marcadores, cambios de roles, sesiones activas, permisos por rol y alertas de actividad sensible.',
  },
  {
    title: 'Contenido y Comunidad',
    priority: 'Media',
    text: 'Noticias, banners, proximos torneos, moderacion de foro, reportes de posts, notificaciones push/email y plantillas de comunicacion.',
  },
  {
    title: 'Analitica de Producto',
    priority: 'Media',
    text: 'Embudo membresia -> pago -> quiniela, conversion por torneo, retencion, torneos sin ventas, usuarios activos y engagement por jornada.',
  },
  {
    title: 'Integraciones Deportivas',
    priority: 'Media',
    text: 'Estado de proveedores, importacion de calendarios, logos, validacion de equipos, mapeo de IDs externos y fallback manual.',
  },
  {
    title: 'Configuracion de Plataforma',
    priority: 'Baja',
    text: 'Feature flags, parametros de negocio, textos legales, terminos, mantenimiento, backups, webhooks y llaves API.',
  },
];

export const AdminView: React.FC<{ tournaments?: AdminTournament[] }> = ({ tournaments = [] }) => {
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
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [calculationResult, setCalculationResult] = useState<{
    finishedMatches: number;
    processedUsers: number;
    totalPoints: number;
    calculatedAt: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    getAdminSummary()
      .then((data) => {
        if (!active) return;
        setSummary(data);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setStatus('error');
      });
    return () => {
      active = false;
    };
  }, []);

  if (currentUser.role !== 'admin' && !currentUser.isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-3">
        <ShieldCheck className="w-12 h-12 mx-auto text-red-400" />
        <h1 className="text-2xl font-heading font-black text-white">Acceso restringido</h1>
        <p className="text-sm text-[#d5c0d7]">Esta seccion solo esta disponible para administradores.</p>
      </div>
    );
  }

  const roundMatches = matches.filter((match) => match.round === selectedRound);
  const finishedMatches = matches.filter((match) => match.status === 'finished').length;
  const activeMemberships = summary?.memberships.filter((item) => item.status === 'active') ?? [];
  const capturedPayments = summary?.payments.filter((item) => item.status === 'captured') ?? [];
  const adminUsers = summary?.users.filter((user) => user.role === 'admin') ?? [];
  const recentPayments = [...(summary?.payments ?? [])].reverse().slice(0, 8);
  const recentMemberships = [...(summary?.memberships ?? [])].reverse().slice(0, 8);
  const userById = useMemo(() => new Map((summary?.users ?? []).map((user) => [user.id, user])), [summary]);
  const soldByTournament = useMemo(() => {
    const map = new Map<string, number>();
    activeMemberships.forEach((membership) => map.set(membership.tournamentId, (map.get(membership.tournamentId) ?? 0) + 1));
    return map;
  }, [activeMemberships]);
  const salesAnalytics = useMemo(() => {
    const paymentRevenue = new Map<string, number>();
    capturedPayments.forEach((payment) => {
      paymentRevenue.set(payment.tournamentId, (paymentRevenue.get(payment.tournamentId) ?? 0) + parseMoney(payment.amount));
    });

    const rows = tournaments.map((tournament) => {
      const sold = soldByTournament.get(tournament.id) ?? 0;
      const unitPrice = parseMoney(tournament.price);
      const realizedRevenue = paymentRevenue.get(tournament.id) ?? 0;
      return {
        ...tournament,
        sold,
        unitPrice,
        realizedRevenue,
        estimatedRevenue: sold * unitPrice,
      };
    });

    const soldRows = rows.filter((row) => row.sold > 0);
    const topTournament = [...soldRows].sort((a, b) => b.sold - a.sold || b.realizedRevenue - a.realizedRevenue)[0];
    const lowestTournament = [...soldRows].sort((a, b) => a.sold - b.sold || a.realizedRevenue - b.realizedRevenue)[0];
    const noSales = rows.filter((row) => row.sold === 0);
    const totalRevenue = capturedPayments.reduce((total, payment) => total + parseMoney(payment.amount), 0);
    const totalPotentialOneEach = rows.reduce((total, row) => total + row.unitPrice, 0);
    const averageTicket = capturedPayments.length > 0 ? totalRevenue / capturedPayments.length : 0;
    const averageMembershipsPerTournament = rows.length > 0 ? activeMemberships.length / rows.length : 0;

    const bySport = aggregateRows(rows, 'sportName');
    const bySeason = aggregateRows(rows, 'season');
    const concentration = totalRevenue > 0 && topTournament ? (topTournament.realizedRevenue / totalRevenue) * 100 : 0;
    const monthly = buildMonthlyAnalytics(capturedPayments, activeMemberships, rows);
    const bestRevenueMonth = [...monthly].sort((a, b) => b.revenue - a.revenue)[0];
    const bestMembershipMonth = [...monthly].sort((a, b) => b.memberships - a.memberships)[0];

    return {
      rows,
      bySport,
      bySeason,
      monthly,
      bestRevenueMonth,
      bestMembershipMonth,
      topTournament,
      lowestTournament,
      noSales,
      totalRevenue,
      totalPotentialOneEach,
      averageTicket,
      averageMembershipsPerTournament,
      concentration,
    };
  }, [activeMemberships.length, capturedPayments, soldByTournament, tournaments]);

  const handleDelete = (userId: string, userName: string) => {
    if (userId === currentUser.id) return;
    if (confirm(`Eliminar a ${userName} de la plataforma?`)) deleteUser(userId);
  };

  const handleRunCalculation = () => {
    calculateAllPoints();
    const finished = matches.filter((match) => match.homeScore !== null && match.awayScore !== null && match.status === 'finished');
    setCalculationResult({
      finishedMatches: finished.length,
      processedUsers: leaderboard.length,
      totalPoints: leaderboard.reduce((total, user) => total + user.points, 0),
      calculatedAt: new Date().toLocaleString(),
    });
  };

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#08040a] px-3 pb-24 pt-4 sm:px-5">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="rounded-2xl border border-[#EA7301]/35 bg-[#150b17] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#EA7301]">
                <ShieldCheck className="h-4 w-4" />
                Consola administrativa KAS
              </div>
              <h1 className="mt-2 font-heading text-4xl font-black leading-none text-white sm:text-5xl">Centro de Administracion</h1>
              <p className="mt-2 max-w-3xl text-sm text-[#d5c0d7]">
                Vista operativa para usuarios, membresias pay-per-tournament, pagos, sesiones, marcadores oficiales y auditoria del sistema.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
              <p className="text-[10px] font-mono uppercase text-white/45">Sesion admin</p>
              <p className="font-heading text-xl font-black text-white">{currentUser.username}</p>
              <p className="text-xs text-emerald-300">{status === 'ready' ? 'db.json conectado' : status === 'loading' ? 'cargando datos' : 'datos locales fallback'}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <AdminKpi icon={<Users />} label="Usuarios" value={summary?.stats.usersTotal ?? leaderboard.length} detail={`${adminUsers.length || 1} admin`} />
          <AdminKpi icon={<Trophy />} label="Torneos" value={tournaments.length} detail={`${summary?.stats.activeMemberships ?? activeMemberships.length} membresias`} />
          <AdminKpi icon={<BadgeDollarSign />} label="Ingresos" value={formatCurrency(salesAnalytics.totalRevenue)} detail={`${summary?.stats.paymentsCaptured ?? capturedPayments.length} pagos`} />
          <AdminKpi icon={<Server />} label="Sesiones" value={summary?.stats.activeSessions ?? 0} detail="tokens activos" />
          <AdminKpi icon={<CalendarDays />} label="Partidos" value={matches.length} detail={`${finishedMatches} finalizados`} />
          <AdminKpi icon={<Save />} label="Actividad" value={socialPosts.length} detail="posts sociales" />
        </section>

        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-[#3c313e] bg-[#120915] p-3">
              <div className="mb-3 px-2">
                <p className="text-xs font-mono uppercase text-[#EA7301]">Navegacion admin</p>
                <p className="text-sm text-[#d5c0d7]">Control operativo KAS</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
                {adminSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex min-h-[64px] items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors ${
                      activeSection === section.id
                        ? 'border-[#EA7301] bg-[#EA7301] text-black'
                        : 'border-white/10 bg-white/5 text-[#d5c0d7] hover:border-[#EA7301]/60 hover:bg-white/10'
                    }`}
                  >
                    <span className="shrink-0">{section.icon}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-heading text-sm font-black">{section.label}</span>
                      <span className={`block truncate text-[11px] ${activeSection === section.id ? 'text-black/70' : 'text-[#d5c0d7]/70'}`}>
                        {section.detail}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-5">
            <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 p-3 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-amber-200">Calculo de puntos</p>
                <p className="text-xs text-[#d5c0d7]">Recalcula rankings con resultados oficiales finalizados.</p>
              </div>
              <button onClick={handleRunCalculation} className="mt-3 rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-black sm:mt-0">
                Ejecutar calculo
              </button>
            </div>
            {calculationResult && (
              <div className="grid gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-3 sm:grid-cols-4">
                <SummaryRow label="Ultimo calculo" value={calculationResult.calculatedAt} />
                <SummaryRow label="Partidos evaluados" value={String(calculationResult.finishedMatches)} />
                <SummaryRow label="Usuarios procesados" value={String(calculationResult.processedUsers)} />
                <SummaryRow label="Puntos en ranking" value={calculationResult.totalPoints.toLocaleString()} />
              </div>
            )}

        {activeSection === 'overview' && (
          <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <Panel title="Operacion General" eyebrow="Resumen ejecutivo">
              <div className="grid gap-3 sm:grid-cols-2">
                <SummaryRow label="Usuarios registrados" value={String(summary?.stats.usersTotal ?? leaderboard.length)} />
                <SummaryRow label="Administradores" value={String(summary?.stats.adminsTotal ?? adminUsers.length)} />
                <SummaryRow label="Membresias activas" value={String(summary?.stats.activeMemberships ?? activeMemberships.length)} />
                <SummaryRow label="Ticket promedio" value={formatCurrency(salesAnalytics.averageTicket)} />
                <SummaryRow label="Torneo que mas vende" value={salesAnalytics.topTournament?.name ?? 'Sin ventas'} />
                <SummaryRow label="Torneo que menos vende" value={salesAnalytics.lowestTournament?.name ?? 'Sin ventas'} />
                <SummaryRow label="Potencial base 1x torneo" value={formatCurrency(salesAnalytics.totalPotentialOneEach)} />
                <SummaryRow label="Concentracion lider" value={`${salesAnalytics.concentration.toFixed(1)}%`} />
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-mono uppercase text-[#EA7301]">Ultimos pagos</p>
                <div className="mt-3 space-y-2">
                  {recentPayments.slice(0, 5).map((payment) => (
                    <PaymentRow key={payment.id} payment={payment} userName={userById.get(payment.userId)?.username ?? payment.userId} />
                  ))}
                  {recentPayments.length === 0 && <EmptyText text="Aun no hay pagos registrados." />}
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <MiniRanking title="Ventas por deporte" rows={salesAnalytics.bySport.slice(0, 6)} />
                <MiniRanking title="Ventas por temporada" rows={salesAnalytics.bySeason.slice(0, 6)} />
              </div>
            </Panel>

            <Panel title="Ranking y Comunidad" eyebrow="Actividad visible">
              <div className="space-y-3">
                {leaderboard.slice(0, 5).map((user, index) => (
                  <div key={user.id} className="flex items-center gap-3 rounded-xl bg-black/25 px-3 py-2">
                    <span className="w-7 text-xs font-mono text-[#EA7301]">#{index + 1}</span>
                    <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">{user.username}</p>
                      <p className="text-xs text-[#d5c0d7]">{user.points.toLocaleString()} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </section>
        )}

        {activeSection === 'analytics' && (
          <section className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <SummaryRow label="Mejor mes por ingresos" value={`${salesAnalytics.bestRevenueMonth?.label ?? 'N/A'} · ${formatCurrency(salesAnalytics.bestRevenueMonth?.revenue ?? 0)}`} />
              <SummaryRow label="Mejor mes por membresias" value={`${salesAnalytics.bestMembershipMonth?.label ?? 'N/A'} · ${salesAnalytics.bestMembershipMonth?.memberships ?? 0}`} />
              <SummaryRow label="Visualizaciones estimadas" value={String(salesAnalytics.monthly.reduce((total, item) => total + item.views, 0).toLocaleString())} />
              <SummaryRow label="Conversion estimada" value={`${estimateConversionRate(activeMemberships.length, salesAnalytics.monthly.reduce((total, item) => total + item.views, 0)).toFixed(2)}%`} />
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <BarChart
                title="Ingresos por mes"
                subtitle="Pagos capturados agrupados por fecha de creacion"
                rows={salesAnalytics.monthly.map((item) => ({ label: item.label, value: item.revenue, display: formatCurrency(item.revenue) }))}
              />
              <BarChart
                title="Membresias vendidas por mes"
                subtitle="Membresias activas agrupadas por fecha de alta"
                rows={salesAnalytics.monthly.map((item) => ({ label: item.label, value: item.memberships, display: `${item.memberships} mem.` }))}
              />
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <BarChart
                title="Visualizaciones estimadas por mes"
                subtitle="Modelo operativo temporal hasta conectar analytics real"
                rows={salesAnalytics.monthly.map((item) => ({ label: item.label, value: item.views, display: item.views.toLocaleString() }))}
              />
              <Panel title="Lectura Ejecutiva" eyebrow="Ventas y demanda">
                <div className="space-y-3 text-sm text-[#d5c0d7]">
                  <p>
                    El mejor momento del ano por ingresos es <strong className="text-white">{salesAnalytics.bestRevenueMonth?.label ?? 'N/A'}</strong>.
                  </p>
                  <p>
                    El mejor momento por volumen de membresias es <strong className="text-white">{salesAnalytics.bestMembershipMonth?.label ?? 'N/A'}</strong>.
                  </p>
                  <p>
                    Los torneos sin ventas son oportunidades de activacion comercial: bundles, descuentos de apertura o featured placement.
                  </p>
                  <p>
                    Las visualizaciones se estiman con una regla simple basada en inventario, membresias y pagos. Para precision real conviene registrar page views por ruta.
                  </p>
                </div>
              </Panel>
            </div>
          </section>
        )}

        {activeSection === 'users' && (
          <Panel title="Usuarios y Roles" eyebrow="RBAC">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="text-xs uppercase text-[#d5c0d7]">
                  <tr>
                    <th className="px-3 py-2">Usuario</th>
                    <th className="px-3 py-2">Correo</th>
                    <th className="px-3 py-2">Rol</th>
                    <th className="px-3 py-2">Equipo</th>
                    <th className="px-3 py-2">Creado</th>
                    <th className="px-3 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(summary?.users ?? []).map((user) => (
                    <tr key={user.id} className="border-t border-white/10">
                      <td className="px-3 py-3 font-bold text-white">{user.username}</td>
                      <td className="px-3 py-3 text-[#d5c0d7]">{user.email}</td>
                      <td className="px-3 py-3"><StatusPill value={user.role} tone={user.role === 'admin' ? 'amber' : 'blue'} /></td>
                      <td className="px-3 py-3 text-[#d5c0d7]">{user.favoriteTeamId}</td>
                      <td className="px-3 py-3 text-[#d5c0d7]">{formatDate(user.createdAt)}</td>
                      <td className="px-3 py-3">
                        {user.role === 'admin' ? (
                          <span className="text-xs text-amber-300">Protegido</span>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={() => setUserEnabled(user.id, false)} className="rounded-md bg-white/10 px-2 py-1 text-xs text-white">Pausar</button>
                            <button onClick={() => handleDelete(user.id, user.username)} className="rounded-md bg-red-500/15 p-1.5 text-red-300"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {activeSection === 'memberships' && (
          <Panel title="Todos los Torneos de la Plataforma" eyebrow="Inventario Pay-Per-Tournament">
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              <SummaryRow label="Torneos registrados" value={String(tournaments.length)} />
              <SummaryRow label="Torneos activos" value={String(tournaments.filter((item) => item.status === 'Activo').length)} />
              <SummaryRow label="Membresias vendidas" value={String(activeMemberships.length)} />
              <SummaryRow label="Ingreso capturado" value={formatCurrency(salesAnalytics.totalRevenue)} />
              <SummaryRow label="Promedio por torneo" value={salesAnalytics.averageMembershipsPerTournament.toFixed(2)} />
              <SummaryRow label="Sin ventas" value={String(salesAnalytics.noSales.length)} />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="text-xs uppercase text-[#d5c0d7]">
                  <tr>
                    <th className="px-3 py-2">Torneo</th>
                    <th className="px-3 py-2">Deporte</th>
                    <th className="px-3 py-2">Temporada</th>
                    <th className="px-3 py-2">Estado</th>
                    <th className="px-3 py-2">Precio</th>
                    <th className="px-3 py-2">Vendidas</th>
                    <th className="px-3 py-2">Ingreso</th>
                    <th className="px-3 py-2">Acceso</th>
                  </tr>
                </thead>
                <tbody>
                  {salesAnalytics.rows.map((tournament) => (
                    <tr key={tournament.id} className="border-t border-white/10">
                      <td className="px-3 py-3">
                        <p className="font-bold text-white">{tournament.name}</p>
                        <p className="text-xs font-mono text-[#d5c0d7]">{tournament.id}</p>
                      </td>
                      <td className="px-3 py-3 text-[#d5c0d7]">{tournament.sportName}</td>
                      <td className="px-3 py-3 text-[#d5c0d7]">{tournament.season}</td>
                      <td className="px-3 py-3">
                        <StatusPill value={tournament.status} tone={tournament.status === 'Activo' || tournament.status === 'Premium' ? 'green' : 'amber'} />
                      </td>
                      <td className="px-3 py-3 font-heading font-black text-white">{tournament.price}</td>
                      <td className="px-3 py-3 text-[#d5c0d7]">{tournament.sold}</td>
                      <td className="px-3 py-3 text-[#d5c0d7]">{formatCurrency(tournament.realizedRevenue || tournament.estimatedRevenue)}</td>
                      <td className="px-3 py-3">
                        {tournament.enabled ? <StatusPill value="dashboard" tone="blue" /> : <StatusPill value="membresia" tone="amber" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-mono uppercase text-[#EA7301]">Ultimas membresias emitidas</p>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {recentMemberships.map((membership) => (
                  <article key={membership.id} className="rounded-xl border border-white/10 bg-black/25 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-mono uppercase text-[#EA7301]">{membership.tournamentId}</p>
                        <h3 className="mt-1 font-heading text-xl font-black text-white">{userById.get(membership.userId)?.username ?? membership.userId}</h3>
                      </div>
                      <StatusPill value={membership.status} tone="green" />
                    </div>
                    <p className="mt-3 text-xs text-[#d5c0d7]">Pago: {membership.paymentId}</p>
                    <p className="text-xs text-[#d5c0d7]">Otorgado: {formatDate(membership.grantedAt)}</p>
                  </article>
                ))}
              </div>
            </div>
          </Panel>
        )}

        {activeSection === 'payments' && (
          <Panel title="Pagos y Capturas" eyebrow="Finanzas sandbox">
            <div className="space-y-2">
              {recentPayments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} userName={userById.get(payment.userId)?.username ?? payment.userId} expanded />
              ))}
            </div>
          </Panel>
        )}

        {activeSection === 'matches' && (
          <Panel title="Marcadores Oficiales" eyebrow="Costa Rica Primera Division">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-[#d5c0d7]">Edita resultados oficiales y estados de jornada.</p>
              <select
                value={selectedRound}
                onChange={(event) => setSelectedRound(Number(event.target.value))}
                className="rounded-lg border border-[#EA7301]/60 bg-[#140b16] px-2 py-2 text-xs text-white"
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
                  <div key={match.id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl bg-black/25 p-3">
                    <span className="flex items-center justify-end gap-2 text-right text-xs text-white">
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
          </Panel>
        )}

        {activeSection === 'roadmap' && (
          <Panel title="Secciones Recomendadas para KAS" eyebrow="Investigacion aplicada">
            <div className="mb-5 rounded-xl border border-[#EA7301]/25 bg-[#EA7301]/10 p-4 text-sm text-[#eeddee]">
              <p>
                Para KAS, el admin debe comportarse como back-office operativo: resolver usuarios, membresias, pagos,
                torneos, resultados, seguridad y contenido sin mezclar tareas de soporte con analitica de marketing.
              </p>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {recommendedAdminAreas.map((area) => (
                <article key={area.title} className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {area.title.includes('Seguridad') ? <LockKeyhole className="h-4 w-4 text-[#EA7301]" /> : area.title.includes('Contenido') ? <MessageSquare className="h-4 w-4 text-[#EA7301]" /> : <SlidersHorizontal className="h-4 w-4 text-[#EA7301]" aria-hidden="true" />}
                      <h3 className="font-heading text-lg font-black text-white">{area.title}</h3>
                    </div>
                    <StatusPill value={area.priority} tone={area.priority === 'Alta' ? 'green' : area.priority === 'Media' ? 'amber' : 'blue'} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#d5c0d7]">{area.text}</p>
                </article>
              ))}
            </div>
          </Panel>
        )}

        {activeSection === 'system' && (
          <section className="grid gap-4 lg:grid-cols-2">
            <Panel title="Sesiones Activas" eyebrow="Seguridad">
              <div className="space-y-2">
                {(summary?.sessions ?? []).slice(-10).reverse().map((session) => (
                  <div key={`${session.userId}-${session.tokenPreview}-${session.expiresAt}`} className="flex items-center justify-between rounded-xl bg-black/25 px-3 py-2">
                    <div>
                      <p className="text-sm font-bold text-white">{userById.get(session.userId)?.username ?? session.userId}</p>
                      <p className="text-xs text-[#d5c0d7]">{session.tokenPreview}</p>
                    </div>
                    <span className="text-xs text-emerald-300">{formatDate(session.expiresAt)}</span>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Estado del Sistema" eyebrow="Infraestructura">
              <SchemaRow icon={<Database />} label="Base local" value="data/db.json" />
              <SchemaRow icon={<Server />} label="API admin" value={status === 'ready' ? 'online' : 'fallback'} />
              <SchemaRow icon={<Activity />} label="Proveedor pagos" value="paypal-sandbox" />
              <SchemaRow icon={<ShieldCheck />} label="RBAC" value="role=admin requerido" />
            </Panel>
          </section>
        )}
          </div>
      </div>
      </div>
    </div>
  );
};

function AdminKpi({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string | number; detail: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#150b17] p-4">
      <div className="text-[#EA7301]">{icon}</div>
      <p className="mt-2 text-[10px] font-mono uppercase text-[#d5c0d7]">{label}</p>
      <p className="font-heading text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-emerald-300">{detail}</p>
    </div>
  );
}

function Panel({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#3c313e] bg-[#150b17] p-5">
      <p className="text-xs font-mono uppercase text-[#EA7301]">{eyebrow}</p>
      <h2 className="mt-1 font-heading text-2xl font-black text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
      <p className="text-xs text-[#d5c0d7]">{label}</p>
      <p className="font-heading text-xl font-black text-white sm:text-2xl">{value}</p>
    </div>
  );
}

function MiniRanking({ title, rows }: { title: string; rows: Array<{ key: string; sold: number; revenue: number }> }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-mono uppercase text-[#EA7301]">{title}</p>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.key} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm">
            <span className="truncate font-bold text-white">{row.key}</span>
            <span className="text-xs text-[#d5c0d7]">{row.sold} mem.</span>
            <span className="font-mono text-xs text-emerald-300">{formatCurrency(row.revenue)}</span>
          </div>
        ))}
        {rows.length === 0 && <p className="text-sm text-[#d5c0d7]">Sin datos todavia.</p>}
      </div>
    </div>
  );
}

function BarChart({ title, subtitle, rows }: { title: string; subtitle: string; rows: Array<{ label: string; value: number; display: string }> }) {
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <section className="rounded-2xl border border-[#3c313e] bg-[#150b17] p-5">
      <p className="text-xs font-mono uppercase text-[#EA7301]">{subtitle}</p>
      <h2 className="mt-1 font-heading text-2xl font-black text-white">{title}</h2>
      <div className="mt-5 space-y-3">
        {rows.map((row) => {
          const width = `${Math.max((row.value / max) * 100, row.value > 0 ? 8 : 2)}%`;
          return (
            <div key={row.label} className="grid grid-cols-[52px_1fr_82px] items-center gap-3">
              <span className="text-xs font-mono text-[#d5c0d7]">{row.label}</span>
              <div className="h-7 overflow-hidden rounded-full bg-black/35">
                <div className="flex h-full items-center justify-end rounded-full bg-[#EA7301] px-2 text-[10px] font-bold text-black" style={{ width }}>
                  {row.value > 0 ? row.display : ''}
                </div>
              </div>
              <span className="text-right text-xs font-mono text-white">{row.display}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const PaymentRow: React.FC<{ payment: AdminSummary['payments'][number]; userName: string; expanded?: boolean }> = ({ payment, userName, expanded = false }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{userName} · {payment.tournamentId}</p>
          <p className="truncate text-xs text-[#d5c0d7]">{payment.id}</p>
        </div>
        <div className="text-right">
          <p className="font-heading text-lg font-black text-white">{payment.amount}</p>
          <StatusPill value={payment.status} tone={payment.status === 'captured' ? 'green' : 'amber'} />
        </div>
      </div>
      {expanded && <p className="mt-2 text-xs text-[#d5c0d7]">{payment.provider} · creado {formatDate(payment.createdAt)} · capturado {formatDate(payment.capturedAt)}</p>}
    </div>
  );
};

function StatusPill({ value, tone }: { value: string; tone: 'green' | 'amber' | 'blue' }) {
  const classes = {
    green: 'bg-emerald-400/15 text-emerald-300',
    amber: 'bg-amber-400/15 text-amber-300',
    blue: 'bg-sky-400/15 text-sky-300',
  };
  return <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-mono uppercase ${classes[tone]}`}>{value}</span>;
}

function SchemaRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-3">
      <div className="flex items-center gap-3">
        <div className="text-[#EA7301]">{icon}</div>
        <span className="text-sm font-bold text-white">{label}</span>
      </div>
      <span className="text-xs font-mono text-emerald-300">{value}</span>
    </div>
  );
}

function EmptyText({ text }: { text: string }) {
  return <p className="rounded-xl border border-white/10 bg-black/25 px-3 py-3 text-sm text-[#d5c0d7]">{text}</p>;
}

function ScoreInput({ value, onChange }: { value: number | null; onChange: (value: number | null) => void }) {
  return (
    <input
      type="number"
      min="0"
      max="15"
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value === '' ? null : Number(event.target.value))}
      className="h-9 w-10 rounded-lg border border-[#EA7301] bg-[#140b16] text-center font-bold text-white"
    />
  );
}

function formatDate(value?: string) {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString();
}

function parseMoney(value: string) {
  const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function aggregateRows<T extends { sold: number; realizedRevenue: number; estimatedRevenue: number }>(rows: Array<T & Record<string, string>>, key: string) {
  const map = new Map<string, { key: string; sold: number; revenue: number }>();
  rows.forEach((row) => {
    const group = row[key] || 'Sin clasificar';
    const current = map.get(group) ?? { key: group, sold: 0, revenue: 0 };
    current.sold += row.sold;
    current.revenue += row.realizedRevenue || row.estimatedRevenue;
    map.set(group, current);
  });
  return [...map.values()].sort((a, b) => b.revenue - a.revenue || b.sold - a.sold);
}

function buildMonthlyAnalytics(
  payments: AdminSummary['payments'],
  memberships: AdminSummary['memberships'],
  tournamentRows: Array<{ id: string; unitPrice: number; sold: number }>
) {
  const now = new Date();
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(now.getFullYear(), index, 1);
    return {
      key: `${date.getFullYear()}-${String(index + 1).padStart(2, '0')}`,
      label: date.toLocaleDateString('es-CR', { month: 'short' }).replace('.', ''),
      revenue: 0,
      memberships: 0,
      views: 0,
    };
  });
  const byKey = new Map(months.map((month) => [month.key, month]));

  payments.forEach((payment) => {
    const key = getMonthKey(payment.createdAt);
    const month = byKey.get(key);
    if (month) month.revenue += parseMoney(payment.amount);
  });

  memberships.forEach((membership) => {
    const key = getMonthKey(membership.grantedAt);
    const month = byKey.get(key);
    if (month) month.memberships += 1;
  });

  const activeTournamentCount = Math.max(tournamentRows.filter((row) => row.unitPrice > 0).length, 1);
  months.forEach((month, index) => {
    const seasonalMultiplier = [0, 1, 7, 8, 9, 10].includes(index) ? 1.28 : [4, 5].includes(index) ? 1.12 : 0.92;
    month.views = Math.round((activeTournamentCount * 38 + month.memberships * 220 + month.revenue * 7) * seasonalMultiplier);
  });

  return months;
}

function getMonthKey(value?: string) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function estimateConversionRate(memberships: number, views: number) {
  return views > 0 ? (memberships / views) * 100 : 0;
}
