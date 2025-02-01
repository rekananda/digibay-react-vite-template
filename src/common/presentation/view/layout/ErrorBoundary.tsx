import { useRouteError } from 'react-router-dom';
import ErrorPage from '@/common/presentation/view/components/organisme/ErrorPages/500.page';

function ErrorBoundary() {
  const error = useRouteError();
  if (error) {
    return <ErrorPage />;
  }

  return null;
}

export default ErrorBoundary;
