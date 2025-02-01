import { Badge, Box, Group, GroupProps, MantineColor } from '@mantine/core';
import { useMemo } from 'react';

export const MachineStatusOptions = ["Running","Warning", "Down", "Idle","Offline"] as const;

export type MachineStatusT = typeof MachineStatusOptions[number];
type PropsMachineStatusBadge = {
  status: MachineStatusT
} & GroupProps

const MachineStatusBadge = ({status, ...rest}: PropsMachineStatusBadge) => {
  const statusValue = useMemo<MachineStatusT|undefined>(() => {
    return status
  },[status])
  const statusColor = useMemo<MantineColor|undefined>(() => {
    switch (status) {
      case "Running":
        return "green";
      case "Warning":
        return "yellow";
      case "Down":
        return "red";
      case "Idle":
        return "gray";
      case "Offline":
        return "dark";
      default:
        return "blue";
    }
  }, [status]);

  return (
    <Group {...rest}>
      <Badge variant='light' color={statusColor}>{statusValue}</Badge>
      <Box w={24} h={24} bg={statusColor} style={{borderRadius: "50%"}}/>
    </Group>
  )
}

export default MachineStatusBadge;