import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { appConfig } from './config/app.config';
import { initAppModules } from './app.module';
import { registerAppRoutes } from './app.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const appModules = initAppModules();
registerAppRoutes(app, appModules, appConfig.apiPrefix);

app.listen(appConfig.port, () => {
  console.log(`Server listening on port http://localhost:${appConfig.port}${appConfig.apiPrefix}`);
});