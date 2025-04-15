import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  draftInvoiceSchema,
  Invoice,
  invoiceForm,
  InvoiceFormSchema,
} from '@types';
import { zodResolver } from '@hookform/resolvers/zod';
import { convertDateToISO, formatDate } from '@helpers';
import { useInvoice } from '@context';
import InvoiceHeader from './InvoiceHeader';
import ImageUpload from './ImageUpload';
import InvoiceFormContent from './InvoiceFormContent';
import {
  COUNTRIES,
  CURRENCIES,
  DOCUMENT_TYPES,
  TERM_OF_PAYMENT,
  TRANSACTION_TYPES,
} from '@constants';
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
    updateInvoiceMutation,
    draftBtnRef,
    postDraftInvoiceMutation,
  } = useInvoice();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
    getValues,
    clearErrors,
    setError,
  } = useForm<InvoiceFormSchema>({
    resolver: zodResolver(invoiceForm),
    defaultValues: {
      rarityInvoice: 'Once',
      currency: CURRENCIES[0].value,
      termsOfPayment: TERM_OF_PAYMENT[0].value,
      transactionType: TRANSACTION_TYPES[0].value,
      documentType: DOCUMENT_TYPES[0].value,
      isLocalInvoice: false,
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
      setValue('countryCode', data.countryCode || COUNTRIES[0].value);
      setValue('supplierId', data.vendorId || '');
      setValue('paymentTermDescription', data.paymentTermDescription || '');
      setValue('comment', data.comment || '');
      setValue('amountWithOutVat', data.amountWithOutVat || 0);
      setValue('vatPercentage', data.vatPercentage || 0);
      setValue('internalPartnerCode', data.internalPartnerCode || '');
      setValue('location', data.location || '');
      setValue('jciNumber', data.jciNumber || '');
      setValue(
        'transactionType',
        data.transactionType || TRANSACTION_TYPES[0].value
      );
      setValue('documentType', data.documentType || DOCUMENT_TYPES[0].value);
      setValue('isLocalInvoice', data.isLocalInvoice || false);
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
            lineItemNumber: String(item.lineItemNumber) || '',
            quantity: Number(item.quantity) || 1,
            description: item.description || '',
            glAccount: item.glAccount || '',
            amount: item.amount || 0,
            department: item.department || '',
          }))
        );
        setRows(data.items.length);
      }
    }
  }, [extractedData, selectedData, setValue]);

  const handleDraftSubmit = () => {
    const data = getValues();

    const processedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) =>
        typeof value === 'string' && value.trim() === ''
          ? [key, undefined]
          : [key, value]
      )
    );

    const result = draftInvoiceSchema.safeParse(processedData);
    clearErrors();

    if (!result.success) {
      result.error.errors.forEach((err) => {
        const field = err.path.join('.') as keyof InvoiceFormSchema;
        setError(field, { type: 'manual', message: err.message });
      });
    } else {
      const postData = {
        supplierName: processedData.supplierName,
        invoiceNumber: processedData.invoiceNumber,
        poNumber: processedData.poNumber,
        termsOfPayment: processedData.termsOfPayment,
        invoiceDate:
          processedData.invoiceDate &&
          convertDateToISO(processedData.invoiceDate as string),
        paymentTerms:
          processedData.paymentTerms &&
          convertDateToISO(processedData.paymentTerms as string),
        amount: processedData.amount,
        paymentTermDescription: processedData.paymentTermDescription,
        currency: processedData.currency,
        rarityInvoice: processedData.rarityInvoice,
        items: processedData.invoiceItems,
        comment: processedData.comment,
        fileUrl: extractedData?.fileUrl || selectedData?.fileUrl || '',
        fileName: selectedImage?.label || '',
        vendorId: processedData.supplierId,
        internalPartnerCode: processedData.internalPartnerCode,
        amountWithOutVat: processedData.amountWithOutVat,
        vatPercentage: processedData.vatPercentage,
        location: processedData.location,
        jciNumber: processedData.jciNumber,
        isLocalInvoice: data.isLocalInvoice || false,
      };
      postDraftInvoiceMutation.mutate(postData);
    }
    console.log('Draft Values ===> ', processedData);
  };

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
      fileName: selectedImage?.label || '',
      vendorId: data.supplierId || '',
      vatNumber: extractedData?.vatNumber || data.supplierId || '',
      matchedWithPO:
        extractedData?.matchedWithPO || selectedData?.matchedWithPO || false,
      internalPartnerCode: data.internalPartnerCode,
      amountWithOutVat: data.amountWithOutVat,
      vatPercentage: data.vatPercentage,
      location: data.location,
      jciNumber: data.jciNumber || '',
      isLocalInvoice: data.isLocalInvoice || false,
    };
    if (!selectedData) {
      postInvoiceMutation.mutate(result);
    } else {
      console.log(result);
      updateInvoiceMutation.mutate(result);
    }
  };

  const addRow = () => {
    setRows((prevRows) => prevRows + 1);
  };

  return (
    <section className="bg-basicWhite mt-[1px] w-full h-full max-h-[calc(100dvh-6rem)] overflow-y-auto">
      <button
        type="button"
        className="hidden"
        ref={draftBtnRef}
        onClick={handleDraftSubmit}
      ></button>
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
                supplierId: '',
                jciNumber: '',
                location: '',
                internalPartnerCode: '',
                countryCode: COUNTRIES[0].value,
                amountWithOutVat: 0,
                vatPercentage: 0,
                isLocalInvoice: false,
                documentType: DOCUMENT_TYPES[0].value,
                transactionType: TRANSACTION_TYPES[0].value,
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
              setValue={setValue}
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
