'use client'

import { JobResponseType, ResponseBody } from 'api/types'
import { useState, useEffect } from 'react';
import cx from 'clsx';
import { Button, ScrollArea, Table } from '@mantine/core';
import classes from './TableScrollArea.module.css';
import { FetchOptions } from '../../../../types';

export function TableScrollArea() {
   const JOB_RESPONSE_URL = '/vacancyresponse'
   const JOB_RESPONSE_ACTIONS_URLS = {
      create: '/create',
      update: '/update',
      delete: '/delete'
   }

   const [scrolled, setScrolled] = useState(false);
   const [jobResponsesArr, setJobResponsesArr] = useState<JobResponseType[]>([]);
   const [errorMessage, setErrorMessage] = useState('');

   async function getJobResponses(url: string, method: string, body = undefined) {
      let options: FetchOptions = {
         method: method
      };

      if (body) {
         options.body = body
      }

      const res = await fetch(url, options)
      const data: ResponseBody = await res.json()

      if (data.hasOwnProperty('message')) {
         setJobResponsesArr(data.message)
      }

      if (data.hasOwnProperty('error') && data.error !== undefined) {
         setErrorMessage(data.error)
      }
   }

   async function deleteJobResponse(id?: string) {
      getJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL + JOB_RESPONSE_ACTIONS_URLS.delete + `/${id}`, "POST");
   }

   useEffect(() => {
      getJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL, "GET");
   }, [])


   const rows = jobResponsesArr.map((row) => (
      <Table.Tr key={row._id}>
         <Table.Td>{row.company}</Table.Td>
         <Table.Td>{row.vacancy}</Table.Td>
         <Table.Td>{row.salary_range}</Table.Td>
         <Table.Td>{row.status}</Table.Td>
         <Table.Td>{row.note}</Table.Td>
         <Table.Td><Button onClick={() => { deleteJobResponse(row._id) }}>Delete</Button></Table.Td>
      </Table.Tr>
   ));

   // if (jobResponsesArr.length === 0) return <div>Loading...</div>

   return (
      <div>
         <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table maw={900}>
               <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                  <Table.Tr>
                     <Table.Th>Company</Table.Th>
                     <Table.Th>Vacancy</Table.Th>
                     <Table.Th>Salary range</Table.Th>
                     <Table.Th>Status</Table.Th>
                     <Table.Th>Note</Table.Th>
                  </Table.Tr>
               </Table.Thead>
               <Table.Tbody>{rows}</Table.Tbody>
            </Table>
         </ScrollArea>
         {errorMessage && <p>{errorMessage}</p>}
      </div>
   );
}