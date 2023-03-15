import { createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home';
import ErrorPage from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
