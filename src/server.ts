import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { scrap } from './scrapper';

export const app: Express = express();
app.use(cors());
app.use(json());

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
  scrap();
});
