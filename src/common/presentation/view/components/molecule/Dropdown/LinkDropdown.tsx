import ButtonDropdown, { ButtonDropdownItemT} from '@Molecule/Button/ButtonDropdown';
import { Button, ButtonProps } from '@mantine/core';
import { Link } from 'react-router-dom';

type PropsLinkDropdownT = {
  menus : ButtonDropdownItemT[],
} & ButtonProps

const LinkDropdown = (props: PropsLinkDropdownT) => {
  const { menus, ...rest} = props

  const addStyling = (datas: ButtonDropdownItemT[]):ButtonDropdownItemT[] => {
    return datas.map((data) => ({
      ...data,
      px: 8,
      className: rest.className,
      variant:"subtle",
      ...(data.childs ? { childs: addStyling(data.childs)} : {}),
    }))
  }

  return (
    <ButtonDropdown
      {...rest}
      px={8}
      variant="subtle" 
      items={addStyling(menus)}
      withIconDrop={true}
    />
  )
}

type PropsLinkDropdownButtonT = {
  menu : ButtonDropdownItemT,
} & ButtonProps

export const LinkDropdownButton = (props: PropsLinkDropdownButtonT) => {
  const {menu, ...rest} = props;

  return (
    <Button
      {...rest}
      px={8}
      variant="subtle" 
      component={menu.href ? Link:undefined} 
      to={menu.href||"/"}
    />
  )
}

export default LinkDropdown;