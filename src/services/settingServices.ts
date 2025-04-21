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
  changeInvoiceExportFormat: (data: unknown) =>
    sendRequest({
      method: 'POST',
      url: `/invoice-mapping`,
      isAuthIncluded: true,
      data,
    }),
  getInvoiceFormatExport: () =>
    sendRequest({
      method: 'GET',
      url: `/invoice-mapping`,
      isAuthIncluded: true,
    }),
};
