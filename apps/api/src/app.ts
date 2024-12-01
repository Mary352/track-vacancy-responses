import express, { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";
import 'dotenv/config'
import VacancyResponseRoutes from './routes/vacancy-response.routes';
import { ResponseBody } from '../types';

const app = express();
const port = 3001;
let timerId: ReturnType<typeof setTimeout>;

app.use('/vacancyresponse', async (req: Request, res: Response, next: NextFunction) => {
   try {
      await mongoose.connect(process.env.DATABASE_URL || '');

      // renew timer on every request where need data from DB
      if (timerId) {
         clearTimeout(timerId);
         console.log(`Clear timeout for DB disconnection timer`);
      }

      // disconnection from DB after 5 mins inaction
      timerId = setTimeout(async () => {
         await mongoose.disconnect();
         console.log("Disconnected from DB");
      }, 5 * 60 * 1000)

   } catch (error) {
      console.log('Connection error: ', error);
      const responseBody: ResponseBody = {
         error: 'DB connection error'
      }

      res.json(responseBody);
   }

   next()
});

app.use('/vacancyresponse', VacancyResponseRoutes);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))