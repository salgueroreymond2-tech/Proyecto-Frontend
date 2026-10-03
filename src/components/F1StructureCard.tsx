import React from 'react';
import { ChevronDown } from './Icon';

export function F1StructureCard() {
  return (
    <details className="mt-4 rounded-xl bg-black/25 border border-white/10 group cursor-pointer overflow-hidden transition-all">
      <summary className="px-4 py-4 list-none outline-none relative select-none flex flex-col justify-center [&::-webkit-details-marker]:hidden">
        <div className="pr-10">
          <p className="font-heading text-xl font-black text-white">Los 24 Grand Prix viven dentro del torneo.</p>
          <p className="mt-2 text-sm text-[#d5c0d7]">
            Entra a F1 World Championship para ver Bahrain, Monaco, Las Vegas, Abu Dhabi y el resto del calendario como dashboards internos.
          </p>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
          <ChevronDown className="w-5 h-5 text-white/50 group-open:rotate-180 transition-transform" aria-hidden="true" />
        </div>
      </summary>
      <div className="px-2 pb-2 border-t border-white/10 max-h-64 overflow-y-auto">
        <ul className="space-y-1 mt-2">
          {[
            'Bahrain Grand Prix', 'Saudi Arabian Grand Prix', 'Australian Grand Prix',
            'Japanese Grand Prix', 'Chinese Grand Prix', 'Miami Grand Prix',
            'Emilia Romagna Grand Prix', 'Monaco Grand Prix', 'Canadian Grand Prix',
            'Spanish Grand Prix', 'Austrian Grand Prix', 'British Grand Prix',
            'Hungarian Grand Prix', 'Belgian Grand Prix', 'Dutch Grand Prix',
            'Italian Grand Prix', 'Azerbaijan Grand Prix', 'Singapore Grand Prix',
            'United States Grand Prix', 'Mexico City Grand Prix', 'São Paulo Grand Prix',
            'Las Vegas Grand Prix', 'Qatar Grand Prix', 'Abu Dhabi Grand Prix'
          ].map((gp, i) => (
            <li key={gp} className="flex items-center gap-3 text-sm text-white/80 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-lg transition-colors">
              <span className="text-[#EA7301] font-mono text-xs w-5 text-right opacity-80">{i + 1}</span>
              <span className="font-medium">{gp}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
