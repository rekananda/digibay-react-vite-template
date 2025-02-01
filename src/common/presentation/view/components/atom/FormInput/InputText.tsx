
import { PasswordInput, PasswordInputProps, TextInput, TextInputProps } from "@mantine/core";
import { labelprops, LabelValue } from "./index.d";

type PropsInputTextT = {
  label?: string;
  tooltip?: string;
  formtype?: "text" | "email" | "password";
} & TextInputProps

const InputText = (props: PropsInputTextT) => {
  const { 
    formtype = "text", 
    tooltip, 
    label,
    ...rest
  } = props;
  const placeholder = !rest.placeholder ? 
    label ? `Masukan ${label.toLocaleLowerCase()}`:`Masukan nilai`:
    rest.placeholder;

  if (formtype == "password") {
    return (
      <PasswordInput 
        {...rest as PasswordInputProps} 
        label={LabelValue(tooltip, label)} 
        labelProps={labelprops(tooltip)} 
        placeholder={placeholder}
      />
    )
  }

  return (
    <TextInput 
      {...rest} 
      label={LabelValue(tooltip, label)} 
      labelProps={labelprops(tooltip)} 
      type={formtype} 
      placeholder={placeholder}
    />
  )
}

export default InputText;