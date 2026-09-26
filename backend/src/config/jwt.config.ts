import 'dotenv/config';

const parseDurationToMs = (duration: string | undefined): number => {
  if (!duration) return 0;
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 0;

  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case 's': return value * 1000;
    case 'm': return value * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    case 'd': return value * 24 * 60 * 60 * 1000;
    default: return 0;
  }
};

export const JWT_CONFIG = {
  ACCESS: {
    SECRET: process.env.ACCESS_TOKEN_SECRET,
    EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
    MAX_AGE_MS: parseDurationToMs(process.env.ACCESS_TOKEN_EXPIRATION),
  },
  REFRESH: {
    SECRET: process.env.REFRESH_TOKEN_SECRET,
    EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
    MAX_AGE_MS: parseDurationToMs(process.env.REFRESH_TOKEN_EXPIRATION),
  },
};