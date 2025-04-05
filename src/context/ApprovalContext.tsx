import { approvalServices } from '@services';
import { ApprovalContextTypes, GetApprovalTypes, Invoice } from '@types';
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

  const getApprovalInvoices = async () => {
    try {
      const response = await approvalServices.getApprovalInvoices();
      console.log(response);
      if (response.status === 200) {
        const removedInvoices = response.data.data.invoices.filter(
          (item: Invoice) => item.status !== 'approved'
        );
        return {
          ...response.data.data,
          invoices: removedInvoices,
        } as GetApprovalTypes;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (data: unknown, invoiceID: string | undefined) => {
    try {
      const response = await approvalServices.changeInvoiceStatus(invoiceID, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ApprovalContext.Provider
      value={{
        selectedApprovalInvoice,
        setSelectedApprovalInvoice,
        getApprovalInvoices,
        changeStatus
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
