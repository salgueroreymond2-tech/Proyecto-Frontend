const resolveAsset = (path: string) => {
  const base = import.meta.env?.BASE_URL || '/';
  if (base === '/') return path;
  return `${base}${path.replace(/^\//, '')}`;
};

export const ASSET_PATHS = {
  logos: {
    brand: {
      kas: resolveAsset('/assets/logos/brand/kas-logo.png'),
      pasionSimplified: resolveAsset('/assets/logos/brand/logo-pasion-simplificado.png'),
      pasion: resolveAsset('/assets/logos/brand/logo-pasion.png'),
      pasionNeon: resolveAsset('/assets/logos/brand/logo-pasion-neon.jpg'),
      kingArthurSvg: resolveAsset('/assets/logos/brand/king_arthur_sports_logo.svg'),
    },
    teams: {
      alajuelense: resolveAsset('/assets/logos/teams/LD_Alajuelense.png'),
    },
  },
  images: {
    sports: {
      football: resolveAsset('/assets/images/sports/football.png'),
      tennis: resolveAsset('/assets/images/sports/tennis.png'),
      basketball: resolveAsset('/assets/images/sports/basketball.png'),
      baseball: resolveAsset('/assets/images/sports/baseball.png'),
      americanFootball: resolveAsset('/assets/images/sports/american-football.png'),
      f1: resolveAsset('/assets/images/sports/f1.png'),
      cycling: resolveAsset('/assets/images/sports/cycling.png'),
      golf: resolveAsset('/assets/images/sports/golf.png'),
      mma: resolveAsset('/assets/images/sports/mma.png'),
      boxing: resolveAsset('/assets/images/sports/boxing.png'),
    },
    generated: {
      hero: resolveAsset('/assets/images/generated/chatgpt_image_sep_21_2026_09_30_38_am.png'),
    },
  },
} as const;
