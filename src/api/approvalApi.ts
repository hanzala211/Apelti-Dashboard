import { useMutation, useQuery } from '@tanstack/react-query';
import { ApprovalService } from '@services';

// Types
export interface ChangeStatusRequestData {
  status: string;
  [key: string]: unknown;
}

// Mutations
export const useChangeInvoiceStatusMutation = () => {
  return useMutation({
    mutationFn: async ({ invoiceId, data }: { invoiceId: string | undefined; data: ChangeStatusRequestData }) => {
      const response = await ApprovalService.changeInvoiceStatus(invoiceId, data);
      return response.data.data;
    },
  });
};

// Queries
export const useGetApprovalInvoicesQuery = () => {
  return useQuery({
    queryKey: ['approval-invoices'],
    queryFn: async () => {
      const response = await ApprovalService.getApprovalInvoices();
      return response.data.data;
    },
  });
};
