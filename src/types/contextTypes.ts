import { UseMutationResult } from '@tanstack/react-query';
import { GetApprovalTypes, IMessage, Invoice, IUser } from '@types';
import { RefObject } from 'react';
import { Socket } from 'socket.io-client';

export interface MessageContextTypes {
  selectedMessage: IMessage | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessage | null>>;
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
