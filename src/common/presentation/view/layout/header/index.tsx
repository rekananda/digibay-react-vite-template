import { toggleSidebar } from "@/common/presentation/view-model/store/slices/global.slice";
import { useOidc } from "@/common/providers/Keycloak.provider";
import UserAvatar from "@Atom/Avatar/UserAvatar";
import Icon from "@Atom/Icon";
import useLocalstorage from "@Hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "@Hooks/useStore";
import { ActionIcon, AppShellHeader, Box, Burger, Button, Group, Menu, MenuDropdown, MenuItem, MenuTarget, useMantineColorScheme } from "@mantine/core";
import ColorSchemeToggler from "@Molecule/Content/ColorSchemeToggler";
import LinkDropdown, { LinkDropdownButton } from "@Molecule/Dropdown/LinkDropdown";
import MenuPop from "@Molecule/Popup/MenuPop";
import NotificationPop from "@Molecule/Popup/NotificationPop";
import classes from '../style.module.scss';
import { headerMenus } from "./data";

const MainHeader = () => {
  const dispatch = useAppDispatch();
  const { colorScheme } = useMantineColorScheme();
  const { sidebarOpen } = useAppSelector((state) => state.global);
  const [_, setSidebar] = useLocalstorage<boolean>( "sidebar", true );
  const { isUserLoggedIn, oidcTokens, login, logout } = useOidc();
  const data = headerMenus.slice(0, 2);
  const restData = headerMenus.slice(2);

  const handleToggleSidebar = () => {
    setSidebar(!sidebarOpen);
    dispatch(toggleSidebar());
  };

  return (
    <AppShellHeader
      className='glassmorp'
      px={{ base: 16, md: 32, lg: 50 }} 
      py={{ base: 16, md: 8, lg: 24 }}
    >
      <Group h="100%" p={0} wrap='nowrap'>
        <Burger opened={sidebarOpen} onClick={handleToggleSidebar} hiddenFrom="sm" size="sm" />
        <ActionIcon className={classes.buttonHeader} onClick={handleToggleSidebar} visibleFrom="sm" variant='subtle' size="xl" radius="xl">
          <Icon name={sidebarOpen ? "IconLayoutSidebarLeftCollapse":"IconLayoutSidebarLeftExpand"}/>
        </ActionIcon>
        
        <Group className="flex-grow font-body" justify='space-between' wrap='nowrap'>
          <Box>
            <Group wrap='nowrap'>
              {data.map((menu, i) => {
                if (menu.childs && menu.childs.length > 0) {
                  return (
                    <LinkDropdown className={classes.buttonHeader} visibleFrom='lg' key={i} menus={menu.childs}>{menu.label}</LinkDropdown>
                  )
                } 
                return (
                  <LinkDropdownButton className={classes.buttonHeader} visibleFrom='lg' key={i} menu={menu}>{menu.label}</LinkDropdownButton>
                )
              })}
              <LinkDropdown className={classes.buttonHeader} menus={restData} rightSection={<Icon name="IconChevronDown"/>} visibleFrom='lg'>More</LinkDropdown>
              <LinkDropdown className={classes.buttonHeader} menus={headerMenus} rightSection={<Icon name="IconChevronDown"/>} hiddenFrom='lg'>Overview</LinkDropdown>
            </Group>
          </Box>
          <Group gap={12} wrap='nowrap'>
            <MenuPop className={classes.buttonHeader} radius="xl"  />
            <NotificationPop className={classes.buttonHeader} radius="xl" />
            <ColorSchemeToggler className={classes.buttonHeader} radius="xl" />
            { isUserLoggedIn ? 
              <Menu offset={5} openDelay={100} closeDelay={400} position="bottom-end">
                <MenuTarget>
                  <Group grow preventGrowOverflow={false} wrap="nowrap" gap={8}>
                    <UserAvatar
                      className={classes.avatarDropdown}
                      visibleFrom="lg"
                      color={colorScheme === "dark" ? "white" : "dark"}
                      size={38}
                      data={{
                        alt: "profile",
                        title: oidcTokens?.decodedIdToken?.preferred_username as string,
                        photo: oidcTokens?.decodedIdToken?.picture as string,
                      }}
                    />
                    <Icon name="IconChevronDown" size={18} />
                  </Group>
                </MenuTarget>
                <MenuDropdown>
                  <MenuItem
                    className={
                      colorScheme === "dark" ? "hover:bg-gray-8" : "hover:bg-gray-3"
                    }
                    leftSection={<Icon name="IconUser" />}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    className={
                      colorScheme === "dark" ? "hover:bg-gray-8" : "hover:bg-gray-3"
                    }
                    onClick={() => logout({ redirectTo: "specific url", url: "/" })}
                    leftSection={<Icon name="IconLogout" />}
                  >
                    Logout
                  </MenuItem>
                </MenuDropdown>
              </Menu>:
              <Button onClick={() => login({ doesCurrentHrefRequiresAuth: false })}>Log In</Button>
            }
          </Group>
        </Group>
      </Group>
    </AppShellHeader>
  )
}

export default MainHeader