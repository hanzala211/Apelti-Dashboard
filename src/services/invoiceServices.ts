import { sendRequest } from "@helpers";

export const extractData = (data: unknown) =>
  sendRequest({
    url: `/invoice/data-extraction`,
    method: "POST",
    data,
    isAuthIncluded: true,
  });

export const getInvoices = () =>
  sendRequest({
    url: "/invoice",
    method: "GET",
    isAuthIncluded: true,
  });

export const updateInvoice = (invoiceId: string, data: unknown) =>
  sendRequest({
    url: `/invoice/${invoiceId}`,
    method: "PUT",
    isAuthIncluded: true,
    data,
  });

export const deleteInvoice = (invoiceId: string) =>
  sendRequest({
    url: `/invoice/${invoiceId}`,
    method: "DELETE",
    isAuthIncluded: true,
  });

export const postInvoice = (data: unknown) =>
  sendRequest({
    url: `/invoice`,
    method: "POST",
    isAuthIncluded: true,
    data,
  });

export const postDraftInvoice = (data: unknown) =>
  sendRequest({
    url: `/invoice/draft`,
    method: "POST",
    data,
    isAuthIncluded: true,
  });

export const downloadCompanyInvoices = () =>
  sendRequest({
    method: "GET",
    isAuthIncluded: true,
    url: `/invoice/export/excel`,
    responseType: "blob",
  });
