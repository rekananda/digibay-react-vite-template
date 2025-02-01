import { Box, ComboboxItem, Stack, Text, Tooltip } from "@mantine/core";
import { ReactNode } from "react";
import Icon from "@Atom/Icon";

export type OptionDataT<T = {}> = {
  description?: ReactNode;
  tooltip?: string;
} & ComboboxItem & T

export const labelprops = (val?: string):Record<string, any> => ({labelElement:val?"div":"label"});

export const LabelValue = (tooltip?:string, label?:ReactNode):ReactNode => {
  if (tooltip) {
    const LabelWrapper = tooltip ? Tooltip:Box;
    return (
      <LabelWrapper label={tooltip} position="top-start">
        <Text className="items-start" fz={12} lh="16.39px" fw={700} display="flex" >
          {label} {tooltip && <Icon name="IconInfoCircle" size={14} stroke={2}/>}
        </Text>
      </LabelWrapper>
    )
  }
  return label;
}


type PropsCustomInputWrapper = {
  label: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tooltip?: string;
  required?: boolean;
}

export const CustomInputWrapper = (props: PropsCustomInputWrapper):ReactNode => {
  const {label, description, error, tooltip, required, children} = props
  const LabelWrapper = tooltip ? Tooltip:Box;

  return (
    <Box>
      <LabelWrapper label={tooltip} position="top-start">
        <Stack gap={0}>
          <Text className="items-start" fz={12} lh="16.39px" fw={700}>
            {label} 
            {tooltip && <Icon name="IconInfoCircle" size={14} stroke={2}/>} 
            {required && <span className="text-red">*</span>}
          </Text>
        </Stack>
      </LabelWrapper>
      {description && <Text className="p-0 mantine-InputWrapper-description" c="gray">{description}</Text>}
      <Box style={{marginTop: "calc(var(--mantine-spacing-xs) / 2)"}}>
        {children}
      </Box>
      {error && <Text className="p-0 font-body" c="red">{error}</Text>}
    </Box>
  )
}