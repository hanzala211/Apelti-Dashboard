import { sendRequest } from '@helpers';

export const settingServices = {
  changePassword: (data: unknown) =>
    sendRequest({
      method: 'POST',
      url: '/user/change-password',
      data,
      isAuthIncluded: true,
    }),
  changeUserData: (data: unknown, userID: string) =>
    sendRequest({
      method: 'PUT',
      url: `/company/user/${userID}`,
      isAuthIncluded: true,
      data,
    }),
  createInvoiceExportFormat: (data: unknown) =>
    sendRequest({
      method: 'POST',
      url: `/mapping`,
      isAuthIncluded: true,
      data,
    }),
  getInvoiceFormatExport: () =>
    sendRequest({
      method: 'GET',
      url: `/mapping/all`,
      isAuthIncluded: true,
    }),
  selectExportFormat: (data: unknown) =>
    sendRequest({
      method: 'PUT',
      url: `/mapping/user`,
      isAuthIncluded: true,
      data,
    }),
  updateExportFieldsFormat: (formatId: string, data: unknown) =>
    sendRequest({
      method: 'PUT',
      url: `/mapping/${formatId}`,
      isAuthIncluded: true,
      data,
    }),
  getSingleExportFormat: (formatId: string) =>
    sendRequest({
      method: 'GET',
      url: `/mapping/${formatId}`,
      isAuthIncluded: true,
    }),
  uploadPoData: (data: unknown) => sendRequest({
    method: "POST",
    url: `/excel/upload`,
    isAuthIncluded: true,
    data,
  }),
  postInvoiceRules: (data: unknown) => sendRequest({
    url: `/invoice-rules`,
    data,
    isAuthIncluded: true,
    method: "POST"
  }),
  getInvoiceRules: () => sendRequest({
    url: `/invoice-rules`,
    isAuthIncluded: true,
    method: "GET"
  }),
  updateInvoiceRuleStatus: (ruleId: string, data: unknown) => sendRequest({
    url: `/invoice-rules/status/${ruleId}`,
    data,
    isAuthIncluded: true,
    method: "PUT"
  }),
  deleteInvoiceRules: (ruleId: string) => sendRequest({
    url: `/invoice-rules/${ruleId}`,
    isAuthIncluded: true,
    method: "DELETE"
  }),
};
