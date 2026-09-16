import 'dotenv/config';

export const appConfig = {
    apiPrefix: process.env.API_PREFIX || "/api/v1",
    port: Number(process.env.PORT) || 3001,
    nodeEnv: process.env.NODE_ENV || "development"
};
