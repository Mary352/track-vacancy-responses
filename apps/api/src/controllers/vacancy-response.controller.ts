import { Request, Response } from 'express';
import mongoose from "mongoose";
import 'dotenv/config'
import { JobResponseType, ResponseBody } from '../../types'
import { sendErrorMessage, sendOKMessage } from '../utils/response-messages.util';

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

         sendOKMessage(res, jobResponses)

      } catch (error) {
         console.log('Error finding data: ', error);

         sendErrorMessage(res, 500, 'Error finding data')
      }

      return;
   }

   async create(req: Request, res: Response) {
      try {
         const newJobResponse: JobResponseType = req.body.newJobResponse;

         // only field "note" can be empty
         for (const key in newJobResponse) {
            if (Object.prototype.hasOwnProperty.call(newJobResponse, key)) {
               const element: string = newJobResponse[key as keyof JobResponseType];
               if (!element && key !== 'note') {
                  sendErrorMessage(res, 422, 'Error data from client. Empty fields found');
                  return;
               }
            }
         }

         const jobResponse = new JobResponse(newJobResponse);
         await jobResponse.save()

         const jobResponses = await JobResponse.find({});

         sendOKMessage(res, jobResponses)

      } catch (error) {
         console.log('Error creating job response: ', error);

         sendErrorMessage(res, 500, 'Error creating job response');
      }

      return;
   }
}

export default new VacancyResponseController();