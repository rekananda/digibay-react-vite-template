import { PinInput, PinInputProps } from '@mantine/core';
import { ReactNode } from 'react';
import { CustomInputWrapper } from './index.d';

type PropsInputPin = {
  label: ReactNode;
  description?: string;
  error?: string;
  tooltip?: string;
  required?: boolean;
} & PinInputProps

const InputPin = (props: PropsInputPin) => {
  const { tooltip, label, description, error, required, ...rest } = props;
  return (
    <CustomInputWrapper tooltip={tooltip} label={label} description={description} error={error} required={required}>
      <PinInput mask {...rest as PinInputProps} />
    </CustomInputWrapper>
  )
}

export default InputPin;