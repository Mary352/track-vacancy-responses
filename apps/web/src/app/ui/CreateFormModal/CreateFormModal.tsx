import { useForm } from '@mantine/form';
import { Modal, Button, Table, TextInput, Group } from '@mantine/core';
import { JOB_RESPONSE_FIELDS, JOB_RESPONSE_KEYS } from '../../../../constants/text.constants';
import { FormEvent } from 'react';
import { CreateFormModalProps } from '../../../../types';
import { JOB_RESPONSE_URL } from '../../../../constants/api.constants';

export function CreateFormModal({ opened, open, close, fetchJobResponses }: CreateFormModalProps) {

   const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
         company: '',
         vacancy: '',
         salaryRange: '',
         status: '',
         note: '',
      },
   });

   const handleSubmit = (values: { company: string; vacancy: string; salaryRange: string; status: string; note: string; }, event: FormEvent<HTMLFormElement> | undefined) => {
      const { company, vacancy, salaryRange, status, note } = values

      if (company && vacancy && salaryRange && status) {
         const body = {
            newJobResponse: {
               company, vacancy, salary_range: salaryRange, status, note
            }
         }

         fetchJobResponses(process.env.NEXT_PUBLIC_API_URL + JOB_RESPONSE_URL, "POST", body);
         form.reset()
         close()
      }
   }

   return (
      <Table.Tr>
         <Table.Td>
            <Modal opened={opened} onClose={() => { close(); form.reset() }} title="Create job response" centered>
               <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset}>
                  <TextInput
                     label={JOB_RESPONSE_FIELDS.company}
                     required
                     key={form.key(JOB_RESPONSE_KEYS.company)}
                     {...form.getInputProps(JOB_RESPONSE_KEYS.company)}
                     placeholder={JOB_RESPONSE_FIELDS.company}
                     inputWrapperOrder={['label', 'input', 'error', 'description']}
                  />
                  <TextInput
                     mt='5px'
                     label={JOB_RESPONSE_FIELDS.vacancy}
                     required
                     key={form.key(JOB_RESPONSE_KEYS.vacancy)}
                     {...form.getInputProps(JOB_RESPONSE_KEYS.vacancy)}
                     placeholder={JOB_RESPONSE_FIELDS.vacancy}
                     inputWrapperOrder={['label', 'input', 'error', 'description']}
                  />
                  <TextInput
                     mt='5px'
                     label={JOB_RESPONSE_FIELDS.salaryRange}
                     required
                     key={form.key(JOB_RESPONSE_KEYS.salaryRange)}
                     {...form.getInputProps(JOB_RESPONSE_KEYS.salaryRange)}
                     placeholder={JOB_RESPONSE_FIELDS.salaryRange}
                     inputWrapperOrder={['label', 'input', 'error', 'description']}
                  />
                  <TextInput
                     mt='5px'
                     label={JOB_RESPONSE_FIELDS.status}
                     required
                     key={form.key(JOB_RESPONSE_KEYS.status)}
                     {...form.getInputProps(JOB_RESPONSE_KEYS.status)}
                     placeholder={JOB_RESPONSE_FIELDS.status}
                     inputWrapperOrder={['label', 'input', 'error', 'description']}
                  />
                  <TextInput
                     mt='5px'
                     label={JOB_RESPONSE_FIELDS.note}
                     key={form.key(JOB_RESPONSE_KEYS.note)}
                     {...form.getInputProps(JOB_RESPONSE_KEYS.note)}
                     placeholder={JOB_RESPONSE_FIELDS.note}
                     inputWrapperOrder={['label', 'input', 'error', 'description']}
                  />

                  <Group justify='center' mt='md'>
                     <Button type="submit">Submit</Button>
                     <Button type='reset' color='#FF3300'>Clear inputs</Button>
                  </Group>
               </form>
            </Modal>

            <Button onClick={open}>+</Button>
         </Table.Td>
      </Table.Tr>
   );
}