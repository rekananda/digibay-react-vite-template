import { lazy } from 'react';
import ErrorBoundary from "@/common/presentation/view/layout/ErrorBoundary";
import { MenuT } from "@/common/presentation/view/layout/sidebar/data";
import Icon from "@Atom/Icon";
import { ButtonDropdownItemT } from "@Molecule/Dropdown/ButtonDropdown";
import { RouteObject } from "react-router-dom";
import HeapComponentPage from '@/example/presentation/view/pages/HeapComponent.page';
import FormComponentPage from '@/example/presentation/view/pages/FormComponent.page';
import TableComponentPage from '@/example/presentation/view/pages/TableComponent.page';
import FormExamplePage from '@/example/presentation/view/pages/FormExample.page';
import TableExamplePage from '@/example/presentation/view/pages/TableExample.page';

const MainLayout = lazy(() => import('@/common/presentation/view/layout/index'));

const route : RouteObject[] = [
  {
    path: '/component',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HeapComponentPage />,
      },
      {
        path: 'heap',
        element: <HeapComponentPage />,
      },
      {
        path: 'form',
        element: <FormComponentPage />,
      },
      {
        path: 'table',
        element: <TableComponentPage />,
      },
    ],
  },
  {
    path: '/example',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <FormExamplePage />,
      },
      {
        path: 'form',
        element: <FormExamplePage />,
      },
      {
        path: 'table',
        element: <TableExamplePage />,
      },
    ],
  },
]

export const headerMenus: ButtonDropdownItemT[] = [
];

export const sidebarMenus: MenuT[] = [
  {
    icon: <Icon name="IconComponents" />,
    label: "Component",
    href: "/component",
    children: [
      {
        label: "<Heap />",
        href: "/component/heap",
        indicator: { color: "yellow", label: "New" },
      },
      { label: "Form", href: "/component/form" },
      { label: "<DataTable />", href: "/component/table" },
    ],
  },
  {
    icon: <Icon name="IconCircles" />,
    label: "Usage Example",
    href: "/example",
    indicator: { color: "yellow", label: "New" },
    children: [
      {
        label: "Form",
        href: "/example/form",
        indicator: { color: "yellow", label: "New" },
      },
      {
        label: "Table",
        href: "/example/table",
        indicator: { color: "yellow", label: "New" },
      },
      {
        label: "Nested Menu ",
        children: [
          { label: "menu 1",
            children: [
              { label: "menu 1.1" }, 
              { label: "menu 1.2" }
            ], }, 
          { label: "menu 2",
            children: [
              { label: "menu 2.1" }, 
              { label: "menu 2.2" }
            ], }
        ],
      }
    ],
  },
];

export default route