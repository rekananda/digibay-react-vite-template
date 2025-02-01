import Dropdown from "@Atom/Dropdown";
import Icon from "@Atom/Icon";
import { MenuIndicatorT, MenuT } from "./data";
import { Badge, Box, Button, ButtonProps, Divider, Group, Indicator, MenuItem, MenuItemProps, NavLink } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from '../style.module.scss';

type PropsContentSidebarT = {
  menus: MenuT[];
  iconOnly: boolean;
}

const ContentSidebar = ({ menus, iconOnly }: PropsContentSidebarT) => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderLabel = (label: string, indicator?: MenuIndicatorT ) => {
    return (
      <Group justify="space-between" gap={4} wrap="nowrap">
        {label}
        {indicator && <Badge color={indicator.color} size="xs" miw="fit-content">{indicator.label}</Badge>}
      </Group>
    )
  }

  const renderItem = (item: MenuT, index:number) => {
    let isActive:boolean = false;
    if (item.href && location.pathname === item.href) {
      isActive = true;
    }
    const props: MenuItemProps = {
      className: isActive ? "":classes.buttonHeader,
      variant: isActive ? "light":"subtle",
      color: isActive ? "primary":undefined,
      px: 8
    }
    if (item.children) {
      return (<Box key={index}>
        <Dropdown offset={5} position="right-start" menus={item.children.map((d, i) => renderItem(d, i))} withinPortal={false}>
          <Button {...props as ButtonProps} fullWidth justify="space-between" rightSection={<Icon name="IconChevronRight" stroke={1}/>}>
            {renderLabel(item.label||"", item.indicator)}
          </Button>
        </Dropdown>
      </Box>)
    }
    return (
      <MenuItem key={index} component={item.href ? Link:undefined} to={item.href||"/"} {...props}>
        {renderLabel(item.label||"", item.indicator)}
      </MenuItem>
    )
  }

  const renderMenu = (datas: MenuT[], parent: number = 0, level: number = 0) => {
    return (
      <>{
        datas.map((item, index) => {
          let isActive:boolean = false;
          let isOpen:boolean = false;
          if (item.href && location.pathname === item.href) {
            isActive = true;
          }
          if (item.children && item.href) {
            isOpen = location.pathname.includes(item.href);
          }
          
          return (
            item.divider?
            <Divider key={`divider-${index}`} my="sm" />:
            iconOnly && item.children ?
            <Dropdown 
              menus={item.children.map((d, i) => renderItem(d, i))} 
              offset={5} 
              position="right-start"
            >
              <Indicator inline disabled={!(item.indicator)} color={item.indicator?.color} offset={7}>
                <NavLink
                  mb={8}
                  className={`${classes.navMenu} ${!isActive&&!isOpen ? classes.buttonHeader:""}`}
                  key={`menu-${parent}${index}`}
                  active={isActive||isOpen}
                  childrenOffset={28}
                  leftSection={item.icon}
                  w={50}
                  defaultOpened={isOpen}

                  color={isActive||isOpen ? "primary":"dark"}
                  variant={isActive||isOpen ? "light":"subtle"}
                />

              </Indicator>
            </Dropdown>:
            <NavLink
              mb={8}
              onClick={()=>{
                if(item.href&&!item.children ) navigate(item.href)
              }}
              className={`${classes.navMenu} ${!isActive&&!isOpen ? classes.buttonHeader:""}`}
              key={`menu-${parent}${index}`}
              active={isActive||isOpen}
              label={iconOnly?'':renderLabel(item.label||"", item.indicator)}
              childrenOffset={28}
              leftSection={item.icon}
              w={iconOnly?52:undefined}
              defaultOpened={isOpen}
              color={isActive||isOpen ? "primary":"dark"}
              variant={isActive||isOpen ? "light":"subtle"}
            >
              {item.children && renderMenu(item.children, index, level+1)}
            </NavLink>
          );
        })}
      </>
    );
  }

  return (
    <Box pt={16}>
      {renderMenu(menus)}
    </Box>
  )
}

export default ContentSidebar;