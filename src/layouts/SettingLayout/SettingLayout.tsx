import { ROUTES } from '@constants';
import { useAuth } from '@context';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../Loader';
import { SettingSidebar } from './components/SettingSidebar';
import SettingHeader from './components/SettingHeader';

export const SettingsLayout: React.FC = () => {
  const { userData, isMainLoading } = useAuth();

  if (isMainLoading) {
    return <Loader />;
  }

  return userData ? (
    <div className="flex h-screen">
      <SettingSidebar />
      <div className="flex-1 flex flex-col">
        <SettingHeader />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={`${ROUTES.auth}/${ROUTES.login}`} />
  );
};
