import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Box, Grid, GridCol, GridProps, Group, Radio, RadioCard, RadioGroup, RadioGroupProps, RadioIndicator, RadioProps, Stack, Text, Tooltip } from '@mantine/core';
import { ReactNode } from 'react';
import { labelprops, LabelValue, OptionDataT } from './index.d';
import classes from './InputRadio.module.scss';

type PropsInputRadio = {
  tooltip?: string;
} & RadioProps

export const CustomRadio = (props: PropsInputRadio) => {
  const { tooltip, ...rest } = props;
  const LabelWrapper = tooltip ? Tooltip:Box;

  return (
    <LabelWrapper label={tooltip ||""} {...(tooltip ?{refProp:"rootRef"}:{})} position='top-start'>
      <Radio {...rest} />
    </LabelWrapper>
  )
}

export type PropsInputRadioGroup<T = {}> = {
  data: OptionDataT<T>[];
  usingCard?: boolean;
  tooltip?: string;
  dataProps?: GridProps;
  customRenderCard?: (item: OptionDataT<T>) => ReactNode;
} & Omit<RadioGroupProps, 'children'>

const InputRadio = (props: PropsInputRadioGroup<any>) => {
  const { usingCard, tooltip, label, data, dataProps, customRenderCard, ...rest } = props;
  const LabelWrapper = tooltip ? Tooltip:Box;

  const cards = (item: OptionDataT) => (
    <RadioCard className={classes.root} radius="md" value={item.value} key={item.value}>
      <Group wrap="nowrap" align="flex-start">
        <RadioIndicator />
        <LabelWrapper label="tooltip" position='top-start'>
          <Stack gap={4}>
            <Text className={classes.label}>{item.value}</Text>
            {item.description && <Text className={classes.description}>{item.description}</Text>}
          </Stack>
        </LabelWrapper>
      </Group>
    </RadioCard>
  );

  return (
    <RadioGroup 
      {...rest}
      label={LabelValue(tooltip, label)}
      labelProps={labelprops(tooltip)}
    >
      {dataProps && dataProps.columns == 0 ?
        <Carousel
          slideSize={{ base: '50%', md: '30%' }}
          slideGap="md"
          controlsOffset={0}
          styles={{control: {marginInline: "-37px"}}}
          controlSize={27} 
          loop 
          dragFree
          align="start"
          initialSlide={rest.value ? data.findIndex(d=>d.value === rest.value):undefined}
        >
          {data.map((option, i) => 
            <CarouselSlide key={i}>
              {usingCard ? customRenderCard?.(option)||cards(option):<CustomRadio {...option}/>}
            </CarouselSlide>
          )}
        </Carousel>:
        <Grid columns={4} {...dataProps} style={{...dataProps?.style, marginTop: "calc(var(--mantine-spacing-xs) / 2)"}}>
          {data.map((option, i) => 
            <GridCol key={i} span={1}>
              {usingCard ? customRenderCard?.(option)||cards(option):<CustomRadio {...option}/>}
            </GridCol>
          )}
        </Grid>
      }
    </RadioGroup>
  )
}

export default InputRadio;