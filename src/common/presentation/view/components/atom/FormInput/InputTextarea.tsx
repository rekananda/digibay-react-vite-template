
import { Textarea, TextareaProps } from "@mantine/core";
import { labelprops, LabelValue } from "./index.d";

type PropsInputTextareaT = {
  label?: string;
  tooltip?: string;
} & TextareaProps

const InputTextarea = (props: PropsInputTextareaT) => {
  const {
    tooltip, 
    label,
    ...rest
  } = props;
  const placeholder = !rest.placeholder ? 
    label ? `Masukan ${label.toLocaleLowerCase()}`:`Masukan nilai`:
    rest.placeholder;

  return (
    <Textarea 
      {...rest} autosize 
      label={LabelValue(tooltip, label)} 
      labelProps={labelprops(tooltip)}  
      placeholder={placeholder}
    />
  )
}

export default InputTextarea;