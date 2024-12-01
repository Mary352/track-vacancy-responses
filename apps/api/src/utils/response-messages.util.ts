import { Request, Response } from 'express';
import { ResponseBody } from '../../types'

export const sendOKMessage = (res: Response, message: any) => {
   const responseBody: ResponseBody = {
      message
   }

   res.json(responseBody);
}

export const sendErrorMessage = (res: Response, status: number, error: any) => {
   const responseBody: ResponseBody = {
      error
   }

   res.status(status).json(responseBody);
}