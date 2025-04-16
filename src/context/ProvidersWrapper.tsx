import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { MessageProvider } from './MessageContext';
import { InvoiceProvider } from './InvoiceContext';
import { TeamProvider } from './TeamContext';
import { SettingProvider } from './SettingContext';
import { ApprovalProvider } from './ApprovalContext';
import { DocumentProvider } from './DocumentContext';

export const ProvidersWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <MessageProvider>
        <InvoiceProvider>
          <TeamProvider>
            <SettingProvider>
              <ApprovalProvider>
                <DocumentProvider>{children}</DocumentProvider>
              </ApprovalProvider>
            </SettingProvider>
          </TeamProvider>
        </InvoiceProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default ProvidersWrapper;
