import { formatDate, handleFileChange, toast } from '@helpers';
import { invoiceServices } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Invoice, InvoiceContextTypes } from '@types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const InvoiceContext = createContext<InvoiceContextTypes | undefined>(
  undefined
);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [isInvoiceModelOpen, setIsInvoiceModelOpen] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<Invoice | null>(null);
  const [selectedData, setSelectedData] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState<Invoice | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formInputRef = useRef<HTMLInputElement>(null);
  const removeDataBtnRef = useRef<HTMLButtonElement>(null);
  const draftBtnRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const extractDataMutation = useMutation({
    mutationFn: async () => {
      const result = await extractData();
      return result || null;
    },
    onSuccess: (data) => {
      if (data) {
        setExtractedData(data);
      }
    },
  });

  const postInvoiceMutation = useMutation({
    mutationFn: (data: unknown) => postInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      setExtractedData(null);
    },
  });
  const updateInvoiceMutation = useMutation({
    mutationFn: (data: unknown) => updateInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      setExtractedData(null);
    },
  });
  const postDraftInvoiceMutation = useMutation({
    mutationFn: (data: unknown) => postDraftInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      handleBtnClick();
    },
  });
  const deleteInvoiceMutation = useMutation({
    mutationFn: (invoiceId: string) => deleteInvoice(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      setIsInvoiceModelOpen(false);
      handleBtnClick();
    },
  });

  useEffect(() => {
    if (selectedImage?.value) {
      extractDataMutation.mutate();
    }
  }, [selectedImage?.value]);

  const handleFile = () => {
    fileInputRef.current?.click();
  };

  const handleFormClick = () => {
    formInputRef.current?.click();
  };

  const handleDraftBtnClick = () => {
    draftBtnRef.current?.click();
  };

  const handleBtnClick = () => {
    setIsInvoiceModelOpen(false);
    setTimeout(() => {
      extractDataMutation.reset();
      setFormData(null);
      setSelectedImage(null);
      setExtractedData(null);
      setSelectedData(null);
    }, 500);
    removeDataBtnRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const foundValue = handleFileChange(event);
    if (foundValue !== undefined) setSelectedImage(foundValue);
  };

  const extractData = async () => {
    try {
      if (!selectedImage?.value) return;
      const formData = new FormData();

      const response = await fetch(selectedImage.value);
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      const fileName = selectedImage?.label || 'uploaded_file';
      formData.append('file', blob, fileName);
      const extractedData = await invoiceServices.extractData(formData);
      console.log('Extracted Data:', extractedData);
      if (!extractedData.data.data.matchInfo.match) {
        toast.error(
          'Missing PO Dataset',
          extractedData.data.data.matchInfo.reason
        );
      }
      return extractedData.data.data;
    } catch (error) {
      console.error('Error extracting data:', error);
      toast.error(
        'Failed to extract data',
        'There was a problem processing the selected image. Please try again.'
      );
      throw error;
    }
  };

  const getInvoices = async () => {
    try {
      const response = await invoiceServices.getInvoices();
      console.log(response);
      if (response.status === 200) {
        return response.data.data;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updateInvoice = async (data: unknown) => {
    try {
      const invoiceId = selectedData?._id || formData?._id || '';
      const response = await invoiceServices.updateInvoice(invoiceId, data);
      console.log(response);
      setFormData({
        supplierName: response.data.data.supplierName,
        invoiceNumber: response.data.data.invoiceNumber,
        poNumber: response.data.data.poNumber,
        termsOfPayment: response.data.data.termsOfPayment,
        invoiceDate: formatDate(response.data.data.invoiceDate),
        paymentTerms: formatDate(response.data.data.paymentTerms),
        amount: response.data.data.amount,
        paymentTermDescription: response.data.data.paymentTermDescription,
        currency: response.data.data.currency,
        rarityInvoice: response.data.data.rarityInvoice,
        comment: response.data.data.comment,
        fileUrl: response.data.data.fileUrl || '',
        fileName: response.data.data.fileName || '',
        vatNumber: response.data.data?.vatNumber,
        vendorId: response.data.data.vendorId || response.data.data?.vatNumber,
        items: response.data.data?.items || [],
        _id: response.data.data._id,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const postInvoice = async (data: unknown) => {
    try {
      const response = await invoiceServices.postInvoice(data);
      console.log(response);
      if (response.status === 200) {
        setFormData({
          supplierName: response.data.data.supplierName,
          invoiceNumber: response.data.data.invoiceNumber,
          poNumber: response.data.data.poNumber,
          termsOfPayment: response.data.data.termsOfPayment,
          invoiceDate: formatDate(response.data.data.invoiceDate),
          paymentTerms: formatDate(response.data.data.paymentTerms),
          amount: response.data.data.amount,
          paymentTermDescription: response.data.data.paymentTermDescription,
          currency: response.data.data.currency,
          rarityInvoice: response.data.data.rarityInvoice,
          comment: response.data.data.comment,
          fileUrl: response.data.data.fileUrl || '',
          fileName: response.data.data.fileName || '',
          vatNumber: response.data.data?.vatNumber,
          vendorId:
            response.data.data.vendorId || response.data.data?.vatNumber,
          items: response.data.data?.items || [],
          _id: response.data.data._id,
        });
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
      toast.error(
        'Error',
        typeof error === 'object' ? (error as Error).message : String(error)
      );
    }
  };

  const postDraftInvoice = async (data: unknown) => {
    try {
      const response = await invoiceServices.postDraftInvoice(data);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(
        'Error',
        typeof error === 'object' ? (error as Error).message : String(error)
      );
    }
  };

  const deleteInvoice = async (invoiceId: string) => {
    try {
      const response = await invoiceServices.deleteInvoice(invoiceId);
      if (response.status === 200) {
        toast.success(
          'Operation Successful',
          'Invoice has been successfully deleted.'
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadInvoices = async () => {
    try {
      const response = await invoiceServices.downloadCompanyInvoices();

      // Create a blob URL directly from the response data
      const url = window.URL.createObjectURL(response.data);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'company-invoices.xlsx'; // Set the file name

      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);

      toast.success("Download Started Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Download", "Error Occurred");
    }
  }

  return (
    <InvoiceContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        handleFile,
        handleChange,
        fileInputRef,
        isInvoiceModelOpen,
        setIsInvoiceModelOpen,
        extractDataMutation,
        extractedData,
        getInvoices,
        updateInvoice,
        handleFormClick,
        formInputRef,
        formData,
        setFormData,
        setExtractedData,
        handleBtnClick,
        removeDataBtnRef,
        postInvoice,
        selectedInvoice,
        setSelectedInvoice,
        selectedData,
        setSelectedData,
        postInvoiceMutation,
        updateInvoiceMutation,
        deleteInvoiceMutation,
        draftBtnRef,
        handleDraftBtnClick,
        postDraftInvoiceMutation,
        downloadInvoices
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextTypes => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('use useInvoice inside Invoice Provider');
  }
  return context;
};
