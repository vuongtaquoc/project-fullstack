import { createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home';
import ShareMoviePage from './pages/ShareMovie';
import ErrorPage from './pages/NotFound';

const router = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/share-a-movie',
    element: <ShareMoviePage />,
  },
];

export default router;
