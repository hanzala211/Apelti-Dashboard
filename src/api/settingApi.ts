import { useMutation, useQuery } from '@tanstack/react-query';
import { SettingService } from '@services';

// Types
export interface ChangePasswordRequestData {
  currentPassword: string;
  newPassword: string;
  [key: string]: unknown;
}

export interface UserDataRequestData {
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: unknown;
}

export interface InvoiceExportFormatRequestData {
  exportFormateName: string;
  mappings: unknown;
  [key: string]: unknown;
}

export interface InvoiceRuleRequestData {
  ruleName: string;
  condition: unknown;
  action: unknown;
  isActive?: boolean;
  [key: string]: unknown;
}

// Mutations
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequestData) => {
      const response = await SettingService.changePassword(data);
      return response.data.data;
    },
  });
};

export const useChangeUserDataMutation = () => {
  return useMutation({
    mutationFn: async ({ data, userId }: { data: UserDataRequestData; userId: string }) => {
      const response = await SettingService.changeUserData(data, userId);
      return response.data.data;
    },
  });
};

export const useCreateInvoiceExportFormatMutation = () => {
  return useMutation({
    mutationFn: async (data: InvoiceExportFormatRequestData) => {
      const response = await SettingService.createInvoiceExportFormat(data);
      return response.data.data;
    },
  });
};

export const useSelectExportFormatMutation = () => {
  return useMutation({
    mutationFn: async (data: { formatId: string }) => {
      const response = await SettingService.selectExportFormat(data);
      return response.data.data;
    },
  });
};

export const useUpdateExportFieldsFormatMutation = () => {
  return useMutation({
    mutationFn: async ({ formatId, data }: { formatId: string; data: unknown }) => {
      const response = await SettingService.updateExportFieldsFormat(formatId, data);
      return response.data.data;
    },
  });
};

export const useUploadPoDataMutation = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await SettingService.uploadPoData(data);
      return response.data;
    },
  });
};

export const usePostInvoiceRulesMutation = () => {
  return useMutation({
    mutationFn: async (data: InvoiceRuleRequestData) => {
      const response = await SettingService.postInvoiceRules(data);
      return response.data.data;
    },
  });
};

export const useUpdateInvoiceRuleStatusMutation = () => {
  return useMutation({
    mutationFn: async ({ ruleId, data }: { ruleId: string; data: { isActive: boolean } }) => {
      const response = await SettingService.updateInvoiceRuleStatus(ruleId, data);
      return response.data.data;
    },
  });
};

export const useDeleteInvoiceRulesMutation = () => {
  return useMutation({
    mutationFn: async (ruleId: string) => {
      const response = await SettingService.deleteInvoiceRules(ruleId);
      return response.data.data;
    },
  });
};

// Queries
export const useGetInvoiceFormatExportQuery = () => {
  return useQuery({
    queryKey: ['invoice-export-formats'],
    queryFn: async () => {
      const response = await SettingService.getInvoiceFormatExport();
      return response.data.data;
    },
  });
};

export const useGetSingleExportFormatQuery = (formatId: string) => {
  return useQuery({
    queryKey: ['export-format', formatId],
    queryFn: async () => {
      const response = await SettingService.getSingleExportFormat(formatId);
      return response.data.data;
    },
    enabled: !!formatId, // Only run query if formatId is provided
  });
};

export const useGetInvoiceRulesQuery = () => {
  return useQuery({
    queryKey: ['invoice-rules'],
    queryFn: async () => {
      const response = await SettingService.getInvoiceRules();
      return response.data.data;
    },
  });
};
