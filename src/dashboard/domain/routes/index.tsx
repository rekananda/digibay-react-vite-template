import { lazy } from 'react';
import ErrorBoundary from "@/common/presentation/view/layout/ErrorBoundary";
import { MenuT } from "@/common/presentation/view/layout/sidebar/data";
import Icon from "@Atom/Icon";
import { ButtonDropdownItemT } from "@Molecule/Dropdown/ButtonDropdown";
import { RouteObject } from "react-router-dom";
import MachinePage from '../../presentation/view/pages/Machine.page';
import OEEPage from '../../presentation/view/pages/OEE.page';
import SensorPage from '../../presentation/view/pages/Sensor.page';

const MainLayout = lazy(() => import('@/common/presentation/view/layout/index'));

const route : RouteObject[] = [
  {
    path: '/dashboard',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <OEEPage />,
      },
      {
        path: 'oee',
        element: <OEEPage />,
      },
      {
        path: 'sensor',
        element: <SensorPage />,
      },
      {
        path: 'machine',
        element: <MachinePage />,
      },
    ],
  },
]

export { OEEPage };
export const headerMenus: ButtonDropdownItemT[] = [
];

export const sidebarMenus: MenuT[] = [
  {
    icon: <Icon name="IconDashboard" />,
    label: "Dashboard",
    href: "/dashboard",
    children: [
      { label: "OEE Dashboard", href: "/dashboard/oee" },
      { label: "Machine Dashboard", href: "/dashboard/machine" },
      { label: "Sensor Dashboard", href: "/dashboard/sensor" },
    ],
  },
];

export default route