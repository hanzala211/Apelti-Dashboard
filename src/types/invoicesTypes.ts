export interface InvoiceItem {
  glAccount: string;
  amount: number;
  description: string;
  class: string;
  department: string;
  _id?: string;
}

export interface Invoice {
  _id?: string;
  supplierName: string;
  poNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  currency: string;
  paymentTerms: string;
  paymentTermDescription: string;
  rarityInvoice: string;
  amount: number;
  items: InvoiceItem[];
  fileUrl: string;
  comment: string;
  company?: string;
  status?: string;
  approvedBy?: null | string[];
  uploadedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  termsOfPayment?: string,
  vendorId: string,
  FiscalNumber: string,
  vatNumber: string,
  matchedWithPO?: boolean
}

export interface FilterTypes {
  id: number;
  field: string;
  value: string;
  condition: string;
}
