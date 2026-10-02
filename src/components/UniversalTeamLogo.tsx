import React from 'react';
import { TeamBadge } from './TeamBadge';
import { TEAMS } from '../data/teams';
import { CUSTOM_ATHLETES } from '../data/customAthletes';

interface UniversalTeamLogoProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-16 w-16 text-base',
};

const normalizeTeamName = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const UniversalTeamLogo: React.FC<UniversalTeamLogoProps> = ({ name, size = 'sm', className = '' }) => {
  const localTeam = TEAMS.find((team) =>
    [team.id, team.code, team.shortName, team.name].some((candidate) => normalizeTeamName(candidate) === normalizeTeamName(name))
  );

  if (localTeam) {
    return <TeamBadge team={localTeam} size={size === 'lg' ? 'lg' : size === 'md' ? 'md' : size} className={className} />;
  }

  const customAthlete = CUSTOM_ATHLETES.find(a => normalizeTeamName(a.displayName || '') === normalizeTeamName(name));

  if (customAthlete && customAthlete.headshot?.href) {
    return (
      <img
        src={customAthlete.headshot.href}
        alt={name}
        className={`object-contain rounded-full border border-white/15 bg-white/5 shadow-inner ${sizeClasses[size]} ${className}`}
        title={name}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 font-heading font-black text-white ${sizeClasses[size]} ${className} ${customAthlete && customAthlete.headshot?.href ? 'hidden' : ''}`}
      title={name}
    >
      {name.slice(0, 3).toUpperCase()}
    </span>
  );
};
