import { z } from "zod";

export const RoleEnum = z.enum([
  "admin",
  "clerk",
  "payer",
  "accountant",
  "approver",
]);

export const invoiceItemSchema = z.object({
  glAccount: z.string().min(1, "Please provide an account number."),
  amount: z.number().min(1, "Please enter an amount of at least 1."),
  description: z.string().min(1, "Please provide a description."),
  department: z.string().min(1, "Please specify the department."),
  quantity: z.number().min(1, "Please enter quantity of at least 1."),
  lineItemNumber: z.string(),
});

export const invoiceForm = z
  .object({
    supplierName: z.string().min(1, { message: "Vendor name is required." }),
    invoiceNumber: z
      .string()
      .min(1, { message: "Invoice number is required." }),
    poNumber: z
      .string()
      .min(1, { message: "Purchase order number is required." }),
    termsOfPayment: z
      .string()
      .min(1, { message: "Terms of payment are required." }),
    invoiceDate: z.string().min(1, { message: "Invoice date is required." }),
    paymentTerms: z.string().min(1, { message: "Payment terms are required." }),
    amount: z.number().min(1, { message: "Amount must be at least 1." }),
    paymentTermDescription: z.string(),
    rarityInvoice: z.string(),
    invoiceItems: z.array(invoiceItemSchema),
    currency: z.string().min(1, { message: "Currency is required." }),
    countryCode: z.string().min(1, { message: "Country code is required." }),
    comment: z.string().min(1, { message: "Comment is required." }),
    supplierId: z.string().optional(),
    vatNumber: z.string().min(1, { message: "VAT number is required." }),
    internalPartnerCode: z
      .string()
      .min(1, { message: "Internal partner code is required." }),
    amountWithOutVat: z
      .number()
      .min(1, { message: "Amount without VAT must be at least 1." }),
    vatPercentage: z
      .number()
      .min(1, { message: "VAT percentage must be greater than 0." }),
    location: z.string().min(1, { message: "Invoice location is required." }),
    jciNumber: z.string().optional(),
    transactionType: z.string(),
    documentType: z.string(),
    isLocalInvoice: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isLocalInvoice) {
        return !!data.supplierId;
      } else {
        return !!data.jciNumber;
      }
    },
    {
      message:
        "Vendor ID is required when the invoice is local, and JCI Number is required when the invoice is foreign.",
      path: ["supplierId", "jciNumber"],
    }
  );

export const optionalInvoiceForm = z.object({
  supplierName: z.string().optional(),
  invoiceNumber: z.string().optional(),
  poNumber: z.string().optional(),
  termsOfPayment: z.string().optional(),
  amount: z.number().optional(),
  invoiceItems: z.array(invoiceItemSchema).optional(),
  currency: z.string().optional(),
});

export const draftInvoiceSchema = optionalInvoiceForm.extend({
  supplierName: z.string(),
  invoiceNumber: z.string(),
  poNumber: z.string(),
  termsOfPayment: z.string(),
  amount: z.number(),
  invoiceItems: z.array(invoiceItemSchema),
  currency: z.string(),
});

export type InvoiceFormSchema = z.infer<typeof invoiceForm>;

export const loginForm = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Your password must be at least 8 characters long."),
});

export type LoginFormSchema = z.infer<typeof loginForm>;

export const signupForm = z.object({
  firstName: z.string().min(1, "Please enter your first name."),
  lastName: z.string().min(1, "Please enter your last name."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Please ensure your password is at least 8 characters long."),
  companyName: z.string().min(1, "Please enter your company name."),
  numberOfEmployees: z.number().min(1, "Please enter the number of employees."),
  businessType: z.string(),
  phone: z.string().min(1, "Please enter your phone number."),
});

export type SignupFormSchema = z.infer<typeof signupForm>;

export const addMemberForm = signupForm
  .pick({ firstName: true, lastName: true, email: true, phone: true })
  .extend({
    role: RoleEnum,
    password: z
      .string()
      .min(8, "Please enter a password with at least 8 characters.")
      .optional(),
  });

export type AddMemberFormSchema = z.infer<typeof addMemberForm>;

export const profileSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name.").optional(),
  lastName: z.string().min(1, "Please enter your last name.").optional(),
  email: z.string().email("Please enter a valid email address.").optional(),
  oldPassword: z
    .string()
    .min(8, "Please enter your current password (at least 8 characters).")
    .optional(),
  newPassword: z
    .string()
    .min(8, "Please enter a new password (at least 8 characters).")
    .optional(),
  role: z.string().min(1, "Please select a role.").optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  forgotPasswordCode: z
    .string()
    .length(6, { message: "Please enter the 6‑digit verification code." }),
  newPassword: z
    .string()
    .min(8, { message: "Your new password must be at least 8 characters." }),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const invoiceRulesSchema = z.object({
  keyWord: z.string(),
  action: z.string(),
  value: z.string().min(1, "Value is Required."),
  invoiceArea: z.string(),
  field: z.union([z.string(), z.number()]),
});

export type InvoiceRulesSchema = z.infer<typeof invoiceRulesSchema>;
