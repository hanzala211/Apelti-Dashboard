import { ApprovalContextTypes } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

const ApprovalContext = createContext<ApprovalContextTypes | undefined>(
  undefined
);

export const ApprovalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedApprovalInvoice, setSelectedApprovalInvoice] = useState<
    number | null
  >(null);

  return (
    <ApprovalContext.Provider
      value={{
        selectedApprovalInvoice,
        setSelectedApprovalInvoice
      }}
    >
      {children}
    </ApprovalContext.Provider>
  );
};

export const useApproval = (): ApprovalContextTypes => {
  const context = useContext(ApprovalContext);
  if (!context) {
    throw new Error('use useApproval inside Approval Provider');
  }
  return context;
};
