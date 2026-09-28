const fs = require('fs');
const file = 'src/components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="font-heading font-bold text-sm text-\[\#eeddee\] mb-2 flex items-center justify-between">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*\)\}/;

const replacementBlock = `<div className="font-heading font-bold text-sm text-[#eeddee] mb-2 flex items-center justify-between">
                  <span>Notificaciones {isAdminRoute ? 'del Sistema' : ''}</span>
                  <span className="text-[10px] text-[#bf00ff]">3 nuevas</span>
                </div>
                {isAdminRoute ? (
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-[#261c28] border-l-2 border-red-500">
                      <p className="font-semibold text-white">Alerta de Servidor</p>
                      <p className="text-[11px] text-[#d5c0d7]">Carga elevada en la base de datos.</p>
                    </div>
                    <div className="p-2 rounded bg-[#261c28] border-l-2 border-blue-500">
                      <p className="font-semibold text-white">Nuevos Registros</p>
                      <p className="text-[11px] text-[#d5c0d7]">24 usuarios registrados hoy.</p>
                    </div>
                    <div className="p-2 rounded bg-[#261c28] border-l-2 border-emerald-400">
                      <p className="font-semibold text-white">Pagos Procesados</p>
                      <p className="text-[11px] text-[#d5c0d7]">Se han procesado 50 pagos exitosamente.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-[#261c28] border-l-2 border-[#bf00ff]">
                      <p className="font-semibold text-white">¡Racha de 7 aciertos!</p>
                      <p className="text-[11px] text-[#d5c0d7]">Tu multiplicador aumentó a 1.5x.</p>
                    </div>
                    <div className="p-2 rounded bg-[#261c28] border-l-2 border-[#00f0ff]">
                      <p className="font-semibold text-white">El Clásico Nacional en vivo</p>
                      <p className="flex items-center gap-1.5 text-[11px] text-[#d5c0d7]">
                        <TeamBadge teamId="sap" size="xs" />
                        <span>Saprissa 2 - 1 Alajuelense</span>
                        <TeamBadge teamId="lda" size="xs" />
                        <span>(Min 64)</span>
                      </p>
                    </div>
                    <div className="p-2 rounded bg-[#261c28] border-l-2 border-emerald-400">
                      <p className="font-semibold text-white">Top 5% Alcanzado</p>
                      <p className="text-[11px] text-[#d5c0d7]">¡Estás en la 3ª posición de Costa Rica!</p>
                    </div>
                  </div>
                )}
              </div>
            )}`;

content = content.replace(regex, replacementBlock);
fs.writeFileSync(file, content);
console.log('Regex replace done');
