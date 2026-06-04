import { createHashRouter } from 'react-router-dom';
import { AuthRoutes } from './Auth';
import { HomeRoutes } from './Home';

export const router = createHashRouter([
  {
    path: '/',
    errorElement: <div>404 Not Found</div>,
    children: [HomeRoutes, AuthRoutes],
  },
]);
