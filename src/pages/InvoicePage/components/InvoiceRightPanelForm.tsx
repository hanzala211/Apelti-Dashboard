import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Invoice, invoiceForm, InvoiceFormSchema } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';
import { convertDateToISO, formatDate } from '@helpers';
import { useInvoice } from '@context';
import InvoiceHeader from './InvoiceHeader';
import ImageUpload from './ImageUpload';
import InvoiceFormContent from './InvoiceFormContent';
import { CURRENCIES, TERM_OF_PAYMENT } from '@constants';
import InvoiceRightPanelOverview from './InvoiceRightPanelOverview';

export const InvoiceRightPanelForm: React.FC = () => {
  const {
    selectedImage,
    handleChange,
    handleFile,
    setSelectedImage,
    fileInputRef,
    extractedData,
    formData,
    removeDataBtnRef,
    selectedData,
    postInvoiceMutation,
    updateInvoiceMutation
  } = useInvoice();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<InvoiceFormSchema>({
    resolver: zodResolver(invoiceForm),
    defaultValues: {
      rarityInvoice: 'Once',
      currency: CURRENCIES[0].value,
      termsOfPayment: TERM_OF_PAYMENT[0].value,
    },
  });
  const [rows, setRows] = useState<number>(extractedData?.items?.length || 1);

  useEffect(() => {
    if (extractedData || selectedData) {
      const data = extractedData || selectedData || ({} as Invoice);
      setValue('supplierName', data.supplierName || '');
      setValue('invoiceNumber', data.invoiceNumber || '');
      setValue('poNumber', data.poNumber || '');
      setValue('currency', data.currency || CURRENCIES[0].value);
      setValue('supplierId', data.vendorId || '');
      setValue('fiscalNumber', data.FiscalNumber || '');
      setValue('paymentTermDescription', data.paymentTermDescription || '');
      setValue('comment', data.comment || '');

      if (data.paymentTerms?.length > 0) {
        setValue('paymentTerms', formatDate(data.paymentTerms));
      }

      setValue('amount', data.amount || 0);

      if (data.invoiceDate?.length > 0) {
        setValue('invoiceDate', formatDate(data.invoiceDate));
      }

      if (data.items?.length > 0) {
        setValue(
          'invoiceItems',
          data.items.map((item) => ({
            description: item.description || '',
            glAccount: item.glAccount || '',
            amount: item.amount || 0,
            class: item.class || '',
            department: item.department || '',
          }))
        );
        setRows(data.items.length);
      }
    }
  }, [extractedData, selectedData, setValue]);

  const onSubmit: SubmitHandler<InvoiceFormSchema> = (data) => {
    console.log(data);
    const result = {
      supplierName: data.supplierName,
      invoiceNumber: data.invoiceNumber,
      poNumber: data.poNumber,
      termsOfPayment: data.termsOfPayment,
      invoiceDate: convertDateToISO(data.invoiceDate),
      paymentTerms: convertDateToISO(data.paymentTerms),
      amount: data.amount,
      paymentTermDescription: data.paymentTermDescription,
      currency: data.currency,
      rarityInvoice: data.rarityInvoice,
      items: data.invoiceItems,
      comment: data.comment,
      fileUrl: extractedData?.fileUrl || selectedData?.fileUrl || '',
      vendorId: data.supplierId,
      FiscalNumber: data.fiscalNumber,
      vatNumber: extractedData?.vatNumber || data.supplierId || '',
      matchedWithPO: extractedData?.matchedWithPO || selectedData?.matchedWithPO || false,
    }
    if (!selectedData) {
      postInvoiceMutation.mutate(result);
    } else {
      updateInvoiceMutation.mutate(result)
    }
  };

  const addRow = () => {
    setRows((prevRows) => prevRows + 1);
  };

  return (
    <section className="bg-basicWhite mt-[1px] w-full h-full max-h-[calc(100dvh-6rem)] overflow-y-auto">
      {!formData ? (
        <>
          <button
            ref={removeDataBtnRef}
            onClick={() => {
              reset({
                rarityInvoice: 'Once',
                currency: CURRENCIES[0].value,
                termsOfPayment: TERM_OF_PAYMENT[0].value,
                supplierName: '',
                invoiceNumber: '',
                poNumber: '',
                paymentTerms: '',
                amount: 0,
                invoiceDate: '',
                paymentTermDescription: '',
                comment: '',
                invoiceItems: [],
                fiscalNumber: "",
                supplierId: ""
              });
              setRows(1);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            className="hidden"
          ></button>
          <InvoiceHeader />
          <ImageUpload
            selectedImage={
              !selectedData?.fileUrl ? selectedImage : selectedData.fileUrl
            }
            handleFile={handleFile}
            fileInputRef={fileInputRef}
            handleChange={handleChange}
            setSelectedImage={setSelectedImage}
          />
          <div className="pt-5">
            <InvoiceFormContent
              register={register}
              watch={watch}
              errors={errors}
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              rows={rows}
              addRow={addRow}
              termOfPaymentData={TERM_OF_PAYMENT}
            />
          </div>
        </>
      ) : (
        <InvoiceRightPanelOverview />
      )}
    </section>
  );
};

export default InvoiceRightPanelForm;
