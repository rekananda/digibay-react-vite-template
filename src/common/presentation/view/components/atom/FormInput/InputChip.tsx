import { Box, Chip, ChipGroup, ChipGroupProps, ChipProps, Grid, GridCol, GridProps, Group, Tooltip } from '@mantine/core';
import { ReactNode } from 'react';
import { CustomInputWrapper, OptionDataT } from './index.d';

type PropsInputChip = {
  label: ReactNode;
  tooltip?: string;
} & Omit<ChipProps, 'children'>

export const CustomChip = (props: PropsInputChip) => {
  const { tooltip, label, ...rest } = props;
  const LabelWrapper = tooltip ? Tooltip:Box;

  return (
    <LabelWrapper label={tooltip ||""} {...(tooltip ?{refProp:"rootRef"}:{})} position='top-start'>
      <Chip {...rest}>{label}</Chip>
    </LabelWrapper>
  )
}

type PropsInputChipGroup<T extends boolean = false> = {
  data: OptionDataT[];
  label?: ReactNode;
  description?: string;
  error?: string;
  tooltip?: string;
  dataProps?: {wrap?: boolean} & GridProps;
  required?: boolean;
  multiple?: T;
} & Omit<ChipGroupProps<T>, 'children'>

const InputChip = (props: PropsInputChipGroup<any>) => {
  const { data, dataProps, ...rest } = props;
  const { tooltip, label, description, error, required, ...chipProps } = rest;

  const render = () => {
    return (
      <ChipGroup {...chipProps as ChipGroupProps}>
        {dataProps?.wrap ? 
        <Group>{data.map((option, i) => <CustomChip key={i} variant='outline' {...option}/>)}</Group>:
        <Grid columns={4} {...dataProps} style={{marginTop: "calc(var(--mantine-spacing-xs) / 2)"}}>
          {data.map((option, i) => 
            <GridCol key={i} span={1}>
              <CustomChip variant='outline' {...option}/>
            </GridCol>
          )}
        </Grid>
        }
      </ChipGroup>
    )
  }

  return (
    label ? 
    <CustomInputWrapper tooltip={tooltip} label={label} description={description} error={error} required={required}>
      {render()}
    </CustomInputWrapper>:render()
  )
}

export default InputChip;