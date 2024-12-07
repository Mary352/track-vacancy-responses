import { JobResponseType } from "api/types"
import { ChangeEvent } from "react"

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

export type TableRowInputProps = {
   getJobResponses(url: string, method: string, body?: any): void
}

export type CreateInputProps = {
   value: string,
   placeholder: string,
   handleChange(e: ChangeEvent<HTMLInputElement>): void,
   errorText: string
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