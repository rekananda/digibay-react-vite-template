import { resetLayout } from "@/common/presentation/view-model/store/slices/global.slice";
import useLocalstorage from "@Hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "@Hooks/useStore";
import { AppShell, AppShellMain } from "@mantine/core";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./header";
import MainSidebar from "./sidebar";

interface PropsMainLayout {
  fullContent?:boolean;
}

const MainLayout = ( {fullContent}: PropsMainLayout ) => {
  const dispatch = useAppDispatch();
  const [sidebar] = useLocalstorage<boolean>( "sidebar", true );
  const [iconSidebar] = useLocalstorage<boolean>( "sidebarIcon", false );
  const { sidebarOpen, sidebarIcon } = useAppSelector((state) => state.global);
  useEffect(() => {
    dispatch(resetLayout({ sidebarOpen:sidebar, sidebarIcon:iconSidebar }));
  }, []);

  return (
    <AppShell
      layout="alt"
      className="relative"
      header={{ height: { base: 64, md: 64, lg: 80 } }}
      navbar={{ width: sidebarIcon?86:236, breakpoint: 'sm', collapsed: { mobile: !sidebarOpen, desktop: !sidebarOpen } }}
      p={fullContent? 0:{ base: 16, md: 32, lg: 50 }}
    >
      <MainHeader />
      <MainSidebar />
      <AppShellMain mih="unset"> 
        <Outlet />
      </AppShellMain>
    </AppShell>
  )
}

export default MainLayout