import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { TeamBadge } from './TeamBadge';
import { getTeamById } from '../data/teams';
import {
  Sparkles,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Flame,
  UserCheck,
  Newspaper,
  CalendarDays,
  BarChart3,
  Clock,
} from './Icon';

interface DashboardViewProps {
  onOpenScorerModal: (matchId: string) => void;
  onOpenAdmin: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenScorerModal,
  onOpenAdmin,
}) => {
  const {
    matches,
    userPredictions,
    setUserPrediction,
    lockPrediction,
    selectedRound,
    setSelectedRound,
    simulateRound,
    fillRandomPredictionsForRound,
    standings,
    leaderboard,
    currentUser,
  } = useTournament();

  const [activeEditingMatchId, setActiveEditingMatchId] = useState<string | null>(null);

  const [newsEvents, setNewsEvents] = React.useState<any[]>([]);
  const [isLoadingNews, setIsLoadingNews] = React.useState(true);

  React.useEffect(() => {
    async function loadNews() {
      setIsLoadingNews(true);
      try {
        const { getSportEvents } = await import('../services/sportsApi');
        const sportsIds = ['football', 'basketball', 'baseball'];
        const results = await Promise.all(sportsIds.map((id) => getSportEvents(id)));
        let allEvents = results.flatMap(r => r.data || []);
        
        if (currentUser?.favoriteTeamId && currentUser.favoriteTeamId !== 'sap') {
          const keyword = currentUser.favoriteTeamId.toLowerCase();
          const favoriteEvents = allEvents.filter(e => 
            e.title.toLowerCase().includes(keyword) || 
            e.league.toLowerCase().includes(keyword)
          );
          const otherEvents = allEvents.filter(e => 
            !e.title.toLowerCase().includes(keyword) && 
            !e.league.toLowerCase().includes(keyword)
          );
          allEvents = [...favoriteEvents, ...otherEvents];
        }

        setNewsEvents(allEvents.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard news', err);
      } finally {
        setIsLoadingNews(false);
      }
    }
    loadNews();
  }, [currentUser]);

  // Filter matches for the selected round
  const roundMatches = matches.filter((m) => m.round === selectedRound);
  const featuredMatch = roundMatches.find((m) => m.isFeatured) || roundMatches[0];
  const restOfMatches = roundMatches.filter((m) => m.id !== featuredMatch?.id);
  const finishedRoundMatches = roundMatches.filter((m) => m.status === 'finished').length;
  const liveRoundMatches = roundMatches.filter((m) => m.status === 'live').length;
  const predictedRoundMatches = roundMatches.filter((m) => {
    const pred = userPredictions[m.id];
    return pred?.homeScore !== null && pred?.homeScore !== undefined && pred?.awayScore !== null && pred?.awayScore !== undefined;
  }).length;
  const lockedRoundMatches = roundMatches.filter((m) => userPredictions[m.id]?.isLocked).length;
  const topStandings = standings.slice(0, 5);
  const topLeaderboard = leaderboard.slice(0, 5);
  const liveTickerMatches = matches
    .filter((m) => m.status === 'live' || m.status === 'finished')
    .slice(0, 8);
  const nextMatches = matches
    .filter((m) => m.status === 'scheduled')
    .slice(0, 4);
  const leaderTeam = getTeamById(standings[0]?.teamId || 'sap');

  // Round label generator
  const getRoundLabel = (r: number) => {
    if (r <= 18) return `Jornada ${r}`;
    if (r === 19) return 'Semifinales - Ida';
    if (r === 20) return 'Semifinales - Vuelta';
    if (r === 21) return 'Final Segunda Fase - Ida';
    if (r === 22) return 'Final Segunda Fase - Vuelta';
    if (r === 23) return 'Gran Final - Ida';
    return 'Gran Final - Vuelta';
  };
  const headlineItems = [
    `${leaderTeam.shortName} lidera la tabla con ${standings[0]?.points ?? 0} puntos`,
    `${currentUser.name} suma ${currentUser.points.toLocaleString('es-CR')} puntos en el ranking KAS`,
    `${predictedRoundMatches} de ${roundMatches.length} pronosticos listos para ${getRoundLabel(selectedRound).toLowerCase()}`,
    liveRoundMatches > 0 ? `${liveRoundMatches} partido${liveRoundMatches > 1 ? 's' : ''} en vivo ahora mismo` : 'La jornada queda abierta para nuevos picks',
  ];

  // Helper to calculate comparison result and points
  const getPredictionComparison = (matchId: string) => {
    const match = matches.find((m) => m.id === matchId);
    const pred = userPredictions[matchId];

    if (!match || match.homeScore === null || match.awayScore === null) {
      return { status: 'pending', text: 'Partido pendiente', badgeColor: 'bg-zinc-800 text-zinc-400', pts: 0 };
    }

    if (!pred || pred.homeScore === null || pred.awayScore === null) {
      return { status: 'no_prediction', text: 'Sin pronóstico registrado', badgeColor: 'bg-zinc-800 text-zinc-400', pts: 0 };
    }

    const isExact = match.homeScore === pred.homeScore && match.awayScore === pred.awayScore;
    const realDiff = match.homeScore - match.awayScore;
    const predDiff = pred.homeScore - pred.awayScore;
    const isTendency = (realDiff > 0 && predDiff > 0) || (realDiff < 0 && predDiff < 0) || (realDiff === 0 && predDiff === 0);

    let pts = 0;
    if (isExact) pts = 300;
    else if (isTendency) pts = 100;

    let scorerBonus = false;
    if (pred.selectedScorer && match.scorers && match.scorers.includes(pred.selectedScorer)) {
      pts += 50;
      scorerBonus = true;
    }

    if (isExact) {
      return {
        status: 'exact',
        text: `¡Marcador Exacto! +${pts} pts${scorerBonus ? ' (+50 Goleador)' : ''}`,
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 glow-cyan-sm',
        pts,
      };
    }

    if (isTendency) {
      return {
        status: 'tendency',
        text: `¡Tendencia Acertada! +${pts} pts${scorerBonus ? ' (+50 Goleador)' : ''}`,
        badgeColor: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50',
        pts,
      };
    }

    return {
      status: 'miss',
      text: 'No acertó (0 pts)',
      badgeColor: 'bg-red-500/20 text-red-300 border border-red-500/40',
      pts: 0,
    };
  };

  return (
    <div className="space-y-5 pb-24 max-w-6xl mx-auto px-4 pt-2">
      <div className="rounded-xl border border-[#3c313e]/70 bg-[#19101c]/90 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[#3c313e]/60 px-3 py-2">
          <span className="rounded-md bg-[#EA7301] px-2 py-1 text-[10px] font-heading font-black uppercase tracking-wide text-black">
            KAS Live
          </span>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {liveTickerMatches.map((match) => {
              const home = getTeamById(match.homeTeamId);
              const away = getTeamById(match.awayTeamId);
              return (
                <button
                  key={match.id}
                  onClick={() => setSelectedRound(match.round)}
                  className="min-w-[178px] rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-left hover:border-[#EA7301]/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#d5c0d7]">
                    <span>J{match.round}</span>
                    <span className={match.status === 'live' ? 'text-[#00f0ff]' : 'text-emerald-300'}>
                      {match.status === 'live' ? `${match.minute}'` : 'Final'}
                    </span>
                  </div>
                  <div className="mt-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm font-heading font-bold text-white">
                    <span className="flex min-w-0 items-center gap-1.5 truncate"><TeamBadge team={home} size="xs" />{home.code}</span>
                    <span className="font-black">{match.homeScore ?? 0} - {match.awayScore ?? 0}</span>
                    <span className="flex min-w-0 items-center justify-end gap-1.5 truncate text-right">{away.code}<TeamBadge team={away} size="xs" /></span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#3c313e]/70 bg-[#19101c]/92 p-4 mb-5">
        <div className="flex items-center gap-2 border-b border-[#3c313e]/60 pb-3">
          <Newspaper className="h-5 w-5 text-[#EA7301]" />
          <h2 className="font-heading text-xl font-black text-white">
            Noticias Para Ti {currentUser?.favoriteTeamId && currentUser.favoriteTeamId !== 'sap' && <span className="text-[#EA7301]">({currentUser.favoriteTeamId})</span>}
          </h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {isLoadingNews ? (
            [1, 2, 3].map((item) => (
              <div key={item} className="h-28 animate-pulse rounded-xl border border-white/10 bg-black/25" />
            ))
          ) : newsEvents.length > 0 ? (
            newsEvents.map((event) => (
              <a
                key={event.id}
                href={event.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-2 rounded-xl border border-white/10 bg-black/25 p-3 hover:border-[#EA7301]/70 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[11px] font-mono uppercase text-[#EA7301]">{event.league}</p>
                  <div className="flex items-center -space-x-1 shrink-0">
                    {event.homeLogo && <img src={event.homeLogo} alt="" className="w-5 h-5 rounded-full border border-black object-contain bg-white/10" />}
                    {event.awayLogo && <img src={event.awayLogo} alt="" className="w-5 h-5 rounded-full border border-black object-contain bg-white/10" />}
                  </div>
                </div>
                <h3 className="font-heading text-sm font-bold leading-tight text-white line-clamp-2">
                  {event.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-mono text-[#d5c0d7]">
                    {event.provider.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-emerald-300">
                    {event.status || 'Activo'}
                  </span>
                </div>
              </a>
            ))
          ) : (
            <p className="text-sm text-[#d5c0d7]">No hay noticias recientes.</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
        <div className="space-y-5 min-w-0">
      {/* Horizontal Round Selector Carousel */}
      <div className="flex items-center justify-between gap-2 bg-[#19101c]/80 p-1.5 rounded-xl border border-[#3c313e]/60">
        <button
          onClick={() => setSelectedRound(Math.max(1, selectedRound - 1))}
          disabled={selectedRound <= 1}
          className="p-1.5 rounded-lg bg-[#221824] hover:bg-[#312733] disabled:opacity-30 text-[#eeddee] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-[260px] sm:max-w-xs">
          {Array.from({ length: 18 }, (_, i) => i + 1).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRound(r)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono shrink-0 transition-all ${
                selectedRound === r
                  ? 'bg-[#bf00ff] text-white font-bold glow-purple-sm'
                  : 'bg-[#221824] text-[#d5c0d7] hover:bg-[#312733]'
              }`}
            >
              J{r}
            </button>
          ))}
          {/* Playoff stages shortcut */}
          <button
            onClick={() => setSelectedRound(19)}
            className={`px-2 py-1 rounded-md text-xs font-mono shrink-0 transition-all ${
              selectedRound >= 19 && selectedRound <= 20
                ? 'bg-[#00f0ff] text-black font-bold glow-cyan-sm'
                : 'bg-[#221824] text-[#00f0ff] hover:bg-[#312733]'
            }`}
          >
            SF
          </button>
          <button
            onClick={() => setSelectedRound(21)}
            className={`px-2 py-1 rounded-md text-xs font-mono shrink-0 transition-all ${
              selectedRound >= 21 && selectedRound <= 22
                ? 'bg-[#00f0ff] text-black font-bold glow-cyan-sm'
                : 'bg-[#221824] text-[#00f0ff] hover:bg-[#312733]'
            }`}
          >
            Final Fase
          </button>
          <button
            onClick={() => setSelectedRound(24)}
            className={`px-2 py-1 rounded-md text-xs font-mono shrink-0 transition-all ${
              selectedRound >= 23
                ? 'bg-amber-400 text-black font-bold'
                : 'bg-[#221824] text-amber-300 hover:bg-[#312733]'
            }`}
          >
            Gran Final
          </button>
        </div>

        <button
          onClick={() => setSelectedRound(Math.min(24, selectedRound + 1))}
          disabled={selectedRound >= 24}
          className="p-1.5 rounded-lg bg-[#221824] hover:bg-[#312733] disabled:opacity-30 text-[#eeddee] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Header of Round */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3c313e]/60 pb-3">
        <div>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>{getRoundLabel(selectedRound)}</span>
            {selectedRound === 5 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#bf00ff]/30 text-[#ecb1ff] border border-[#bf00ff]/60 font-mono">
                Jornada Activa
              </span>
            )}
          </h1>
          <p className="text-sm text-[#d5c0d7]">
            Ingresa tus predicciones antes del pitazo inicial.
          </p>
        </div>

        {/* Action buttons for current round */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fillRandomPredictionsForRound(selectedRound)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#261c28] hover:bg-[#3c313e] text-[#ecb1ff] text-xs font-mono border border-[#bf00ff]/40 transition-all"
            title="Autollenar pronósticos de esta jornada"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#bf00ff]" />
            <span>Autollenar</span>
          </button>

          <button
            onClick={() => simulateRound(selectedRound)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#bf00ff]/20 hover:bg-[#bf00ff]/40 text-white text-xs font-mono border border-[#bf00ff] transition-all glow-purple-sm"
            title="Simular resultados reales de esta jornada"
          >
            <Play className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Simular J{selectedRound}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[#3c313e]/70 bg-[#19101c] p-3">
          <p className="text-[10px] font-mono uppercase text-[#d5c0d7]">Partidos</p>
          <p className="mt-1 text-2xl font-heading font-black text-white">{roundMatches.length}</p>
        </div>
        <div className="rounded-xl border border-[#3c313e]/70 bg-[#19101c] p-3">
          <p className="text-[10px] font-mono uppercase text-[#d5c0d7]">En vivo</p>
          <p className="mt-1 text-2xl font-heading font-black text-[#00f0ff]">{liveRoundMatches}</p>
        </div>
        <div className="rounded-xl border border-[#3c313e]/70 bg-[#19101c] p-3">
          <p className="text-[10px] font-mono uppercase text-[#d5c0d7]">Pronosticos</p>
          <p className="mt-1 text-2xl font-heading font-black text-white">{predictedRoundMatches}/{roundMatches.length}</p>
        </div>
        <div className="rounded-xl border border-[#3c313e]/70 bg-[#19101c] p-3">
          <p className="text-[10px] font-mono uppercase text-[#d5c0d7]">Bloqueados</p>
          <p className="mt-1 text-2xl font-heading font-black text-[#EA7301]">{lockedRoundMatches}</p>
        </div>
      </div>

      {/* PARTIDO ESTELAR (Featured Match - Matching Screenshot 9) */}
      {featuredMatch && (
        <div className="relative rounded-2xl bg-gradient-to-b from-[#221824] to-[#19101c] border-2 border-[#bf00ff]/80 p-5 glow-purple shadow-2xl overflow-hidden">
          {/* Top badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bf00ff]/25 border border-[#bf00ff]/60 text-[11px] font-mono font-bold text-[#ecb1ff]">
              <span className="w-2 h-2 rounded-full bg-[#bf00ff] animate-ping"></span>
              <span>PARTIDO ESTELAR</span>
            </div>

            {featuredMatch.status === 'live' ? (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-[#00f0ff] text-[11px] font-mono font-bold text-[#00f0ff]">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
                <span>EN VIVO ({featuredMatch.minute}')</span>
              </div>
            ) : featuredMatch.status === 'finished' ? (
              <div className="text-xs font-mono text-emerald-400 font-semibold">
                FINALIZADO
              </div>
            ) : (
              <div className="text-xs font-mono text-[#d5c0d7]">
                {featuredMatch.date} • {featuredMatch.time}
              </div>
            )}
          </div>

          {/* Teams and Score inputs */}
          {(() => {
            const homeTeam = getTeamById(featuredMatch.homeTeamId);
            const awayTeam = getTeamById(featuredMatch.awayTeamId);
            const pred = userPredictions[featuredMatch.id] || {
              matchId: featuredMatch.id,
              homeScore: null,
              awayScore: null,
            };
            const comparison = getPredictionComparison(featuredMatch.id);

            return (
              <div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                  {/* Home Team */}
                  <div className="col-span-2 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#140b16] border border-[#3c313e] flex items-center justify-center p-2 mb-2 glow-purple-sm shadow-md">
                      <TeamBadge team={homeTeam} size="lg" />
                    </div>
                    <span className="font-heading font-bold text-lg text-white leading-tight">
                      {homeTeam.code}
                    </span>
                    <span className="text-xs text-[#d5c0d7] hidden sm:block">
                      {homeTeam.shortName}
                    </span>
                  </div>

                  {/* Prediction Boxes in center */}
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#d5c0d7] mb-1.5 text-center">
                      TU PRONÓSTICO
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="15"
                        disabled={pred.isLocked}
                        value={pred.homeScore !== null ? pred.homeScore : ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                          setUserPrediction(featuredMatch.id, val, pred.awayScore);
                        }}
                        placeholder="-"
                        className="w-12 h-14 bg-[#140b16] border-2 border-[#bf00ff] rounded-xl text-center font-heading font-black text-2xl text-white focus:outline-none focus:glow-purple focus:border-white transition-all disabled:opacity-60"
                      />
                      <span className="text-xl font-bold text-[#bf00ff]">-</span>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        disabled={pred.isLocked}
                        value={pred.awayScore !== null ? pred.awayScore : ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                          setUserPrediction(featuredMatch.id, pred.homeScore, val);
                        }}
                        placeholder="-"
                        className="w-12 h-14 bg-[#140b16] border-2 border-[#bf00ff] rounded-xl text-center font-heading font-black text-2xl text-white focus:outline-none focus:glow-purple focus:border-white transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="col-span-2 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#140b16] border border-[#3c313e] flex items-center justify-center p-2 mb-2 glow-purple-sm shadow-md">
                      <TeamBadge team={awayTeam} size="lg" />
                    </div>
                    <span className="font-heading font-bold text-lg text-white leading-tight">
                      {awayTeam.code}
                    </span>
                    <span className="text-xs text-[#d5c0d7] hidden sm:block">
                      {awayTeam.shortName}
                    </span>
                  </div>
                </div>

                {/* Real Match Score if live or finished */}
                {(featuredMatch.homeScore !== null || featuredMatch.status !== 'scheduled') && (
                  <div className="my-3 p-3 rounded-xl bg-[#140b16]/90 border border-[#3c313e] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#d5c0d7]">MARCADOR REAL:</span>
                      <span className="font-heading font-black text-lg text-white">
                        {featuredMatch.homeScore !== null ? featuredMatch.homeScore : 0} -{' '}
                        {featuredMatch.awayScore !== null ? featuredMatch.awayScore : 0}
                      </span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${comparison.badgeColor}`}>
                      {comparison.text}
                    </div>
                  </div>
                )}

                {/* Selected Scorer badge if voted */}
                {pred.selectedScorer && (
                  <div className="mt-2 mb-3 flex items-center justify-center gap-2 p-2 rounded-lg bg-[#bf00ff]/10 border border-[#bf00ff]/30 text-xs text-[#ecb1ff]">
                    <span>⚽ Goleador elegido:</span>
                    <span className="font-bold text-white">{pred.selectedScorer}</span>
                    <span className="text-[10px] text-[#00f0ff] font-mono">(+50 pts si anota)</span>
                  </div>
                )}

                {/* Button VOTAR POR GOLEADOR (matching screenshot 9) */}
                <button
                  onClick={() => onOpenScorerModal(featuredMatch.id)}
                  className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#bf00ff] hover:bg-[#d033ff] text-black font-heading font-extrabold text-base tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg glow-purple transition-all duration-200 active:scale-[0.99]"
                >
                  <span>VOTAR POR GOLEADOR</span>
                  <span className="text-lg">⚽</span>
                </button>

                {/* Lock prediction footer */}
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#d5c0d7]/80">
                  <span>Estadio: {featuredMatch.stadium}</span>
                  <button
                    onClick={() => lockPrediction(featuredMatch.id)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {pred.isLocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-amber-300">Bloqueado</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Bloquear</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* RESTO DE LA JORNADA (Matching Screenshot 9 & 15) */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
          <span>Resto de la Jornada</span>
          <span className="text-xs font-mono font-normal text-[#d5c0d7]">
            ({restOfMatches.length} partidos)
          </span>
        </h2>

        <div className="space-y-3">
          {restOfMatches.map((match) => {
            const homeTeam = getTeamById(match.homeTeamId);
            const awayTeam = getTeamById(match.awayTeamId);
            const pred = userPredictions[match.id] || {
              matchId: match.id,
              homeScore: null,
              awayScore: null,
            };
            const comparison = getPredictionComparison(match.id);
            const isEditing = activeEditingMatchId === match.id;

            return (
              <div
                key={match.id}
                className="rounded-xl bg-[#221824] border border-[#3c313e]/80 hover:border-[#bf00ff]/60 p-4 transition-all duration-200 shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-mono text-[#d5c0d7]">
                    {match.time} • {match.date}
                  </div>
                  {match.status === 'live' && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#00f0ff]">
                      <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></span>
                      <span>EN VIVO ({match.minute}')</span>
                    </div>
                  )}
                  {match.status === 'finished' && (
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      FINALIZADO
                    </span>
                  )}
                </div>

                {/* Match Row */}
                <div className="grid grid-cols-7 items-center gap-2 py-1">
                  {/* Home Team */}
                  <div className="col-span-2 flex items-center gap-2">
                    <TeamBadge team={homeTeam} size="sm" />
                    <div>
                      <span className="font-heading font-bold text-white text-base block leading-tight">
                        {homeTeam.code}
                      </span>
                      <span className="text-[10px] text-[#d5c0d7] hidden sm:block truncate max-w-[80px]">
                        {homeTeam.shortName}
                      </span>
                    </div>
                  </div>

                  {/* Center Scores / Inputs */}
                  <div className="col-span-3 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="15"
                        disabled={pred.isLocked}
                        value={pred.homeScore !== null ? pred.homeScore : ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                          setUserPrediction(match.id, val, pred.awayScore);
                        }}
                        placeholder="-"
                        className="w-10 h-10 bg-[#140b16] border border-[#bf00ff]/60 rounded-lg text-center font-heading font-bold text-lg text-white focus:outline-none focus:border-[#bf00ff] focus:glow-purple-sm disabled:opacity-50"
                      />
                      <span className="text-sm font-bold text-[#bf00ff]">-</span>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        disabled={pred.isLocked}
                        value={pred.awayScore !== null ? pred.awayScore : ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                          setUserPrediction(match.id, pred.homeScore, val);
                        }}
                        placeholder="-"
                        className="w-10 h-10 bg-[#140b16] border border-[#bf00ff]/60 rounded-lg text-center font-heading font-bold text-lg text-white focus:outline-none focus:border-[#bf00ff] focus:glow-purple-sm disabled:opacity-50"
                      />
                    </div>
                    <span className="text-[9px] font-mono text-[#d5c0d7]/70 mt-0.5">
                      Pronóstico
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="col-span-2 flex items-center justify-end gap-2 text-right">
                    <div>
                      <span className="font-heading font-bold text-white text-base block leading-tight">
                        {awayTeam.code}
                      </span>
                      <span className="text-[10px] text-[#d5c0d7] hidden sm:block truncate max-w-[80px]">
                        {awayTeam.shortName}
                      </span>
                    </div>
                    <TeamBadge team={awayTeam} size="sm" />
                  </div>
                </div>

                {/* Comparison banner if match has real score */}
                {match.homeScore !== null && (
                  <div className="mt-2 pt-2 border-t border-[#3c313e]/50 flex items-center justify-between text-xs">
                    <span className="font-mono text-[#d5c0d7]">
                      Real: <strong className="text-white">{match.homeScore} - {match.awayScore}</strong>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${comparison.badgeColor}`}>
                      {comparison.text}
                    </span>
                  </div>
                )}

                {/* Action Buttons: EDITAR / BLOQUEAR (matching screenshot 9) */}
                <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-[#3c313e]/40">
                  <button
                    onClick={() => {
                      if (isEditing) {
                        setActiveEditingMatchId(null);
                      } else {
                        setActiveEditingMatchId(match.id);
                      }
                    }}
                    className="py-1.5 px-3 rounded-lg bg-[#261c28] hover:bg-[#312733] text-xs font-mono font-semibold text-[#eeddee] uppercase tracking-wider transition-colors text-center border border-[#3c313e]"
                  >
                    {isEditing ? 'GUARDAR' : 'EDITAR'}
                  </button>

                  <button
                    onClick={() => lockPrediction(match.id)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 border ${
                      pred.isLocked
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-[#bf00ff]/20 hover:bg-[#bf00ff]/30 text-[#ecb1ff] border-[#bf00ff]/40'
                    }`}
                  >
                    {pred.isLocked ? (
                      <>
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>BLOQUEADO</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3 h-3 text-[#bf00ff]" />
                        <span>BLOQUEAR</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-xl border border-[#3c313e]/70 bg-[#19101c] p-4">
            <div className="flex items-center gap-2 border-b border-[#3c313e]/60 pb-3">
              <Newspaper className="h-4 w-4 text-[#EA7301]" />
              <h2 className="font-heading text-xl font-black text-white">Titulares</h2>
            </div>
            <div className="divide-y divide-[#3c313e]/60">
              {headlineItems.map((item, index) => (
                <p key={item} className="flex items-center gap-2 py-3 text-sm leading-snug text-[#eeddee]">
                  {index === 0 && <TeamBadge team={leaderTeam} size="xs" />}
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-[#3c313e]/70 bg-[#19101c] p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#EA7301]" />
              <h2 className="font-heading text-xl font-black text-white">Tabla UNAFUT</h2>
            </div>
            <div className="mt-3 space-y-2">
              {topStandings.map((standing, index) => {
                const team = getTeamById(standing.teamId);
                return (
                  <div key={standing.teamId} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 rounded-lg bg-black/25 px-3 py-2 text-sm">
                    <span className="w-5 text-xs font-mono text-[#d5c0d7]">{index + 1}</span>
                    <span className="flex min-w-0 items-center gap-2 truncate font-heading font-bold text-white">
                      <TeamBadge team={team} size="xs" />
                      <span className="truncate">{team.shortName}</span>
                    </span>
                    <span className="text-xs text-[#d5c0d7]">DG {standing.goalDifference}</span>
                    <span className="font-mono font-bold text-[#EA7301]">{standing.points}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-[#3c313e]/70 bg-[#19101c] p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-[#EA7301]" />
              <h2 className="font-heading text-xl font-black text-white">Ranking KAS</h2>
            </div>
            <div className="mt-3 space-y-2">
              {topLeaderboard.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between gap-3 rounded-lg bg-black/25 px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-heading font-bold text-white">{index + 1}. {user.name}</p>
                    <p className="text-[11px] text-[#d5c0d7]">{user.exactHits} exactos</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-[#EA7301]">{user.points.toLocaleString('es-CR')}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-[#3c313e]/70 bg-[#19101c] p-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#EA7301]" />
              <h2 className="font-heading text-xl font-black text-white">Agenda</h2>
            </div>
            <div className="mt-3 space-y-2">
              {nextMatches.map((match) => {
                const home = getTeamById(match.homeTeamId);
                const away = getTeamById(match.awayTeamId);
                return (
                  <button
                    key={match.id}
                    onClick={() => setSelectedRound(match.round)}
                    className="w-full rounded-lg bg-black/25 px-3 py-2 text-left hover:bg-black/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#d5c0d7]">
                      <span>J{match.round} · {match.date}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {match.time}</span>
                    </div>
                    <p className="mt-1 flex items-center gap-2 truncate text-sm font-heading font-bold text-white">
                      <TeamBadge team={home} size="xs" /> {home.shortName}
                      <span className="text-[#d5c0d7]">vs</span>
                      <TeamBadge team={away} size="xs" /> {away.shortName}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
