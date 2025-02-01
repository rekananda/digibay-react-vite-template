"use client"

import { Box, ComboboxItem, MultiSelect, MultiSelectProps, TagsInput, TagsInputProps } from "@mantine/core";
import { ReactNode } from "react";
import { labelprops, LabelValue } from "./index.d";

export type PropsInputSelectMultipleT = {
  label?: string;
  tooltip?: string;
  error?: ReactNode;
  ref?: any;
  formtype?: "multiple" | "tags";
  outsidePill?: boolean;
  maxTags?: number; //only for tags type
  allowDuplicates?: boolean; //only for tags type
  onDuplicate?: (value: string) => void; //only for tags type
  data: ComboboxItem[];
} & MultiSelectProps

const InputSelectMultiple = (props: PropsInputSelectMultipleT) => {
  const { formtype="multiple", label, tooltip, outsidePill=false, ...rest } = props;
  const placeholder = !rest.placeholder ? 
    label ? `Pilih ${label.toLocaleLowerCase()}`:`Pilih Item`:
    rest.placeholder;

  return (
    <Box className="w-full">
      {formtype === "tags" ? 
      <TagsInput 
        comboboxProps={{ width: "fit-content"}}
        {...rest as TagsInputProps} 
        className={`${rest.className} ${outsidePill? "hide-pill":""}`}
        label={LabelValue(tooltip, label)} 
        labelProps={labelprops(tooltip)} 
        placeholder={placeholder} 
        splitChars={[',', '|']} 
        maxDropdownHeight={200} 
      />:
      <MultiSelect 
        comboboxProps={{ width: "fit-content"}}
        {...rest as MultiSelectProps} 
        className={`${rest.className} ${outsidePill? "hide-pill":""}`}
        label={LabelValue(tooltip, label)} 
        labelProps={labelprops(tooltip)} 
        placeholder={placeholder} 
        searchable 
        nothingFoundMessage="Nothing found..." 
        hidePickedOptions={outsidePill}
      />
      }
    </Box>
  )
}

export default InputSelectMultiple;