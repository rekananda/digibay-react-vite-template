import { ActionIcon, ActionIconProps, Indicator, Popover, PopoverDropdown, PopoverTarget, Text } from "@mantine/core";
import Icon from "@Atom/Icon";

const MenuPop = (props: ActionIconProps) => {
  return (
    <Popover width={300} position="bottom-end" shadow="md">
      <PopoverTarget>
        <Indicator inline label="NEW" size={10} color='yellow' offset={5} styles={{indicator: {fontSize: 8}}}>
          <ActionIcon variant='subtle' size={28} {...props}>
            <Icon name="IconCategory" size={20}/>
          </ActionIcon>
        </Indicator>
      </PopoverTarget>
      <PopoverDropdown>
        <Text size="xs">WIP</Text>
      </PopoverDropdown>
    </Popover>
  )
}

export default MenuPop;