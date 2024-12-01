import { Request, Response } from 'express';
import mongoose from "mongoose";
import 'dotenv/config'
import { ResponseBody } from '../../types'


const Schema = mongoose.Schema;

const jobResponseScheme = new Schema({
   company: String,
   vacancy: String,
   salary_range: String,
   status: String,
   note: String
});

const JobResponse = mongoose.model("job_response", jobResponseScheme);

class VacancyResponseController {

   async getAll(req: Request, res: Response) {
      try {
         const jobResponses = await JobResponse.find({});

         const responseBody: ResponseBody = {
            message: jobResponses
         }

         res.json(responseBody);

      } catch (error) {
         console.log('Error finding data: ', error);
         const responseBody: ResponseBody = {
            error: 'Error finding data'
         }

         res.json(responseBody);
      }

      return;
   }
}

export default new VacancyResponseController();