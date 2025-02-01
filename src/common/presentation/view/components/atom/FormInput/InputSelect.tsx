import { Autocomplete, AutocompleteProps, Select, SelectProps } from "@mantine/core";
import { ReactNode } from "react";
import { labelprops, LabelValue } from "./index.d";

export type PropsInputSelectT = {
  label?: string;
  tooltip?: string;
  error?: ReactNode;
  ref?: any;
  formtype?: "default"|"autocomplete";
} & SelectProps

const InputSelect = (props: PropsInputSelectT) => {
  const { formtype="default", label, tooltip, ...rest } = props;
  
  const placeholder = !rest.placeholder ? 
    label ? `Pilih ${label.toLocaleLowerCase()}`:`Pilih Item`:
    rest.placeholder;
  

  if (formtype === "autocomplete") {
    return (
      <Autocomplete 
        comboboxProps={{ width: "fit-content"}}
        {...rest as AutocompleteProps} 
        label={LabelValue(tooltip, label)} 
        labelProps={labelprops(tooltip)}  
        placeholder={placeholder}
      />
    )
  }
  return (
    <Select 
      comboboxProps={{ width: "fit-content"}}
      searchable
      {...rest as SelectProps} 
      label={LabelValue(tooltip, label)} 
      labelProps={labelprops(tooltip)}  
      placeholder={placeholder}
    />
  )
}

export default InputSelect;