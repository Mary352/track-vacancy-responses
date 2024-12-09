import { useState } from 'react';
import { Button, Group, Table, TextInput } from '@mantine/core';
import { TableRowProps, UpdateBody } from '../../../../types';
import { JOB_RESPONSE_ACTIONS_URLS, JOB_RESPONSE_URL } from '../../../../constants/api.constants';
import { useDisclosure } from '@mantine/hooks';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

export function TableRow({ jobResponse, fetchJobResponses }: TableRowProps) {
   const [isOnEdit, setIsOnEdit] = useState(false);
   const [opened, { open, close }] = useDisclosure(false);

   // Inputs for update
   const [company, setCompany] = useState(jobResponse.company);
   const [vacancy, setVacancy] = useState(jobResponse.vacancy);
   const [salaryRange, setSalaryRange] = useState(jobResponse.salary_range);
   const [status, setStatus] = useState(jobResponse.status);
   const [note, setNote] = useState(jobResponse.note);

   function editJobResponse() {
      setIsOnEdit(true)
   }

   function cancelEditJobResponse() {
      setIsOnEdit(false)

      setCompany(jobResponse.company)
      setVacancy(jobResponse.vacancy);
      setSalaryRange(jobResponse.salary_range);
      setStatus(jobResponse.status);
      setNote(jobResponse.note);
   }

   function updateJobResponse(id?: string) {
      let body: UpdateBody = {
         newJobResponse: { note }
      }

      if (company) body.newJobResponse.company = company
      if (vacancy) body.newJobResponse.vacancy = vacancy
      if (salaryRange) body.newJobResponse.salary_range = salaryRange
      if (status) body.newJobResponse.status = status

      fetchJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL + JOB_RESPONSE_ACTIONS_URLS.update + `/${id}`, "POST", body);
      setIsOnEdit(false)
   }

   if (isOnEdit) return (
      <Table.Tr key={jobResponse._id}>
         <Table.Td>
            <TextInput
               value={company}
               onChange={(e) => { setCompany(e.target.value) }}
               placeholder="Company"
            />
         </Table.Td>
         <Table.Td>
            <TextInput
               value={vacancy}
               onChange={(e) => setVacancy(e.target.value)}
               placeholder="Vacancy"
            />
         </Table.Td>
         <Table.Td>
            <TextInput
               value={salaryRange}
               onChange={(e) => setSalaryRange(e.target.value)}
               placeholder="Salary range"
            />
         </Table.Td>
         <Table.Td>
            <TextInput
               value={status}
               onChange={(e) => setStatus(e.target.value)}
               placeholder="Status"
            />
         </Table.Td>
         <Table.Td>
            <TextInput
               value={note}
               onChange={(e) => setNote(e.target.value)}
               placeholder="Note"
            />
         </Table.Td>
         <Table.Td>
            <Group>
               <Button onClick={() => { updateJobResponse(jobResponse._id) }}>Update</Button>
               <Button onClick={cancelEditJobResponse} color='#FF3300'>Cancel</Button>
            </Group>
         </Table.Td>
         <ConfirmModal close={close} open={open} opened={opened} jobResponseId={jobResponse._id} fetchJobResponses={fetchJobResponses} />
      </Table.Tr>
   )

   return (
      <Table.Tr key={jobResponse._id}>
         <Table.Td>{jobResponse.company}</Table.Td>
         <Table.Td>{jobResponse.vacancy}</Table.Td>
         <Table.Td>{jobResponse.salary_range}</Table.Td>
         <Table.Td>{jobResponse.status}</Table.Td>
         <Table.Td>{jobResponse.note}</Table.Td>
         <Table.Td><Button onClick={editJobResponse}>Edit</Button></Table.Td>
         <ConfirmModal close={close} open={open} opened={opened} jobResponseId={jobResponse._id} fetchJobResponses={fetchJobResponses} />
      </Table.Tr >
   );
}