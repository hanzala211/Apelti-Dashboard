import React from "react";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { DatePickerField, ErrorMessage, Input, Select } from "@components";
import { InvoiceFormSchema } from "@types";
import { useInvoice } from "@context";
import {
  COUNTRIES,
  CURRENCIES,
  DOCUMENT_TYPES,
  INVOICE_ITEMS_HEADER,
  TRANSACTION_TYPES,
} from "@constants";
import { Switch } from "antd";

interface InvoiceFormContentProps {
  register: UseFormRegister<InvoiceFormSchema>;
  errors: FieldErrors<InvoiceFormSchema>;
  control: Control<InvoiceFormSchema>;
  handleSubmit: UseFormHandleSubmit<InvoiceFormSchema>;
  onSubmit: SubmitHandler<InvoiceFormSchema>;
  rows: number;
  addRow: () => void;
  termOfPaymentData: { label: string; value: string }[];
  watch: UseFormWatch<InvoiceFormSchema>;
  setValue: UseFormSetValue<InvoiceFormSchema>;
}

export const InvoiceFormContent: React.FC<InvoiceFormContentProps> = ({
  register,
  errors,
  control,
  handleSubmit,
  onSubmit,
  rows,
  addRow,
  termOfPaymentData,
  watch,
  setValue,
}) => {
  const { formInputRef } = useInvoice();
  const isLocalInvoice = watch("isLocalInvoice");

  const onSubmitHandler: SubmitHandler<InvoiceFormSchema> = (data) => {
    if (!isLocalInvoice) {
      data.supplierId = "";
    }
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="w-full px-7">
        <Input
          register={register("supplierName")}
          type="text"
          label="Vendor Name"
          error={errors["supplierName"]?.message}
        />
      </div>
      <div className="grid px-7 md:grid-cols-2 grid-cols-1 gap-5">
        <Input
          register={register("invoiceNumber")}
          type="text"
          error={errors["invoiceNumber"]?.message}
          label="Invoice number"
        />
        <Input
          register={register("poNumber")}
          error={errors["poNumber"]?.message}
          type="text"
          label="PO no."
        />
      </div>
      <div className="grid px-7 xl:grid-cols-3 grid-cols-1 xl:gap-10 gap-4 w-full">
        <Select
          control={control}
          name="termsOfPayment"
          label="Terms of Payment"
          data={termOfPaymentData}
        />
        <div className="flex flex-col gap-2 w-full">
          <label className="text-neutralGray" htmlFor="invoiceDate">
            Invoice date
          </label>
          <DatePickerField control={control} name="invoiceDate" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-neutralGray" htmlFor="paymentTerms">
            Payment term
          </label>
          <DatePickerField control={control} name="paymentTerms" />
        </div>
      </div>
      <div className="grid px-7 lg:grid-cols-3 grid-cols-1 gap-5">
        <Input
          register={register("amount", { valueAsNumber: true })}
          error={errors["amount"]?.message}
          type="number"
          label="Amount"
        />
        <Input
          register={register("amountWithOutVat", { valueAsNumber: true })}
          error={errors["amountWithOutVat"]?.message}
          type="number"
          label="Amount Without VAT"
        />
        <Input
          register={register("vatPercentage", { valueAsNumber: true })}
          error={errors["vatPercentage"]?.message}
          type="number"
          label="VAT Percentage"
        />
      </div>
      <div className="grid px-7 lg:grid-cols-3 grid-cols-1 gap-5">
        {isLocalInvoice ? (
          <Input
            register={register("supplierId")}
            error={errors["supplierId"]?.message}
            type="string"
            label="Vendor ID"
          />
        ) : (
          <Input
            register={register("jciNumber")}
            error={errors["jciNumber"]?.message}
            type="text"
            label="JCI Number"
          />
        )}
        <Input
          register={register("intervalVendorId")}
          error={errors["intervalVendorId"]?.message}
          type="text"
          label="Interval Vendor ID"
        />
        <Input
          register={register("vatNumber")}
          error={errors["vatNumber"]?.message}
          type="text"
          label="VAT Number"
        />
      </div>
      <div className="grid px-7 lg:grid-cols-[1fr_1fr] grid-cols-1 gap-5">
        <Select
          control={control}
          name="currency"
          label="Currency"
          data={CURRENCIES}
        />
        <Select
          control={control}
          name="countryCode"
          label="Country Code"
          data={COUNTRIES}
        />
      </div>
      <div className="px-7 grid grid-cols-1 gap-5">
        <Input
          register={register("location")}
          error={errors["location"]?.message}
          type="text"
          label="Location"
        />
      </div>
      <div className="grid px-7 lg:grid-cols-[1fr_1fr] grid-cols-1 gap-5">
        <Select
          control={control}
          name="transactionType"
          label="Transaction Type"
          data={TRANSACTION_TYPES}
        />
        <Select
          control={control}
          name="documentType"
          label="Document Type"
          data={DOCUMENT_TYPES}
        />
      </div>
      <div className="px-7">
        <Input
          register={register("paymentTermDescription")}
          error={errors["paymentTermDescription"]?.message}
          type="text"
          label="Invoice Description"
        />
      </div>
      <div className="px-7 flex items-center gap-2">
        <label className="text-neutralGray" htmlFor="localInvoice">
          Local Invoice
        </label>
        <Switch
          id="localInvoice"
          checked={isLocalInvoice}
          onChange={(checked) => setValue("isLocalInvoice", checked)}
        />
      </div>
      <div>
        <div className="w-fit px-7">
          <h2 className="text-[18px] font-semibold relative before:absolute before:w-full before:left-0 before:h-1 before:bg-darkBlue before:-bottom-[9px]">
            Costs ({watch("amount") > 0 && watch("amount")}{" "}
            {watch("currency") && watch("currency")})
          </h2>
        </div>
        <div className="w-full h-[1px] bg-black"></div>
      </div>
      <div className="w-full overflow-x-auto px-4 sm:px-0">
        <div className="grid grid-cols-11 min-w-[1100px] w-full px-5 sm:px-2 gap-4 place-items-center border border-slateGrey">
          {INVOICE_ITEMS_HEADER.map((header) => (
            <h4 key={header} className="m-0 py-3 text-center font-medium">
              {header}
            </h4>
          ))}
        </div>
        {[...Array(rows)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-11 min-w-[1100px] w-full border-b py-4 px-5 sm:px-2 gap-4 place-items-center"
          >
            <Input
              register={register(`invoiceItems.${index}.lineItemNumber`)}
              type="text"
              error={errors.invoiceItems?.[index]?.lineItemNumber?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.glAccount`)}
              type="text"
              error={errors.invoiceItems?.[index]?.glAccount?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.amount`, {
                valueAsNumber: true,
              })}
              type="number"
              error={errors.invoiceItems?.[index]?.amount?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.department`)}
              type="text"
              error={errors.invoiceItems?.[index]?.department?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.quantity`, {
                valueAsNumber: true,
              })}
              type="number"
              error={errors.invoiceItems?.[index]?.quantity?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.description`)}
              type="text"
              error={errors.invoiceItems?.[index]?.description?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.expensesGL`)}
              type="text"
              error={errors.invoiceItems?.[index]?.expensesGL?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.vatGL`)}
              type="text"
              error={errors.invoiceItems?.[index]?.vatGL?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.liabilityAccount`)}
              type="text"
              error={errors.invoiceItems?.[index]?.liabilityAccount?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.projectCode`)}
              type="text"
              error={errors.invoiceItems?.[index]?.projectCode?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.costCentre`)}
              type="text"
              error={errors.invoiceItems?.[index]?.costCentre?.message}
            />
          </div>
        ))}
        <input type="submit" className="hidden" ref={formInputRef} />
      </div>
      <div>
        <div className="w-full px-7 pb-5 pt-2 flex items-center border-b-[1px]">
          <button
            type="button"
            onClick={addRow}
            className="m-0 hover:opacity-60"
          >
            Add Table
          </button>
        </div>
        <div className="w-full grid md:grid-cols-2 md:px-7">
          <div className="md:border-r-2 md:border-b-2 py-4 md:pr-7 px-7 md:px-0">
            <h3 className="text-[20px] font-semibold">Approvers</h3>
          </div>
          <div className="md:pl-7 space-y-5 px-7 md:px-0 py-4">
            <h3 className="text-[20px] font-semibold">
              Add a Comment to an Invoice
            </h3>
            <textarea
              {...register("comment")}
              className="rounded-none text-[20px] py-2 bg-white w-full px-3 border border-basicBlack focus:shadow-blue-300 focus-within:shadow-sm focus:outline-none focus:border-darkBlue hover:border-darkBlue transition-all duration-200 resize-none"
              rows={5}
            />
            <ErrorMessage error={errors.comment?.message} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceFormContent;
