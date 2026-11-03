import 'dotenv/config';

export const appConfig = {
    apiPrefix: process.env.API_PREFIX || '/api',
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    apiFrontend: process.env.API_FRONTEND
};
