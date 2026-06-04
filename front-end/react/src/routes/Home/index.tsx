import Layout from '../../components/layout/Layout';
import Home from '../../pages/Home';
import MoimList from '../../pages/Home/MoimList';
import UserList from '../../pages/Home/UserList';
import BlacklistList from '../../pages/Home/BlacklistList';
import ReportList from '../../pages/Home/ReportList';

export const HomeRoutes = {
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'user-list',
      element: <UserList />,
    },
    {
      path: 'moim-list',
      element: <MoimList />,
    },
    {
      path: 'blacklist',
      element: <BlacklistList />,
    },
    {
      path: 'reports',
      element: <ReportList />,
    },
  ],
};
