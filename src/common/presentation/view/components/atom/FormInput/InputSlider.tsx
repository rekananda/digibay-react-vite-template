import { RangeSlider, RangeSliderProps, Slider, SliderProps } from '@mantine/core';
import { ReactNode } from 'react';
import { CustomInputWrapper } from './index.d';

type PropsInputSlider = {
  label: ReactNode;
  description?: string;
  error?: string;
  tooltip?: string;
  required?: boolean;
} & SliderProps

const InputSlider = (props: PropsInputSlider) => {
  const { tooltip, label, description, error, required, ...rest } = props;
  return (
    <CustomInputWrapper tooltip={tooltip} label={label} description={description} error={error} required={required}>
      <Slider {...rest as SliderProps} style={rest.marks ? {marginBottom: "1rem"}:{}}/>
    </CustomInputWrapper>
  )
}

type PropsInputRangeSlider = {
  label: ReactNode;
  description?: string;
  error?: string;
  tooltip?: string;
  required?: boolean;
} & RangeSliderProps

export const InputRangeSlider = (props: PropsInputRangeSlider) => {
  const { tooltip, label, description, error, required, ...rest } = props;
  return (
    <CustomInputWrapper tooltip={tooltip} label={label} description={description} error={error} required={required}>
      <RangeSlider {...rest as RangeSliderProps} style={rest.marks ? {marginBottom: "1rem"}:{}}/>
    </CustomInputWrapper>
  )
}

export default InputSlider;