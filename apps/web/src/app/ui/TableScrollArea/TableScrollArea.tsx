'use client'

import { JobResponseType, ResponseBody } from 'api/types'
import { useState, useEffect } from 'react';
import cx from 'clsx';
import { ScrollArea, Table } from '@mantine/core';
import classes from './TableScrollArea.module.css';

export function TableScrollArea() {

   const [scrolled, setScrolled] = useState(false);
   const [jobResponsesArr, setJobResponsesArr] = useState<JobResponseType[]>([]);
   const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
      async function getJobResponses() {
         const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/vacancyresponse')
         const data: ResponseBody = await res.json()

         if (data.hasOwnProperty('message')) {
            setJobResponsesArr(data.message)
         }

         if (data.hasOwnProperty('error') && data.error !== undefined) {
            setErrorMessage(data.error)
         }
      }

      getJobResponses();

   }, [])


   const rows = jobResponsesArr.map((row) => (
      <Table.Tr key={row._id}>
         <Table.Td>{row.company}</Table.Td>
         <Table.Td>{row.vacancy}</Table.Td>
         <Table.Td>{row.salary_range}</Table.Td>
         <Table.Td>{row.status}</Table.Td>
         <Table.Td>{row.note}</Table.Td>
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