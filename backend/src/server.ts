import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { appConfig } from './config/app.config';
import { initAppModules } from './app.module';
import { registerAppRoutes } from './app.route';

import { createServer } from 'http';


const app = express();
const httpServer = createServer(app);



app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const appModules = initAppModules();
registerAppRoutes(app, appModules, appConfig.apiPrefix);

httpServer.listen(appConfig.port, () => {
  console.log(`Server listening on port http://localhost:${appConfig.port}${appConfig.apiPrefix}`);
});