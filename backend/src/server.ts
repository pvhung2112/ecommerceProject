import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { appConfig } from './config/app.config';
import { initAppModules } from './app.module';
import { registerAppRoutes } from './app.route';
import { createServer } from 'http';
import { socketService } from './shared/services/socket/socket.service';
import { connectDatabase } from './shared/database/prisma.client';

const app = express();
const httpServer = createServer(app); 
socketService.getInstance(httpServer);

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const appModules = initAppModules();
registerAppRoutes(app, appModules, appConfig.apiPrefix);

httpServer.listen(appConfig.port,async() => {
  await connectDatabase();
  console.log(`Server listening on port http://localhost:${appConfig.port}${appConfig.apiPrefix}`);
});