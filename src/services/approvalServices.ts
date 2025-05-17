import { sendRequest } from "@helpers";

export const getApprovalInvoices = () => sendRequest({
  method: "GET",
  url: `/invoice/summary`,
  isAuthIncluded: true
});

export const changeInvoiceStatus = (invoiceId: string | undefined, data: unknown) => sendRequest({
  method: "PUT",
  url: `/invoice/status/${invoiceId}`,
  isAuthIncluded: true,
  data
});
