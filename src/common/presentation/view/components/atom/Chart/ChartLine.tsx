import { LineChart, LineChartProps } from '@mantine/charts';
import { Flex, Text } from '@mantine/core';
import './style.scss';

type PropsChartLine = {
  title?: string;
} & LineChartProps

const ChartLine = (props: PropsChartLine) => {
  const { title, className, ...rest } = props;
  return (
    <Flex className={`custom-chart-line ${className||""}`} w="100%" justify="center" p={0}>
      {title && <Text c="primary.7" className="font-title-content">{title}</Text>}
      <LineChart
        h={300}
        w="100%"
        strokeWidth={4}
        curveType="linear"
        tickLine="none"
        gridAxis="none"
        dotProps={{ r: 4, strokeWidth: 1, stroke: '#fff' }}
        activeDotProps={{ r: 4, strokeWidth: 1, fill: '#fff' }}
        withLegend
        {...rest} 
      />
    </Flex>
  );
}

export default ChartLine;