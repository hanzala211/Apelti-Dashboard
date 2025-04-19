import { ROUTES } from '@constants';
import { ReactQueryProvider, ProvidersWrapper } from '@context';
import { AppLayout, AuthLayout, PageNotFound, SettingsLayout } from '@layouts';
import {
  ApprovalPage,
  DashboardPage,
  DocumentPage,
  ForgotPasswordPage,
  InvoicePage,
  LoginPage,
  MessagesPage,
  ProfileSettingPage,
  ResetPasswordPage,
  SignupPage,
  TeamPage,
} from '@pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';

const App: React.FC = () => {
  return (
    <>
      <ReactQueryProvider>
        <BrowserRouter>
          <ProvidersWrapper>
            <Routes>
              <Route path={ROUTES.auth} element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                <Route path={ROUTES.login} element={<LoginPage />} />
                <Route path={ROUTES.signup} element={<SignupPage />} />
                <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
                <Route path={ROUTES.reset} element={<ResetPasswordPage />} />
              </Route>

              <Route element={<AppLayout />} path="/">
                <Route index element={<DashboardPage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path={ROUTES.not_available} element={<PageNotFound />} />
                <Route path={ROUTES.documents} element={<DocumentPage />} />
                <Route path={ROUTES.messages} element={<MessagesPage />} />
                <Route path={ROUTES.invoices} element={<InvoicePage />} />
                <Route path={ROUTES.team} element={<TeamPage />} />
                <Route path={ROUTES.approval} element={<ApprovalPage />} />
              </Route>

              <Route path={ROUTES.settings} element={<SettingsLayout />}>
                <Route index element={<ProfileSettingPage />} />
                <Route path={ROUTES.profile} element={<ProfileSettingPage />} />
              </Route>
            </Routes>
          </ProvidersWrapper>
        </BrowserRouter>
      </ReactQueryProvider>
    </>
  );
};

export default App;
