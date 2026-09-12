import 'dotenv/config';
import express  from 'express';
import cors from 'cors';
import { routerClients } from './presentation/https/routers/clients/index.route';
import { containerMain } from './infrastructure/containers/index.container';
const app = express();
const port = process.env.PORT || 5000;
  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const containerClients = containerMain();

routerClients(app,containerClients);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});