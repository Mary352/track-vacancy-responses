import { Modal, Button, Table, Group, Text } from '@mantine/core';
import { ConfirmModalProps } from '../../../../types';
import { JOB_RESPONSE_ACTIONS_URLS, JOB_RESPONSE_URL } from '../../../../constants/api.constants';

export function ConfirmModal({ opened, jobResponseId, open, close, fetchJobResponses }: ConfirmModalProps) {

   function deleteJobResponse(id?: string) {
      fetchJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL + JOB_RESPONSE_ACTIONS_URLS.delete + `/${id}`, "POST");
      close()
   }

   return (
      <Table.Td>
         <Modal opened={opened} onClose={() => { close() }} title="Confirmation" centered>
            <Text ta='center' size='lg'>Are you sure you want to delete this job response?</Text>

            <Group justify='center' mt='md'>
               <Button onClick={() => { deleteJobResponse(jobResponseId) }}>Delete</Button>
               <Button onClick={close} color='#FF3300'>Cancel</Button>
            </Group>
         </Modal>

         <Button onClick={open} color='#ff7171'>Delete</Button>
      </Table.Td>
   );
}