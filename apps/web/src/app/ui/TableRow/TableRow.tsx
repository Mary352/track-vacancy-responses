'use client'

import { useState } from 'react';
import { Button, Table, TextInput } from '@mantine/core';
import { TableRowProps, UpdateBody } from '../../../../types';

export function TableRow({ jobResponse, getJobResponses }: TableRowProps) {
   const JOB_RESPONSE_URL = '/vacancyresponse'
   const JOB_RESPONSE_ACTIONS_URLS = {
      create: '/create',
      update: '/update',
      delete: '/delete'
   }

   const [isOnEdit, setIsOnEdit] = useState(false);

   // Inputs for update
   const [company, setCompany] = useState(jobResponse.company);
   const [vacancy, setVacancy] = useState(jobResponse.vacancy);
   const [salaryRange, setSalaryRange] = useState(jobResponse.salary_range);
   const [status, setStatus] = useState(jobResponse.status);
   const [note, setNote] = useState(jobResponse.note);

   async function editJobResponse() {
      setIsOnEdit(true)
   }

   async function cancelEditJobResponse() {
      setIsOnEdit(false)

      setCompany(jobResponse.company)
      setVacancy(jobResponse.vacancy);
      setSalaryRange(jobResponse.salary_range);
      setStatus(jobResponse.status);
      setNote(jobResponse.note);
   }

   async function updateJobResponse(id?: string) {
      let body: UpdateBody = {
         newJobResponse: { note }
      }

      if (company) body.newJobResponse.company = company
      if (vacancy) body.newJobResponse.vacancy = vacancy
      if (salaryRange) body.newJobResponse.salary_range = salaryRange
      if (status) body.newJobResponse.status = status

      getJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL + JOB_RESPONSE_ACTIONS_URLS.update + `/${id}`, "POST", body);
      setIsOnEdit(false)
   }

   async function deleteJobResponse(id?: string) {
      getJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL + JOB_RESPONSE_ACTIONS_URLS.delete + `/${id}`, "POST");
   }

   if (isOnEdit) return (
      <Table.Tr key={jobResponse._id}>

         <Table.Td>
            <TextInput
               value={company}
               onChange={(e) => { setCompany(e.target.value) }}
               placeholder="Company"
               inputWrapperOrder={['label', 'input', 'error', 'description']}
            />
         </Table.Td>
         <Table.Td>
            <TextInput
               value={vacancy}
               onChange={(e) => setVacancy(e.target.value)}
               placeholder="Vacancy"
               inputWrapperOrder={['label', 'input', 'error', 'description']}
            />
         </Table.Td>
         <Table.Td>
            <TextInput
               value={salaryRange}
               onChange={(e) => setSalaryRange(e.target.value)}
               placeholder="Salary range"
               inputWrapperOrder={['label', 'input', 'error', 'description']}
            />
         </Table.Td>
         <Table.Td>
            <TextInput
               value={status}
               onChange={(e) => setStatus(e.target.value)}
               placeholder="Status"
               inputWrapperOrder={['label', 'input', 'error', 'description']}
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
            <Button onClick={() => { updateJobResponse(jobResponse._id) }}>Update</Button>
            <Button onClick={() => { cancelEditJobResponse() }}>Cancel</Button>
         </Table.Td>
         <Table.Td><Button onClick={() => { deleteJobResponse(jobResponse._id) }}>Delete</Button></Table.Td>
      </Table.Tr>
   )

   return (
      <Table.Tr key={jobResponse._id}>
         <Table.Td>{jobResponse.company}</Table.Td>
         <Table.Td>{jobResponse.vacancy}</Table.Td>
         <Table.Td>{jobResponse.salary_range}</Table.Td>
         <Table.Td>{jobResponse.status}</Table.Td>
         <Table.Td>{jobResponse.note}</Table.Td>
         <Table.Td><Button onClick={() => { editJobResponse() }}>Edit</Button></Table.Td>
         <Table.Td><Button onClick={() => { deleteJobResponse(jobResponse._id) }}>Delete</Button></Table.Td>
      </Table.Tr>
   );
}