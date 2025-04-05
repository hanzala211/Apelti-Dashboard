import { Invoice } from "@types"

export type GetApprovalTypes = {
  approvedInvoices: number,
  invoices: Invoice[],
  pendingInvoices: number,
  rejectedInvoices: number,
  totalInvoices: number
}