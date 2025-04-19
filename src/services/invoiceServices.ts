import { sendRequest } from "@helpers";

export const invoiceServices = {
  extractData: (data: unknown) => sendRequest({
    url: `/invoice/data-extraction`,
    method: "POST",
    data,
    isAuthIncluded: true,
  }),
  getInvoices: () => sendRequest({
    url: "/invoice",
    method: "GET",
    isAuthIncluded: true
  }),
  updateInvoice: (invoiceId: string, data: unknown) => sendRequest({
    url: `/invoice/${invoiceId}`,
    method: "PUT",
    isAuthIncluded: true,
    data
  }),
  deleteInvoice: (invoiceId: string) => sendRequest({
    url: `/invoice/${invoiceId}`,
    method: "DELETE",
    isAuthIncluded: true,
  }),
  postInvoice: (data: unknown) => sendRequest({
    url: `/invoice`,
    method: "POST",
    isAuthIncluded: true,
    data
  }),
  postDraftInvoice: (data: unknown) => sendRequest({
    url: `/invoice/draft`,
    method: "POST",
    data,
    isAuthIncluded: true
  }),
  downloadCompanyInvoices: () => sendRequest({
    method: "GET",
    isAuthIncluded: true,
    url: `/invoice/export/excel`,
    responseType: 'blob'
  })
}