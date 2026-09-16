import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { appConfig } from './config/app.config';
import { buildAppContainer } from './shared/infrastructure/containers/app.container';
import { registerAppRoutes } from './shared/presentation/routes/app.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const appContainer = buildAppContainer();
registerAppRoutes(app, appContainer, appConfig.apiPrefix);

app.listen(appConfig.port, () => {
  console.log(`Server listening on port http://localhost:${appConfig.port}${appConfig.apiPrefix}`);
});