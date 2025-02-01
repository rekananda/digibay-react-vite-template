import { ActionIcon, ActionIconProps, Indicator, Popover, PopoverDropdown, PopoverTarget, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Icon from '@Atom/Icon';

const NotificationPop = (props: ActionIconProps) => {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <Popover width={300} position="bottom-end" shadow="md">
      <PopoverTarget>
        <Indicator inline disabled={visible} size={10} color='red' offset={5}>
          <ActionIcon variant='subtle' size={28} {...props} onClick={() => toggle()}>
            <Icon name="IconBell" size={20}/>
          </ActionIcon>
        </Indicator>
      </PopoverTarget>
      <PopoverDropdown>
        <Text size="xs">WIP</Text>
      </PopoverDropdown>
    </Popover>
  )
}

export default NotificationPop;