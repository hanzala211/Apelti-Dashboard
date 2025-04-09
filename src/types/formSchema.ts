import { z } from "zod";

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
