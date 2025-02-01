import { lazy } from 'react';
import ErrorBoundary from "@/common/presentation/view/layout/ErrorBoundary";
import { MenuT } from "@/common/presentation/view/layout/sidebar/data";
import Icon from "@Atom/Icon";
import { ButtonDropdownItemT } from "@Molecule/Dropdown/ButtonDropdown";
import { RouteObject } from "react-router-dom";
import AssetLocationPage from '../../presentation/view/pages/AssetLocation.page';
import NetworkSchemaPage from '../../presentation/view/pages/NetworkSchema.page';
import VehicleTrackingPage from '../../presentation/view/pages/VehicleTracking.page';

const MainLayout = lazy(() => import('@/common/presentation/view/layout/index'));

const route : RouteObject[] = [
  {
    path: '/gis',
    element: <MainLayout fullContent/>,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AssetLocationPage />,
      },
      {
        path: 'assets-location',
        element: <AssetLocationPage />,
      },
      {
        path: 'network-schema',
        element: <NetworkSchemaPage />,
      },
      {
        path: 'vehicle-tracking',
        element: <VehicleTrackingPage />,
      },
    ],
  },
]

export const headerMenus: ButtonDropdownItemT[] = [
];

export const sidebarMenus: MenuT[] = [
  {
    icon: <Icon name="IconCurrentLocation" />,
    label: "GIS",
    href: "/gis",
    children: [
      { label: "Assets Location", href: "/gis/assets-location" },
      { label: "Network Schema", href: "/gis/network-schema" },
      { label: "Vehicle Tracking", href: "/gis/vehicle-tracking" },
    ],
  },
];

export default route