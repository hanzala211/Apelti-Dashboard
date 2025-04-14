import { MutationFunction, UseMutationResult } from '@tanstack/react-query';
import { RefObject } from 'react';
import { Socket } from 'socket.io-client';
import { ApexOptions } from 'apexcharts';

export type Role = 'admin' | 'clerk' | 'approver' | 'accountant' | 'payer';

export interface IMessage {
  companyName: string;
  isDuplicate: boolean;
  fileName: string;
  fileUrl: string;
  fileSentBy: string;
  invoiceId: string;
  company: string;
  supplierName: string;
  _id: string;
}

export interface MessageComment {
  user: IUser;
  comment: string;
  _id: string;
}

export interface CommentResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: MessageComment[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  company: string;
  forgotPasswordCode?: number | null;
  passwordResetCodeExpiry?: Date | null;
  _id: string;
  _v: number;
  createdAt: string;
  updatedAt: string;
}

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
  termsOfPayment?: string;
  vendorId: string;
  FiscalNumber: string;
  vatNumber: string;
  matchedWithPO?: boolean;
  fileName?: string;
}

export interface FilterTypes {
  id: number;
  field: string;
  value: string;
  condition: string;
}

export interface IDocument {
  name: string;
  added: string;
  section: string;
}

export interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

export type GetApprovalTypes = {
  approvedInvoices: number;
  invoices: Invoice[];
  pendingInvoices: number;
  rejectedInvoices: number;
  totalInvoices: number;
  draftInvoices: number;
};

export interface MessageContextTypes {
  selectedMessage: IMessage | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessage | null>>;
  getMessages: () => Promise<IMessage[] | undefined>;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  postCommentMessage: MutationFunction<CommentResponse, string>;
  getComments: (messageId: string, page: number) => Promise<CommentResponse>;
}

export interface InvoiceContextTypes {
  selectedImage: { label: string; value: string } | null;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<{ label: string; value: string } | null>
  >;
  handleFile: () => void;
  handleFormClick: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  formInputRef: RefObject<HTMLInputElement | null>;
  isInvoiceModelOpen: boolean;
  setIsInvoiceModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  extractDataMutation: UseMutationResult<void, Error, void, unknown>;
  extractedData: Invoice | null;
  setExtractedData: React.Dispatch<React.SetStateAction<Invoice | null>>;
  getInvoices: () => Promise<Invoice[] | undefined>;
  updateInvoice: (
    invoiceId: string,
    data: unknown
  ) => Promise<Invoice | undefined>;
  formData: Invoice | null;
  setFormData: React.Dispatch<React.SetStateAction<Invoice | null>>;
  handleBtnClick: () => void;
  removeDataBtnRef: RefObject<HTMLButtonElement | null>;
  postInvoice: (data: unknown) => Promise<Invoice | undefined>;
  selectedInvoice: number | null;
  setSelectedInvoice: React.Dispatch<React.SetStateAction<number | null>>;
  selectedData: Invoice | null;
  setSelectedData: React.Dispatch<React.SetStateAction<Invoice | null>>;
  postInvoiceMutation: UseMutationResult<Invoice, Error, unknown, unknown>;
  updateInvoiceMutation: UseMutationResult<Invoice, Error, unknown, unknown>;
  deleteInvoiceMutation: UseMutationResult<void, Error, string, unknown>;
  draftBtnRef: React.RefObject<HTMLButtonElement | null>;
  handleDraftBtnClick: () => void;
  postDraftInvoiceMutation: UseMutationResult<void, Error, unknown, unknown>;
}

export interface AuthContextTypes {
  userData: IUser | null;
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
  isRemember: boolean;
  setIsRemember: React.Dispatch<React.SetStateAction<boolean>>;
  signup: (sendData: unknown) => void;
  login: (sendData: unknown) => void;
  isMainLoading: boolean;
  setIsMainLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isAuthLoading: boolean;
  socketClient: Socket | null;
}

export interface TeamContextTypes {
  addMember: (sendData: unknown) => Promise<IUser | null>;
  deleteMember: (userId: string) => Promise<null | undefined>;
  editingUser: IUser | null;
  setEditingUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  updateUser: (userId: string, data: unknown) => Promise<IUser | null>;
  errorMessage: string;
  getMembers: () => Promise<IUser[] | null>;
}

export interface SettingContextTypes {
  changePassword: (data: unknown) => void;
  errorMessage: string;
  changeUserData: (data: unknown) => void;
}

export interface ApprovalContextTypes {
  selectedApprovalInvoice: number | null;
  setSelectedApprovalInvoice: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  getApprovalInvoices: () => Promise<GetApprovalTypes | undefined>;
  changeStatus: (data: unknown, invoiceID: string | undefined) => Promise<void>;
}
