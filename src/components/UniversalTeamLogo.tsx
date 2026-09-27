import React from 'react';
import { getExternalTeamLogo } from '../data/teamLogos';
import { TeamBadge } from './TeamBadge';
import { TEAMS } from '../data/teams';

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
  const [imgError, setImgError] = React.useState(false);
  const localTeam = TEAMS.find((team) =>
    [team.id, team.code, team.shortName, team.name].some((candidate) => normalizeTeamName(candidate) === normalizeTeamName(name))
  );

  if (localTeam) {
    return <TeamBadge team={localTeam} size={size === 'lg' ? 'lg' : size === 'md' ? 'md' : size} className={className} />;
  }

  const logo = getExternalTeamLogo(name);

  if (logo && !imgError) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center ${sizeClasses[size]} ${className}`}
        title={logo.name}
      >
        <img
          src={logo.logoUrl}
          alt={logo.name}
          className="h-full w-full select-none object-contain drop-shadow-md"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 font-heading font-black text-white ${sizeClasses[size]} ${className}`}
      title={name}
    >
      {name.slice(0, 3).toUpperCase()}
    </span>
  );
};
