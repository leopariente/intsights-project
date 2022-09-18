import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { getDB } from './db/mongo';
import { createPageData } from './scrapper';

export const app: Express = express();
app.use(cors());
app.use(json());

const port = process.env.PORT || 4000;

//@ts-ignore
app.get("/", (req: Request, res: Response) => {
  getDB().then(response => res.send(response));
})

app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
  createPageData("*/2 * * * *");
});