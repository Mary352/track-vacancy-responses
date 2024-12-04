'use client'

import { JobResponseType, ResponseBody } from 'api/types'
import { useState, useEffect } from 'react';
import cx from 'clsx';
import { Button, ScrollArea, Table } from '@mantine/core';
import classes from './TableScrollArea.module.css';
import { FetchOptions } from '../../../../types';
import { TableRow } from '../TableRow/TableRow';

export function TableScrollArea() {
   const JOB_RESPONSE_URL = '/vacancyresponse'

   const [scrolled, setScrolled] = useState(false);
   const [jobResponsesArr, setJobResponsesArr] = useState<JobResponseType[]>([]);
   const [errorMessage, setErrorMessage] = useState('');

   // Inputs for create


   async function getJobResponses(url: string, method: string, body = undefined) {
      let options: FetchOptions = {
         method: method
      };

      if (body) {
         options.headers = {
            'Content-Type': 'application/json;charset=utf-8'
         }
         options.body = JSON.stringify(body)
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

   useEffect(() => {
      getJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL, "GET");
   }, [])

   const rows = jobResponsesArr.map((row) => (
      <TableRow key={row._id} jobResponse={row} getJobResponses={getJobResponses}></TableRow>
   ));

   // if (jobResponsesArr.length === 0) return <div>Loading...</div>

   return (
      <div>
         <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table>
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