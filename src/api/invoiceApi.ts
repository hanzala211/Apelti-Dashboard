import { useMutation, useQuery } from '@tanstack/react-query';
import { InvoiceService } from '@services';

// Types
export interface InvoiceRequestData {
  supplierName?: string;
  invoiceNumber?: string;
  poNumber?: string;
  amount?: number;
  currency?: string;
  [key: string]: unknown;
}

export interface UpdateInvoiceRequestData {
  [key: string]: unknown;
}

export interface ExtractDataRequestData {
  file: File;
  [key: string]: unknown;
}

// Mutations
export const useExtractDataMutation = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await InvoiceService.extractData(data);
      return response.data.data;
    },
  });
};

export const usePostInvoiceMutation = () => {
  return useMutation({
    mutationFn: async (data: InvoiceRequestData) => {
      const response = await InvoiceService.postInvoice(data);
      return response.data.data;
    },
  });
};

export const useUpdateInvoiceMutation = () => {
  return useMutation({
    mutationFn: async ({ invoiceId, data }: { invoiceId: string; data: UpdateInvoiceRequestData }) => {
      const response = await InvoiceService.updateInvoice(invoiceId, data);
      return response.data.data;
    },
  });
};

export const useDeleteInvoiceMutation = () => {
  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await InvoiceService.deleteInvoice(invoiceId);
      return response.data.data;
    },
  });
};

export const usePostDraftInvoiceMutation = () => {
  return useMutation({
    mutationFn: async (data: InvoiceRequestData) => {
      const response = await InvoiceService.postDraftInvoice(data);
      return response.data.data;
    },
  });
};

export const useDownloadCompanyInvoicesMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await InvoiceService.downloadCompanyInvoices();
      return response.data;
    },
  });
};

export const useGetInvoicesQuery = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await InvoiceService.getInvoices();
      return response.data.data;
    },
  });
};
