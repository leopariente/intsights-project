import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { createPageData } from './scrapper';

export const app: Express = express();
app.use(cors());
app.use(json());

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
  createPageData("http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists").then(console.log);
});
