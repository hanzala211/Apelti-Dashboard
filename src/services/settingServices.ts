import { sendRequest } from "@helpers";

export const changePassword = (data: unknown) =>
  sendRequest({
    method: "POST",
    url: "/user/change-password",
    data,
    isAuthIncluded: true,
  });

export const changeUserData = (data: unknown, userID: string) =>
  sendRequest({
    method: "PUT",
    url: `/company/user/${userID}`,
    isAuthIncluded: true,
    data,
  });

export const createInvoiceExportFormat = (data: unknown) =>
  sendRequest({
    method: "POST",
    url: `/mapping`,
    isAuthIncluded: true,
    data,
  });

export const getInvoiceFormatExport = () =>
  sendRequest({
    method: "GET",
    url: `/mapping/all`,
    isAuthIncluded: true,
  });

export const selectExportFormat = (data: unknown) =>
  sendRequest({
    method: "PUT",
    url: `/mapping/user`,
    isAuthIncluded: true,
    data,
  });

export const updateExportFieldsFormat = (formatId: string, data: unknown) =>
  sendRequest({
    method: "PUT",
    url: `/mapping/${formatId}`,
    isAuthIncluded: true,
    data,
  });

export const getSingleExportFormat = (formatId: string) =>
  sendRequest({
    method: "GET",
    url: `/mapping/${formatId}`,
    isAuthIncluded: true,
  });

export const uploadPoData = (data: unknown) =>
  sendRequest({
    method: "POST",
    url: `/excel/upload`,
    isAuthIncluded: true,
    data,
  });

export const postInvoiceRules = (data: unknown) =>
  sendRequest({
    url: `/invoice-rules`,
    data,
    isAuthIncluded: true,
    method: "POST",
  });

export const getInvoiceRules = () =>
  sendRequest({
    url: `/invoice-rules`,
    isAuthIncluded: true,
    method: "GET",
  });

export const updateInvoiceRuleStatus = (ruleId: string, data: unknown) =>
  sendRequest({
    url: `/invoice-rules/status/${ruleId}`,
    data,
    isAuthIncluded: true,
    method: "PUT",
  });

export const deleteInvoiceRules = (ruleId: string) =>
  sendRequest({
    url: `/invoice-rules/${ruleId}`,
    isAuthIncluded: true,
    method: "DELETE",
  });
