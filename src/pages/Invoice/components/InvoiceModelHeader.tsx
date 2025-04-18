import { SvgIcon } from '@components';
import { COLORS, ICONS } from '@constants';
import { useInvoice } from '@context';
import { SyncLoader } from 'react-spinners';

export const InvoiceModelHeader: React.FC = () => {
  const {
    setIsInvoiceModelOpen,
    handleFormClick,
    setFormData,
    handleBtnClick,
    formData,
    postInvoiceMutation,
    selectedData,
    setSelectedData,
    updateInvoiceMutation,
    handleDraftBtnClick,
    postDraftInvoiceMutation
  } = useInvoice();

  const handleClose = () => {
    handleBtnClick();
    setIsInvoiceModelOpen(false);
  };

  return (
    <header className="h-[7rem] px-4 shadow-lg flex justify-between items-center w-full bg-basicWhite">
      <h1 className="md:text-[22px] m-0 text-[17px] font-bold">
        {selectedData ? 'Edit Invoice' : 'Add Invoice'}
      </h1>
      <div className="flex gap-4 items-center">
        <button
          className={`text-basicWhite md:text-[16px] text-[14px] bg-primaryColor px-7 hover:bg-opacity-70 transition-all border-primaryColor border-[1px] duration-200 py-1.5 rounded-full ${postInvoiceMutation.isPending && 'bg-blue-700 cursor-not-allowed'
            }`}
          disabled={postInvoiceMutation.isPending}
          onClick={() => {
            if (!formData) {
              handleFormClick();
            }
          }}
        >
          {updateInvoiceMutation.isPending || postInvoiceMutation.isPending ? (
            <div>
              <SyncLoader color={COLORS.temporaryGray} size={10} />
            </div>
          ) : formData ? (
            'Pay'
          ) : selectedData ? (
            'Edit'
          ) : (
            'Add'
          )}
        </button>
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
          ) : !formData ? 'Draft' : 'Edit'}
        </button>
        <button onClick={handleClose}>
          <SvgIcon src={ICONS.close} size={24} />
        </button>
      </div>
    </header>
  );
};

export default InvoiceModelHeader;
