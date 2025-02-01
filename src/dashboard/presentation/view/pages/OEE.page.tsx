import { OEEEntity } from "@/dashboard/domain/oee";
import ChartDonutRound from "@Atom/Chart/ChartDonutRound";
import ChartLine from "@Atom/Chart/ChartLine";
import PageTitle from "@Atom/PageTitle";
import { Card, Divider, Flex, Grid, GridCol, Group, Progress, Stack, Text } from "@mantine/core";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";

export default function OeeDashboardPage() {
  const [dataGrafik, setDataGrafik] = useState<OEEEntity[]>(
    Array.from({ length: 30 }, (_, index) => ({
      Availability: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
      Performance: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
      Quality: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
      OEE: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
      date: dayjs().subtract((30-index-1)*10, 'second').format('HH:mm:ss'),
    }))
  )
  const [dataShift, setDataShift] = useState<number[]>(Array.from({ length: 3 }, () => (
    Math.floor(Math.random() * (100 - 70 + 1)) + 70
  )));
  const averageShift = Math.ceil(dataShift.reduce((a, b) => a + b, 0) / dataShift.length);
  const [dataQuality, setDataQuality] = useState<number[]>([
    Math.floor(Math.random() * (360 - 200 + 1)) + 200, 
    Math.floor(Math.random() * 21)
  ]);
  const percenQuality = Math.ceil((dataQuality[0] / dataQuality.reduce((a, b) => a + b, 0))*100);
  const [dataAvailablity, setDataAvailablity] = useState<number[]>([
    Math.floor((averageShift*1260)/100), 
    Math.floor(Math.random() * 11)
  ]);
  const performanceTarget = Math.ceil((dataQuality[0]/360) * 100);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        Availability: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        Performance: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        Quality: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        OEE: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        date: dayjs().format('HH:mm:ss')
      };
      setDataQuality([
        Math.floor(Math.random() * (360 - 200 + 1)) + 200, 
        Math.floor(Math.random() * 21)
      ]);
      setDataAvailablity([
        Math.floor(Math.random() * (360 - 200 + 1)) + 200, 
        Math.floor(Math.random() * 21)
      ]);

      setDataGrafik(prevDataGrafik => [
        ...prevDataGrafik.slice(1), // Remove the first item
        newEntry // Add the new entry at the end
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newShiftData = [...dataShift];
      const hour = new Date().getHours();
      const randomValue = Math.floor(Math.random() * (100 - 70 + 1)) + 70;

      if (hour >= 0 && hour < 8) {
        newShiftData[2] = randomValue;
      } else if (hour >= 8 && hour < 16) {
        newShiftData[0] = randomValue;
      } else {
        newShiftData[1] = randomValue;
      }

      setDataShift(newShiftData);
    }, 10000); 

    return () => clearInterval(interval);
  }, [dataShift]);

  useEffect(() => {
    setDataAvailablity([
      Math.floor((averageShift*1260)/100), 
      Math.floor(Math.random() * 11)])
  }, [averageShift]);

  return (
    <>
      <PageTitle
        className="mb-6"
        title="OEE (Overall Equipment Effectiveness) Monitoring"
        subtitle="Put any short description here."
      />
      <Grid gutter={24}>
        <GridCol span={{ base: 12, lg: 3 }}>
          <Flex gap="md" h="100%" direction={{base: "column", md:"row", lg: "column"}} justify="center" align="center">
            <ChartDonutRound 
              sections={[
                {name: 'Usage', value: averageShift, color: 'violet.5' },
              ]}
              title={`${averageShift}%`}
            />
            <Card className="flex-grow w-full h-full">
              <Stack gap={4}>
                <Text c="primary.7" className="font-title-content w-full text-center">OEE by Shift</Text>
                <Group gap={8} wrap="nowrap">
                  <Text className="font-content">Shift 1</Text>
                  <Text className="font-caption">(08:00 - 16:00)</Text> 
                  <Progress className="flex-grow" radius="xl" size="lg" value={dataShift[0]} />
                  <Text className="font-content bold">{dataShift[0]}%</Text>
                </Group>
                <Group gap={8} wrap="nowrap">
                  <Text className="font-content">Shift 2</Text>
                  <Text className="font-caption">(16:00 - 24:00)</Text> 
                  <Progress className="flex-grow" radius="xl" size="lg" value={dataShift[1]} />
                  <Text className="font-content bold">{dataShift[1]}%</Text>
                </Group>
                <Group gap={8} wrap="nowrap">
                  <Text className="font-content">Shift 3</Text>
                  <Text className="font-caption">(00:00 - 08:00)</Text> 
                  <Progress className="flex-grow" radius="xl" size="lg" value={dataShift[2]} />
                  <Text className="font-content bold">{dataShift[2]}%</Text>
                </Group>
              </Stack>
            </Card>
          </Flex>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <Card h="100%">
            <Stack>
              <ChartDonutRound 
                size={160}
                sections={[
                  {name: 'Usage', value: averageShift, color: 'pink.3' },
                ]}
                title={`${averageShift}%`}
              />
              <Text c="primary.7" className="font-title-content w-full text-center">Availability</Text>
              <Divider/>
              <Stack gap={12} className="flex-grow">
                <Group justify="space-between">
                  <Text className="font-content">Planned</Text>
                  <Text className="font-content bold">1260 min</Text>
                </Group>
                <Group justify="space-between">
                  <Text className="font-content">Uptime</Text>
                  <Text className="font-content bold">{dataAvailablity[0]} min</Text>
                </Group>
                <Group justify="space-between">
                  <Text className="font-content">Downtime</Text>
                  <Text className="font-content bold">{dataAvailablity[1]} min</Text>
                </Group>
              </Stack>
            </Stack>
          </Card>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <Card h="100%">
            <Stack>
              <ChartDonutRound 
                size={160}
                sections={[
                  {name: 'Progress', value: performanceTarget, color: 'grape.3' },
                ]}
                title={`${performanceTarget}%`}
              />
              <Text c="primary.7" className="font-title-content w-full text-center">Performance</Text>
              <Divider/>
              <Stack gap={12} className="flex-grow">
                <Group justify="space-between">
                  <Text className="font-content">Planned Cycle</Text>
                  <Text className="font-content bold">360 pcs/min</Text>
                </Group>
                <Group justify="space-between">
                  <Text className="font-content">Actual Cycle</Text>
                  <Text className="font-content bold">{dataQuality[0]} pcs/min</Text>
                </Group>
              </Stack>
            </Stack>
          </Card>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <Card h="100%">
            <Stack>
              <ChartDonutRound 
                size={160}
                sections={[
                  {name: 'Good', value: percenQuality, color: 'violet.3' },
                ]}
                title={`${percenQuality}%`}
              />
              <Text c="primary.7" className="font-title-content w-full text-center">Quality</Text>
              <Divider/>
              <Stack gap={12} className="flex-grow">
                <Group justify="space-between">
                  <Text className="font-content">Total</Text>
                  <Text className="font-content bold">{dataQuality.reduce((a, b) => a + b, 0)}</Text>
                </Group>
                <Group justify="space-between">
                  <Text className="font-content">Good</Text>
                  <Text className="font-content bold">{dataQuality[0]}</Text>
                </Group>
                <Group justify="space-between">
                  <Text className="font-content">Bad</Text>
                  <Text className="font-content bold">{dataQuality[1]}</Text>
                </Group>
              </Stack>
            </Stack>
          </Card>
        </GridCol>
        <GridCol span={{ base: 12 }}>
          <Card h="100%">
            <ChartLine 
              title="Historical Data"
              data={dataGrafik}
              dataKey="date"
              series={[
                { name: 'Availability', color: 'pink.3' },
                { name: 'Performance', color: 'grape.3' },
                { name: 'Quality', color: 'violet.3' },
                { name: 'OEE', color: 'violet.5' },
              ]}
            />
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}