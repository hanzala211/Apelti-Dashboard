import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { InvoiceProvider } from "./InvoiceContext";
import { TeamProvider } from "./TeamContext";
import { SettingProvider } from "./SettingContext";
import { ApprovalProvider } from "./ApprovalContext";

export const ProvidersWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <InvoiceProvider>
        <TeamProvider>
          <SettingProvider>
            <ApprovalProvider>{children}</ApprovalProvider>
          </SettingProvider>
        </TeamProvider>
      </InvoiceProvider>
    </AuthProvider>
  );
};

export default ProvidersWrapper;
