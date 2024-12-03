export type ResponseBody = {
   error?: string,
   message?: any
}

export type JobResponseType = {
   _id?: string,
   company: string,
   vacancy: string,
   salary_range: string,
   status: string,
   note: string
}