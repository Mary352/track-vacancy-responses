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
         const jobResponsesArr = await JobResponse.find({});

         sendOKMessage(res, jobResponsesArr)

      } catch (error) {
         console.log('Error finding data: ', error);

         sendErrorMessage(res, 500, 'Error finding data')
      }

      return;
   }

   async create(req: Request, res: Response) {
      try {
         const newJobResponse: JobResponseType = req.body.newJobResponse;

         // only fields "note" and "_id" can be empty
         for (const key in newJobResponse) {
            if (Object.prototype.hasOwnProperty.call(newJobResponse, key)) {
               const element = newJobResponse[key as keyof JobResponseType];
               if (key !== '_id' && key !== 'note' && !element) {
                  sendErrorMessage(res, 422, 'Error data from client. Empty fields found');
                  return;
               }
            }
         }

         const jobResponse = new JobResponse(newJobResponse);
         await jobResponse.save()

         const jobResponsesArr = await JobResponse.find({});

         sendOKMessage(res, jobResponsesArr)

      } catch (error) {
         console.log('Error creating job response: ', error);

         sendErrorMessage(res, 500, 'Error creating job response');
      }

      return;
   }

   async delete(req: Request, res: Response) {
      try {
         const jobResponseId = req.params.id;

         const jobResponse = await JobResponse.findByIdAndDelete(jobResponseId);

         if (jobResponse) {
            const jobResponsesArr = await JobResponse.find({});

            sendOKMessage(res, jobResponsesArr)
         } else {
            sendErrorMessage(res, 404, 'Job response not found')
         }

      } catch (error) {
         console.log('Error finding job response for delete: ', error);

         sendErrorMessage(res, 500, 'Incorrect id')
      }

      return;
   }

   async update(req: Request, res: Response) {
      try {
         const jobResponseId = req.params.id;
         const newJobResponse: JobResponseType = req.body.newJobResponse;

         const jobResponse = await JobResponse.findByIdAndUpdate(jobResponseId, newJobResponse);

         if (jobResponse) {
            const jobResponsesArr = await JobResponse.find({});

            sendOKMessage(res, jobResponsesArr)
         } else {
            sendErrorMessage(res, 404, 'Job response not found')
         }

      } catch (error) {
         console.log('Error finding job response for update: ', error);

         sendErrorMessage(res, 500, 'Incorrect id')
      }

      return;
   }
}

export default new VacancyResponseController();