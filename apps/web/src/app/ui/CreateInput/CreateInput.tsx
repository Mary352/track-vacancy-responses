import { TextInput } from '@mantine/core';
import { CreateInputProps } from '../../../../types';

export function CreateInput({ value, placeholder, handleChange, errorText }: CreateInputProps) {

   return (
      <TextInput
         value={value}
         onChange={handleChange}
         error={errorText}
         placeholder={placeholder}
         inputWrapperOrder={['label', 'input', 'error', 'description']}
      />
   )
}