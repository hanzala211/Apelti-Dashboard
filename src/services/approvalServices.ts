import { sendRequest } from "@helpers";

export const approvalServices = {
  getApprovalInvoices: () => sendRequest({
    method: "GET",
    url: `/invoice/summary`,
    isAuthIncluded: true
  }),
  changeInvoiceStatus: (invoiceId: string | undefined, data: unknown) => sendRequest({
    method: "PUT",
    url: `/invoice/status/${invoiceId}`,
    isAuthIncluded: true,
    data
  })
}