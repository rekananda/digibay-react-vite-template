import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@/common/presentation/view/layout/ErrorBoundary';
import MainLayout from '@/common/presentation/view/layout/index';
import { DashboarRoute, OEEPage } from '@/dashboard';
import { GISRoute } from '@/gis';
import Error404Page from '@Organisme/ErrorPages/404.page';
import { ExampleRoute } from '@/example';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <OEEPage />,
      },
    ],
  },
  ...DashboarRoute,
  ...GISRoute,
  ...ExampleRoute,
  {
    path: '*',
    element: <Error404Page />,
  },
]);

export default router;
