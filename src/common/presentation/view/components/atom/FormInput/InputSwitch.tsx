import { Box, Grid, GridCol, GridProps, Group, Switch, SwitchGroup, SwitchGroupProps, SwitchProps, Tooltip } from '@mantine/core';
import { ReactNode } from 'react';
import { CustomInputWrapper, OptionDataT } from './index.d';

type PropsInputSwitch = {
  tooltip?: string;
  toogleLabel?: [ReactNode, ReactNode];
} & SwitchProps

const InputSwitch = (props: PropsInputSwitch) => {
  const { tooltip, toogleLabel=[], ...rest } = props;
  const LabelWrapper = tooltip ? Tooltip:Box;

  return (
    <LabelWrapper label={tooltip} {...(tooltip ?{refProp:"rootRef"}:{})} position='top-start'>
      <Switch {...rest} label={toogleLabel.length>0 ? toogleLabel[rest.checked? 0:1]: undefined}/>
    </LabelWrapper>
  )
}

type PropsInputSwitchToogle = {
  toogleLabel: [ReactNode, ReactNode];
  tooltip?: string;
} & SwitchProps


export const InputSwitchToogle = (props: PropsInputSwitchToogle) => {
  const { toogleLabel, ...rest } = props;
  const { tooltip, label, description, error, required, ...switchProps } = rest;

  return (
    <CustomInputWrapper tooltip={tooltip} label={label} description={description} error={error} required={required}>
      <InputSwitch {...switchProps} toogleLabel={toogleLabel}/>
    </CustomInputWrapper>
  )
}

type PropsInputSwitchGroup = {
  data: OptionDataT[];
  label: ReactNode;
  description?: string;
  error?: string;
  tooltip?: string;
  dataProps?: {wrap?: boolean} & GridProps;
  required?: boolean;
} & Omit<SwitchGroupProps, 'children'>

export const InputSwitchGroup = (props: PropsInputSwitchGroup) => {
  const { data, dataProps, ...rest } = props;
  const { tooltip, label, description, error, required, ...switchProps } = rest;

  return (
    <CustomInputWrapper tooltip={tooltip} label={label} description={description} error={error} required={required}>
      <SwitchGroup {...switchProps as SwitchGroupProps}>
        {dataProps?.wrap ? 
        <Group>{data.map((option, i) => <InputSwitch key={i} {...option}/>)}</Group>:
        <Grid columns={4} {...dataProps} style={{marginTop: "calc(var(--mantine-spacing-xs) / 2)"}}>
          {data.map((option, i) => 
            <GridCol key={i} span={1}>
              <InputSwitch {...option}/>
            </GridCol>
          )}
        </Grid>
        }
      </SwitchGroup>
    </CustomInputWrapper>
  )
}

export default InputSwitch;