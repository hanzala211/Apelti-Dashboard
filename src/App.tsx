import { ROUTES } from '@constants';
import {
  AuthProvider,
  InvoiceProvider,
  MessageProvider,
  ReactQueryProvider,
  SettingProvider,
  TeamProvider,
  ApprovalProvider
} from '@context';
import { AppLayout, AuthLayout, PageNotFound, SettingsLayout } from '@layouts';
import {
  ApprovalPage,
  DashboardPage,
  DocumentPage,
  InvoicePage,
  LoginPage,
  MessagesPage,
  ProfileSettingPage,
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
          <AuthProvider>
            <MessageProvider>
              <InvoiceProvider>
                <TeamProvider>
                  <SettingProvider>
                    <ApprovalProvider>

                      <Routes>
                        <Route path={ROUTES.auth} element={<AuthLayout />}>
                          <Route index element={<LoginPage />} />
                          <Route path={ROUTES.login} element={<LoginPage />} />
                          <Route path={ROUTES.signup} element={<SignupPage />} />
                        </Route>

                        <Route element={<AppLayout />} path="/">
                          <Route index element={<DashboardPage />} />
                          <Route path="*" element={<PageNotFound />} />
                          <Route
                            path={ROUTES.not_available}
                            element={<PageNotFound />}
                          />
                          <Route
                            path={ROUTES.documents}
                            element={<DocumentPage />}
                          />
                          <Route
                            path={ROUTES.messages}
                            element={<MessagesPage />}
                          />
                          <Route
                            path={ROUTES.invoices}
                            element={<InvoicePage />}
                          />
                          <Route path={ROUTES.team} element={<TeamPage />} />
                          <Route path={ROUTES.approval} element={<ApprovalPage />} />
                        </Route>

                        <Route
                          path={ROUTES.settings}
                          element={<SettingsLayout />}
                        >
                          <Route index element={<ProfileSettingPage />} />
                          <Route
                            path={ROUTES.profile}
                            element={<ProfileSettingPage />}
                          />
                        </Route>
                      </Routes>
                    </ApprovalProvider>
                  </SettingProvider>
                </TeamProvider>
              </InvoiceProvider>
            </MessageProvider>
          </AuthProvider>
        </BrowserRouter>
      </ReactQueryProvider>
    </>
  );
};

export default App;
