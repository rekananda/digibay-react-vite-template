import { DonutChart, DonutChartProps } from '@mantine/charts';
import { Flex } from '@mantine/core';
import './style.scss';

type PropsChartDonut = {
  title?: string;
  singleData?: boolean;
  max?: number;
} & DonutChartProps

const ChartDonut = (props: PropsChartDonut) => {
  const { title, singleData, max = 100, size=230, className, ...rest } = props;
  if (singleData || rest.data.length === 1){
    rest.endAngle = 360 * (rest.data[0].value / max);
  }
  return (
    <Flex className={className}  w="100%" justify="center" p="md">
      <DonutChart 
        strokeWidth={0} 
        {...rest} 
        className='custom-donut-chart'
        size={size} 
        thickness={Math.round(size/10)} 
        chartLabel={title}
        style={{
          "--label-size": `${Math.round(size*0.14)}px`
        }}
      />
    </Flex>
  )
}

export default ChartDonut;