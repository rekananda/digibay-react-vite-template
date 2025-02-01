import { DashboardSidebarMenus } from "@/dashboard";
import { ExampledSidebarMenus } from "@/example";
import { GISSidebarMenus } from "@/gis";
import Icon from "@Atom/Icon";
import { MantineColor } from "@mantine/core";
import { ReactNode } from "react";

export type MenuIndicatorT = {
  color: MantineColor;
  label?: string;
};

export type MenuT = {
  icon?: ReactNode;
  label?: string;
  href?: string;
  children?: MenuT[];
  divider?: string;
  disable?: boolean;
  indicator?: MenuIndicatorT;
  positionBottom?: boolean;
};

export const sidebarMenus: MenuT[] = [
  ...DashboardSidebarMenus,
  { divider: "Product" },
  ...GISSidebarMenus,
  ...ExampledSidebarMenus,
  {
    icon: <Icon name="IconSettings" />,
    label: "Settings",
    positionBottom: true,
  },
];