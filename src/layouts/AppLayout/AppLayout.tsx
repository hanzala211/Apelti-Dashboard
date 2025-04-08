import { useAuth } from '@context';
import { Nav } from './components/Nav';
import { Sidebar } from './components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@constants';
import Loader from '../Loader';

export const AppLayout: React.FC = () => {
  const { userData, isMainLoading } = useAuth();

  if (isMainLoading) {
    return <Loader />;
  }

  return userData ? (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Nav />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={`${ROUTES.auth}/${ROUTES.login}`} />
  );
};

export default AppLayout;
