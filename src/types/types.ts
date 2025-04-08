import { z } from 'zod';
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

export const RoleEnum = z.enum([
  'admin',
  'clerk',
  'payer',
  'accountant',
  'approver',
]);

export const invoiceItemSchema = z.object({
  glAccount: z.string().min(1, 'Please provide an account number.'),
  amount: z.number().min(1, 'Please enter an amount of at least 1.'),
  description: z.string().min(1, 'Please provide a description.'),
  class: z.string().min(1, 'Please specify the class.'),
  department: z.string().min(1, 'Please specify the department.'),
});

export const invoiceForm = z.object({
  supplierName: z.string().min(1, 'Please enter the vendor name.'),
  invoiceNumber: z.string().min(1, 'Please enter the invoice number.'),
  poNumber: z.string().min(1, 'Please enter the purchase order number.'),
  termsOfPayment: z.string().min(1, 'Please specify the terms of payment.'),
  invoiceDate: z.string().min(1, 'Please enter the invoice date.'),
  paymentTerms: z.string().min(1, 'Please specify the payment terms.'),
  amount: z.number().min(1, 'Please enter an amount of at least 1.'),
  paymentTermDescription: z.string(),
  rarityInvoice: z.string(),
  invoiceItems: z.array(invoiceItemSchema),
  currency: z.string(),
  comment: z.string().min(1, 'Please enter a comment.'),
  supplierId: z.string().min(1, 'Please enter the vendor ID.'),
  fiscalNumber: z.string().min(1, 'Please enter the fiscal number.'),
});

export const optionalInvoiceForm = invoiceForm.partial();

export const draftInvoiceSchema = optionalInvoiceForm.extend({
  supplierName: invoiceForm.shape.supplierName,
  invoiceNumber: invoiceForm.shape.invoiceNumber,
  poNumber: invoiceForm.shape.poNumber,
  termsOfPayment: invoiceForm.shape.termsOfPayment,
  amount: invoiceForm.shape.amount,
  invoiceItems: invoiceForm.shape.invoiceItems,
  currency: invoiceForm.shape.currency,
});

export type InvoiceFormSchema = z.infer<typeof invoiceForm>;

export const loginForm = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Your password must be at least 8 characters long.'),
});

export type LoginFormSchema = z.infer<typeof loginForm>;

export const signupForm = z.object({
  firstName: z.string().min(1, 'Please enter your first name.'),
  lastName: z.string().min(1, 'Please enter your last name.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Please ensure your password is at least 8 characters long.'),
  companyName: z.string().min(1, 'Please enter your company name.'),
  numberOfEmployees: z.number().min(1, 'Please enter the number of employees.'),
  businessType: z.string(),
  phone: z.string().min(1, 'Please enter your phone number.'),
});

export type SignupFormSchema = z.infer<typeof signupForm>;

export const addMemberForm = signupForm
  .pick({ firstName: true, lastName: true, email: true, phone: true })
  .extend({
    role: RoleEnum,
    password: z
      .string()
      .min(8, 'Please enter a password with at least 8 characters.')
      .optional(),
  });

export type AddMemberFormSchema = z.infer<typeof addMemberForm>;

export const profileSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name.').optional(),
  lastName: z.string().min(1, 'Please enter your last name.').optional(),
  email: z.string().email('Please enter a valid email address.').optional(),
  oldPassword: z
    .string()
    .min(8, 'Please enter your current password (at least 8 characters).')
    .optional(),
  newPassword: z
    .string()
    .min(8, 'Please enter a new password (at least 8 characters).')
    .optional(),
  role: z.string().min(1, 'Please select a role.').optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
