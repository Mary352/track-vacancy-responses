'use client'

import { useState } from 'react';
import { Button, Table, TextInput } from '@mantine/core';
import { TableRowInputProps } from '../../../../types';
import { CreateInput } from '../CreateInput/CreateInput';
import { JOB_RESPONSE_FIELDS } from '../../../../constants/text.constants';
import { INPUT_ERRORS } from '../../../../constants/errors.constants';
import { JOB_RESPONSE_URL } from '../../../../constants/api.constants';

export function TableRowInput({ getJobResponses }: TableRowInputProps) {
   const [company, setCompany] = useState('');
   const [vacancy, setVacancy] = useState('');
   const [salaryRange, setSalaryRange] = useState('');
   const [status, setStatus] = useState('');
   const [note, setNote] = useState('');

   const [errorCompanyText, setErrorCompanyText] = useState('');
   const [errorVacancyText, setErrorVacancyText] = useState('');
   const [errorSalaryRangeText, setErrorSalaryRangeText] = useState('');
   const [errorStatusText, setErrorStatusText] = useState('');

   const clearInputs = () => {
      setCompany('')
      setVacancy('');
      setSalaryRange('');
      setStatus('');
      setNote('');

      setErrorCompanyText('')
      setErrorVacancyText('')
      setErrorSalaryRangeText('')
      setErrorStatusText('')
   }

   const createJobResponse = () => {
      if (!company) setErrorCompanyText(INPUT_ERRORS.required)
      if (!vacancy) setErrorVacancyText(INPUT_ERRORS.required)
      if (!salaryRange) setErrorSalaryRangeText(INPUT_ERRORS.required)
      if (!status) setErrorStatusText(INPUT_ERRORS.required)

      if (company && vacancy && salaryRange && status) {
         const body = {
            newJobResponse: {
               company, vacancy, salary_range: salaryRange, status, note
            }
         }

         getJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL, "POST", body);
         clearInputs();
      }
   }

   return (
      <Table.Tr>
         <Table.Td>
            <CreateInput
               value={company}
               handleChange={(e) => {
                  setCompany(e.target.value)
                  setErrorCompanyText('')
               }}
               placeholder={JOB_RESPONSE_FIELDS.company}
               errorText={errorCompanyText}
            />
         </Table.Td>
         <Table.Td>
            <CreateInput
               value={vacancy}
               handleChange={(e) => {
                  setVacancy(e.target.value)
                  setErrorVacancyText('')
               }}
               placeholder={JOB_RESPONSE_FIELDS.vacancy}
               errorText={errorVacancyText}
            />
         </Table.Td>
         <Table.Td>
            <CreateInput
               value={salaryRange}
               handleChange={(e) => {
                  setSalaryRange(e.target.value)
                  setErrorSalaryRangeText('')
               }}
               placeholder={JOB_RESPONSE_FIELDS.salaryRange}
               errorText={errorSalaryRangeText}
            />
         </Table.Td>
         <Table.Td>
            <CreateInput
               value={status}
               handleChange={(e) => {
                  setStatus(e.target.value)
                  setErrorStatusText('')
               }}
               placeholder={JOB_RESPONSE_FIELDS.status}
               errorText={errorStatusText}
            />
         </Table.Td>
         <Table.Td>
            <TextInput
               value={note}
               onChange={(e) => setNote(e.target.value)}
               placeholder="Note"
               inputWrapperOrder={['label', 'input', 'error', 'description']}
            />
         </Table.Td>
         <Table.Td>
            <Button onClick={createJobResponse}>Create</Button>
            <Button onClick={clearInputs}>Clear inputs</Button>
         </Table.Td>
      </Table.Tr>
   )
}
