import { JobResponseType } from "api/types"

export type FetchOptions = {
   method: string,
   headers?: {
      'Content-Type': string
   },
   body?: any
}

export type TableRowProps = {
   jobResponse: JobResponseType,
   getJobResponses(url: string, method: string, body?: any): void
}

export type UpdateBody = {
   newJobResponse: {
      company?: string,
      vacancy?: string,
      salary_range?: string,
      status?: string,
      note: string
   }

}