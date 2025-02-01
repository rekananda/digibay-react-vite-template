import { toggleSidebar, toggleSidebarIcon } from "@/common/presentation/view-model/store/slices/global.slice";
import Icon from "@Atom/Icon";
import { useAppDispatch, useAppSelector } from "@Hooks/useStore";
import { ActionIcon, AppShellNavbar, AppShellNavbarProps, AppShellSection, Burger, Flex, Group, Image, ScrollArea } from "@mantine/core";
import classes from '../style.module.scss';
import ContentSidebar from "./Content";
import { sidebarMenus } from "./data";

const SidebarContent = (props: AppShellNavbarProps) => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, sidebarIcon } = useAppSelector((state) => state.global);

  const handleToggleIcon = () => {
    dispatch(toggleSidebarIcon());
  }

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  }

  return (
    <AppShellNavbar 
      px={16} py={{ base: 16, md: 24 }} 
      className='glassmorp'
      {...props}
    >
      <AppShellSection mb={48}>
        <Group w="100%">
          <Flex justify="center" className="flex-grow">
            <Image className="flex justify-center flex-grow" src={sidebarIcon?"/logo-icon.png":"/logo-full.png"} alt="logo" h={50} w="auto"/>
          </Flex>
          <Burger opened={sidebarOpen} onClick={handleToggleSidebar} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShellSection>
      <AppShellSection grow component={ScrollArea}>
        <ContentSidebar menus={sidebarMenus.filter((d) => !d.positionBottom)} iconOnly={sidebarIcon}/>
      </AppShellSection>
      <AppShellSection mt="md">
        <ContentSidebar menus={sidebarMenus.filter((d) => d.positionBottom)} iconOnly={sidebarIcon}/>
        <Group justify={sidebarIcon?"center":"flex-end"} visibleFrom="md">
          <ActionIcon className={classes.buttonHeader} onClick={handleToggleIcon} visibleFrom="sm" variant='subtle' size="xl" radius="xl">
            <Icon name={sidebarIcon ? "IconChevronRight":"IconChevronLeft"}/>
          </ActionIcon>
        </Group>
      </AppShellSection>
    </AppShellNavbar>
  )
}

export default SidebarContent;