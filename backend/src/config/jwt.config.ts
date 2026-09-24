import 'dotenv/config';
export const JWT_CONFIG = {
  ACCESS: {
    SECRET: process.env.ACCESS_TOKEN_SECRET,
    EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  },
  REFRESH: {
    SECRET: process.env.REFRESH_TOKEN_SECRET ,
    EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  },
};