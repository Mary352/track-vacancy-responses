'use client'

import { JobResponseType, ResponseBody } from 'api/types'
import { useState, useEffect } from 'react';
import cx from 'clsx';
import { ScrollArea, Table, Text } from '@mantine/core';
import classes from './TableScrollArea.module.css';
import { FetchOptions } from '../../../../types';
import { TableRow } from '../TableRow/TableRow';
import { JOB_RESPONSE_URL } from '../../../../constants/api.constants';
import { JOB_RESPONSE_FIELDS } from '../../../../constants/text.constants';
import { CreateFormModal } from '../CreateFormModal/CreateFormModal';
import { useDisclosure } from '@mantine/hooks';

export function TableScrollArea() {
   const [scrolled, setScrolled] = useState(false);
   const [jobResponsesArr, setJobResponsesArr] = useState<JobResponseType[]>([]);
   const [errorMessage, setErrorMessage] = useState('');
   const [opened, { open, close }] = useDisclosure(false);

   async function fetchJobResponses(url: string, method: string, body = undefined) {
      let options: FetchOptions = {
         method: method
      };

      if (body) {
         options.headers = {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
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
      fetchJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL, "GET");
   }, [])

   const rows = jobResponsesArr.map((row) => (
      <TableRow key={row._id} jobResponse={row} fetchJobResponses={fetchJobResponses}></TableRow>
   ));

   // if (jobResponsesArr.length === 0) return <div>Loading...</div>

   return (
      <div>
         <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table>
               <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                  <Table.Tr>
                     <Table.Th>{JOB_RESPONSE_FIELDS.company}</Table.Th>
                     <Table.Th>{JOB_RESPONSE_FIELDS.vacancy}</Table.Th>
                     <Table.Th>{JOB_RESPONSE_FIELDS.salaryRange}</Table.Th>
                     <Table.Th>{JOB_RESPONSE_FIELDS.status}</Table.Th>
                     <Table.Th>{JOB_RESPONSE_FIELDS.note}</Table.Th>
                     <Table.Th></Table.Th>
                     <Table.Th></Table.Th>
                  </Table.Tr>
               </Table.Thead>
               <Table.Tbody>
                  {rows}
                  <CreateFormModal opened={opened} open={open} close={close} fetchJobResponses={fetchJobResponses} />
               </Table.Tbody>
            </Table>
         </ScrollArea>
         {errorMessage && <Text size='md' c='#FF3300' p='md'>{errorMessage}</Text>}
      </div>
   );
}