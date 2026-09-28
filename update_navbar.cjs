const fs = require('fs');
const file = 'src/components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

const searchBlock = `                <div className="font-heading font-bold text-sm text-[#eeddee] mb-2 flex items-center justify-between">
                  <span>Notificaciones</span>
                  <span className="text-[10px] text-[#bf00ff]">3 nuevas</span>
                </div>
                <div className="space-y-2">`;

const replacementBlock = `                <div className="font-heading font-bold text-sm text-[#eeddee] mb-2 flex items-center justify-between">
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
                  <div className="space-y-2">`;

content = content.replace(searchBlock, replacementBlock);
content = content.replace(searchBlock.replace(/\r\n/g, '\n'), replacementBlock);

const searchEnd = `                  </div>
                </div>
              </div>
            )}`;

const replacementEnd = `                  </div>
                )}
              </div>
            )}`;

content = content.replace(searchEnd, replacementEnd);
content = content.replace(searchEnd.replace(/\r\n/g, '\n'), replacementEnd);

fs.writeFileSync(file, content);
console.log('Done');
