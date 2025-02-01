import { DatePickerInput, DatePickerInputProps, DateTimePicker, DateTimePickerProps, DateValue, MonthPickerInput, MonthPickerInputProps, YearPickerInput, YearPickerInputProps } from '@mantine/dates';
import Icon from '../Icon';
import { labelprops, LabelValue } from './index.d';

type PropsInputDate = {
  label?: string;
  tooltip?: string;
} & DatePickerInputProps

const InputDate = (props: PropsInputDate) => {
  const { tooltip, label, ...rest } = props
  const placeholder = !rest.placeholder ? 
    label ? `Pilih ${label.toString().toLowerCase()}`:`Pilih tanggal`:
    rest.placeholder;
  return (
    <DatePickerInput
      clearable
      valueFormat="DD MMM YYYY"
      inputWrapperOrder={['label','input','description','error']}
      leftSection={<Icon name="IconCalendarMonth" stroke={1.5}/>}
      leftSectionPointerEvents="none"
      {...rest}
      onChange={(value) => rest.onChange?.(value as any)}
      label={LabelValue(tooltip, label)} 
      labelProps={labelprops(tooltip)}  
      placeholder={placeholder}
    />
  )
}

type PropsInputDateTime = {
  label?: string;
  tooltip?: string;
} & DateTimePickerProps

export const InputDateTime = (props: PropsInputDateTime) => {
  const { tooltip, label, ...rest } = props
  const placeholder = !rest.placeholder ? 
    label ? `Pilih ${label.toString().toLowerCase()}`:`Pilih tanggal`:
    rest.placeholder;
  return (
    <DateTimePicker 
      valueFormat="DD MMM YYYY HH:mm"
      clearable
      leftSection={<Icon name="IconCalendarStats" stroke={1.5}/>}
      leftSectionPointerEvents="none"
      {...rest}
      onChange={(value) => rest.onChange?.(value as DateValue)}
      label={LabelValue(tooltip, label)} 
      labelProps={labelprops(tooltip)}  
      placeholder={placeholder}
    />
  )
}

type PropsInputMonth = {
  label?: string;
  tooltip?: string;
} & MonthPickerInputProps

export const InputMonth = (props: PropsInputMonth) => {
  const { tooltip, label, ...rest } = props
  const placeholder = !rest.placeholder ? 
    label ? `Pilih ${label.toString().toLowerCase()}`:`Pilih bulan`:
    rest.placeholder;
  return (
    <MonthPickerInput 
      leftSection={<Icon name="IconCalendar" stroke={1.5}/>}
      leftSectionPointerEvents="none"
      {...rest}
      onChange={(value) => rest.onChange?.(value as any)}
      label={LabelValue(tooltip, label)} 
      labelProps={labelprops(tooltip)}  
      placeholder={placeholder}
    />
  )
}

type PropsInputYear = {
  label?: string;
  tooltip?: string;
} & YearPickerInputProps

export const InputYear = (props: PropsInputYear) => {
  const { tooltip, label, ...rest } = props
  const placeholder = !rest.placeholder ? 
    label ? `Pilih ${label.toString().toLowerCase()}`:`Pilih tahun`:
    rest.placeholder;
  return (
    <YearPickerInput 
      leftSection={<Icon name="IconCalendar" stroke={1.5}/>}
      leftSectionPointerEvents="none"
      {...rest}
      onChange={(value) => rest.onChange?.(value as any)}
      label={LabelValue(tooltip, label)} 
      labelProps={labelprops(tooltip)}  
      placeholder={placeholder}
    />
  )
}
  

export default InputDate;