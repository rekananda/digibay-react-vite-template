"use client"

import ChartGauge from '@/Components/Atom/Chart/ChartGauge';
import MachineStatusBadge, { MachineStatusOptions } from '@/Components/Molecule/Badge/MachineStatusBadge';
import { Card, Drawer, Flex, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type PropsMachineMonitoringCard = {
  title: string;
}

const MachineMonitoringCard = (props: PropsMachineMonitoringCard) => {
  const { title } = props;
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Card onClick={toggle}>
      <Stack gap={8}>
        <Group justify="space-between" wrap='nowrap'>
          <Text className='font-title-content' style={{cursor: "pointer", textDecorationLine: "underline"}}>{title}</Text>
          <MachineStatusBadge 
            status={MachineStatusOptions[Math.floor(Math.random() * MachineStatusOptions.length)]}
          />
        </Group>
        <Flex gap="md" className='flex-grow w-full h-full' direction={{base: "row", md:"column", lg: "row"}} justify="center" align="center">
          <ChartGauge 
            className='max-w-fit'
            data={[
              {name: 'Usage', value: 75, color: 'violet.5' },
            ]}
            size={100}
            title="75%"
          />
          <Stack>
            <Stack gap={0}>
              <Text size="xs">Operator</Text>
              <Text size="sm" fw="700">Operator Name</Text>
            </Stack>
            <Stack gap={0}>
              <Text size="xs">Job/PO Number</Text>
              <Text size="sm" fw="700">34712 PO-483729</Text>
            </Stack>
          </Stack>
        </Flex>
        <Group grow justify='space-evenly'>
          <Stack gap={0} align='center'>
            <Text className='font-caption'>Availability</Text>
            <Text size="sm" fw="700">15%</Text>
          </Stack>
          <Stack gap={0} align='center'>
            <Text className='font-caption'>Perfomance</Text>
            <Text size="sm" fw="700">50%</Text>
          </Stack>
          <Stack gap={0} align='center'>
            <Text className='font-caption'>Quality</Text>
            <Text size="sm" fw="700">90%</Text>
          </Stack>
        </Group>
        <Group grow justify='space-evenly'>
          <Stack gap={0} align='center'>
            <Text className='font-caption'>Good</Text>
            <Text size="sm" fw="700" c="green.7">360</Text>
          </Stack>
          <Stack gap={0} align='center'>
            <Text className='font-caption'>Bad</Text>
            <Text size="sm" fw="700" c="red.7">13</Text>
          </Stack>
          <Stack gap={0} align='center'>
            <Text className='font-caption'>Cycle Time</Text>
            <Text size="sm" fw="700">373</Text>
          </Stack>
        </Group>
      </Stack>
      
      <Drawer opened={opened} onClose={toggle} title={title} position='right'>
        WIP: more detail
      </Drawer>
    </Card>
  )
}

export default MachineMonitoringCard;