import { SvgIcon } from '@components';
import { COLORS, ICONS } from '@constants';
import { useInvoice } from '@context';
import { toast } from '@helpers';
import { SyncLoader } from 'react-spinners';

interface InvoiceModelHeaderProps {
  setIsInvoiceModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingMultipleInvoices?: boolean;
}

export const InvoiceModelHeader: React.FC<InvoiceModelHeaderProps> = ({
  setIsInvoiceModelOpen,
  isAddingMultipleInvoices = false,
}) => {
  const {
    handleFormClick,
    handleBtnClick,
    formData,
    postInvoiceMutation,
    selectedData,
    setSelectedData,
    updateInvoiceMutation,
    handleDraftBtnClick,
    postDraftInvoiceMutation,
    setIsMultipleInvoicesModalOpen,
    isAddingMultipleInvoices: isGoingBack,
    setIsAddingMultipleInvoices,
    isMultipleInvoicesModalOpen,
    multipleInvoicesExtractedData,
    postInvoiceWithoutFormDataMutation,
    setFormData,
  } = useInvoice();

  const handleClose = () => {
    handleBtnClick();
    setIsInvoiceModelOpen(false);
    if (isGoingBack) {
      setTimeout(() => {
        setIsMultipleInvoicesModalOpen(true);
      }, 200);
    }
    setIsAddingMultipleInvoices(false);
  };

  const handleClick = async () => {
    if (!formData && !isMultipleInvoicesModalOpen) {
      handleFormClick();
    } else if (isMultipleInvoicesModalOpen) {
      const hasError = multipleInvoicesExtractedData.some((item) => {
        const fieldsToCheck = Object.entries(item).filter(([key]) => {
          if (item.isLocalInvoice) {
            return key !== 'jciNumber';
          } else {
            return key !== 'vendorId';
          }
        });


        return fieldsToCheck.some(
          ([, value]) =>
            value === '' ||
            value === undefined ||
            value === null ||
            (Array.isArray(value) && value.length === 0)
        );
      });
      if (hasError) {
        toast.error('Couldn’t Upload Invoices', 'Some Fields Are Empty.');
        return;
      }
      await Promise.all(
        multipleInvoicesExtractedData.map((item) => {
          const invoice = { ...item };
          delete invoice._id;
          return postInvoiceWithoutFormDataMutation.mutate(invoice);
        })
      );
    }
  };

  return (
    <header className="h-[7rem] px-4 shadow-lg flex justify-between items-center w-full bg-basicWhite">
      <h1 className="md:text-[22px] m-0 text-[17px] font-bold">
        {selectedData
          ? 'Edit Invoice'
          : isAddingMultipleInvoices
            ? 'Add Invoices'
            : 'Add Invoice'}
      </h1>
      <div className="flex gap-4 items-center">
        <button
          className={`text-basicWhite md:text-[16px] text-[14px] bg-primaryColor px-7 hover:bg-opacity-70 transition-all border-primaryColor border-[1px] duration-200 py-1.5 rounded-full ${postInvoiceMutation.isPending && 'bg-blue-700 cursor-not-allowed'
            }`}
          disabled={postInvoiceMutation.isPending}
          onClick={handleClick}
        >
          {updateInvoiceMutation.isPending || postInvoiceMutation.isPending || postInvoiceWithoutFormDataMutation.isPending ? (
            <div>
              <SyncLoader color={COLORS.temporaryGray} size={10} />
            </div>
          ) : formData ? (
            'Pay'
          ) : selectedData ? (
            'Edit'
          ) : isAddingMultipleInvoices ? (
            'Upload'
          ) : (
            'Add'
          )}
        </button>
        {!isAddingMultipleInvoices && !isGoingBack && (
          <button
            onClick={() => {
              if (formData) {
                setSelectedData(formData);
                setFormData(null);
              } else {
                handleDraftBtnClick();
              }
            }}
            className="text-basicBlack md:text-[16px] text-[14px] bg-basicWhite hover:bg-gray-200 transition-all duration-200 border-basicBlack border-[1px] px-7 py-1.5 rounded-full"
          >
            {postDraftInvoiceMutation.isPending ? (
              <div>
                <SyncLoader color={COLORS.primaryColor} size={10} />
              </div>
            ) : !formData ? (
              'Draft'
            ) : (
              'Edit'
            )}
          </button>
        )}
        <button onClick={handleClose}>
          <SvgIcon src={ICONS.close} size={24} />
        </button>
      </div>
    </header>
  );
};

export default InvoiceModelHeader;
