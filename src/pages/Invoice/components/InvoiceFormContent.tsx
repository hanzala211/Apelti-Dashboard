import React from 'react';
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { DatePickerField, ErrorMessage, Input, Select } from '@components';
import { InvoiceFormSchema } from '@types';
import { useInvoice } from '@context';
import { CURRENCIES } from '@constants';

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
}) => {
  const { formInputRef } = useInvoice();

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full px-7">
        <Input
          register={register('supplierName')}
          type="text"
          label="Vendor Name"
          error={errors['supplierName']?.message}
        />
      </div>
      <div className="grid px-7 md:grid-cols-2 grid-cols-1 gap-5">
        <Input
          register={register('invoiceNumber')}
          type="text"
          error={errors['invoiceNumber']?.message}
          label="Invoice number"
        />
        <Input
          register={register('poNumber')}
          error={errors['poNumber']?.message}
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
      <div className="grid px-7 lg:grid-cols-[1fr_2fr] grid-cols-1 gap-5">
        <Input
          register={register('amount', { valueAsNumber: true })}
          error={errors['amount']?.message}
          type="number"
          label="Amount"
        />
        <Input
          register={register('paymentTermDescription')}
          error={errors['paymentTermDescription']?.message}
          type="text"
          label="Invoice Description"
        />
      </div>
      <div className="grid px-7 lg:grid-cols-[1fr_1fr] grid-cols-1 gap-5">
        <Input
          register={register('supplierId')}
          error={errors['supplierId']?.message}
          type="string"
          label="Vendor ID"
        />
        <Input
          register={register('fiscalNumber')}
          error={errors['fiscalNumber']?.message}
          type="text"
          label="Fiscal Number"
        />
      </div>
      <div className="px-7">
        <Select
          control={control}
          name="currency"
          label="Currency"
          data={CURRENCIES}
        />
      </div>
      <div className="px-7">
        <label className="text-neutralGray" htmlFor="rarityInvoice">
          Rarity Invoice
        </label>
        <div className="flex gap-3 items-center">
          <div className="space-x-2">
            <input
              type="radio"
              id="once"
              value="Once"
              {...register('rarityInvoice')}
            />
            <label htmlFor="once" className="text-neutralGray">
              Once
            </label>
          </div>
          <div className="space-x-2">
            <input
              type="radio"
              id="return"
              value="Return"
              {...register('rarityInvoice')}
            />
            <label htmlFor="return" className="text-neutralGray">
              Return
            </label>
          </div>
        </div>
      </div>
      <div>
        <div className="w-fit px-7">
          <h2 className="text-[18px] font-semibold relative before:absolute before:w-full before:left-0 before:h-1 before:bg-darkBlue before:-bottom-[9px]">
            Costs ({watch('amount') > 0 && watch('amount')}{' '}
            {watch('currency') && watch('currency')})
          </h2>
        </div>
        <div className="w-full h-[1px] bg-black"></div>
      </div>
      <div className="w-full overflow-x-auto px-4 sm:px-0">
        <div className="grid grid-cols-5 min-w-[600px] w-full px-5 sm:px-2 gap-4 place-items-center border border-slateGrey">
          {['Account', 'Amount', 'Department', 'Class', 'Description'].map(
            (header) => (
              <h4 key={header} className="m-0 py-3 text-center font-medium">
                {header}
              </h4>
            )
          )}
        </div>
        {[...Array(rows)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 min-w-[600px] w-full border-b py-4 px-5 sm:px-2 gap-4 place-items-center"
          >
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
              register={register(`invoiceItems.${index}.class`)}
              type="text"
              error={errors.invoiceItems?.[index]?.class?.message}
            />
            <Input
              register={register(`invoiceItems.${index}.description`)}
              type="text"
              error={errors.invoiceItems?.[index]?.description?.message}
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
              {...register('comment')}
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
