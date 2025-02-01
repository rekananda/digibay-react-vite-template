import { Flex, RingProgress, RingProgressProps } from '@mantine/core';
import './style.scss';

type PropsChartDonutRound = {
  title?: string;
} & RingProgressProps

const ChartDonutRound = (props: PropsChartDonutRound) => {
  const { title, size=230, className, ...rest } = props;
  return (
    <Flex className={className}  w="100%" justify="center" p={0}>
      <RingProgress
        {...rest}
        className="custom-donut-chart-rounded"
        size={size+30}
        thickness={Math.round(size/10)} 
        roundCaps 
        label={title}
        style={{
          "--label-size": `${Math.round(size*0.14)}px`
        }}
      />
    </Flex>
  )
}

export default ChartDonutRound;