import { Box, Button, ButtonProps, FloatingPosition, MenuItem, MenuItemProps, MenuLabel } from "@mantine/core";
import Dropdown from "@Atom/Dropdown";
import Icon from "@Atom/Icon";
import { Link } from "react-router-dom";

export type ButtonDropdownItemT = {
  label: string,
  onClick?: () => void,
  href?: string;
  isLabelMenu?: boolean,
  childs?: ButtonDropdownItemT[];
} & MenuItemProps

export type PropsButtonDropdownT = {
  items: ButtonDropdownItemT[];
  position?: FloatingPosition;
  withIconDrop?: boolean;
} & ButtonProps

const ButtonDropdown = (props: PropsButtonDropdownT) => {
  const { items, position = "bottom", withIconDrop=false, ...rest } = props;

  const renderItem = (item: ButtonDropdownItemT, i: number) => {
    if (item.isLabelMenu) {
      return (<MenuLabel key={i}>{item.label}</MenuLabel>)
    }
    if (item.childs) {
      return (
        <Box key={i}>
          <Dropdown offset={5} position="right-start" menus={item.childs.map((d, i) => renderItem(d, i))} withinPortal={false}>
            <Button {...rest} rightSection={<Icon name="IconChevronRight" stroke={1}/>}>
              {item.label}
            </Button>
          </Dropdown>
        </Box>
      )
    }
    return (
      <MenuItem {...item}  key={i} component={item.href ? Link:undefined} to={item.href || "/"}>
        {item.label}
      </MenuItem>
    )
  }

  return (
    <Dropdown offset={5} position={position} menus={items.map((d, i) => renderItem(d, i))} >
      <Button {...rest} rightSection={withIconDrop && <Icon name="IconChevronDown"/>} autoContrast>
        {rest.children || <Icon name="IconChevronDown"/>}
      </Button>
    </Dropdown>
  )
}

export default ButtonDropdown;