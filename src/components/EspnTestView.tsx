import React, { useEffect, useState } from 'react';

const ESPN_LEAGUES = [
  { sport: 'soccer', league: 'crc.1', name: 'Liga Promerica (Costa Rica)' },
  { sport: 'soccer', league: 'esp.1', name: 'LaLiga (Fútbol)' },
  { sport: 'soccer', league: 'eng.1', name: 'Premier League (Fútbol)' },
  { sport: 'basketball', league: 'nba', name: 'NBA (Baloncesto)' },
  { sport: 'mma', league: 'ufc', name: 'UFC (Artes Marciales Mixtas)' },
  { sport: 'football', league: 'nfl', name: 'NFL (Fútbol Americano)' },
];

export const EspnTestView: React.FC = () => {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results: Record<string, any> = {};
      const getPast30Days = () => {
        const dates = [];
        for (let i = 0; i <= 30; i++) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          dates.push(d.toISOString().split('T')[0].replace(/-/g, ''));
        }
        return dates;
      };

      for (const req of ESPN_LEAGUES) {
        if (req.sport === 'soccer') {
          // Extraemos los 30 dias, agrupando las peticiones en pequeños lotes para no saturar al navegador
          const dates = getPast30Days();
          let allEvents: any[] = [];
          
          for (let i = 0; i < dates.length; i += 5) {
            const chunk = dates.slice(i, i + 5);
            const fetches = chunk.map(date => fetch(`https://site.api.espn.com/apis/site/v2/sports/${req.sport}/${req.league}/scoreboard?dates=${date}`).then(r => r.json()).catch(() => ({})));
            const responses = await Promise.all(fetches);
            allEvents = [...allEvents, ...responses.flatMap((r: any) => r.events || [])];
          }
          
          results[req.name] = allEvents;
        } else {
          try {
            const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${req.sport}/${req.league}/scoreboard`);
            const json = await response.json();
            results[req.name] = json.events || [];
          } catch (error) {
            console.error(`Error fetching ${req.name}:`, error);
            results[req.name] = [];
          }
        }
      }

      setData(results);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#120913] text-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#EA7301] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 font-mono text-sm text-[#EA7301]">Consultando ESPN API...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120913] p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 font-heading text-4xl font-black text-[#EA7301]">Monitor en Vivo ESPN API</h1>
        <p className="mb-8 text-[#d5c0d7]">Esta página demuestra que la API pública de ESPN devuelve datos en tiempo real de múltiples deportes sin necesidad de claves de acceso.</p>

        <div className="space-y-10">
          {Object.entries(data).map(([leagueName, events]) => (
            <div key={leagueName} className="rounded-2xl border border-white/10 bg-[#1a0f1c] p-6">
              <h2 className="mb-6 font-heading text-2xl font-bold text-white">{leagueName}</h2>
              
              {events.length === 0 ? (
                <p className="text-[#d5c0d7]">No hay eventos programados en los próximos días para esta liga.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event: any) => {
                    const matchStatus = event.status.type.state; // 'pre', 'in', 'post'
                    const date = new Date(event.date).toLocaleString('es-CR', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                    
                    return (
                      <div key={event.id} className="rounded-xl border border-white/5 bg-black/40 p-4">
                        <p className="mb-2 text-xs font-mono text-[#EA7301]">
                          {matchStatus === 'in' ? '🔴 EN VIVO' : matchStatus === 'post' ? 'FINALIZADO' : 'PROGRAMADO'} • {date}
                        </p>
                        
                        <div className="space-y-3">
                          {event.competitions[0].competitors.map((competitor: any) => {
                            const entity = competitor.team || competitor.athlete;
                            const logoUrl = entity?.logo || entity?.headshot?.href || 'https://via.placeholder.com/24';
                            const name = entity?.displayName || entity?.shortDisplayName || 'Competidor';
                            
                            return (
                              <div key={competitor.id || name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <img src={logoUrl} alt={name} className="h-6 w-6 object-contain" />
                                  <span className={`font-bold ${competitor.winner ? 'text-white' : 'text-[#d5c0d7]'}`}>{name}</span>
                                </div>
                                <span className="font-heading text-lg font-black">{competitor.score || '-'}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
