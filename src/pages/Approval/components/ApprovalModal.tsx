import { DocumentNotFound, SvgIcon, InvoiceOverview } from '@components';
import { COLORS, ICONS } from '@constants';
import { useApproval } from '@context';
import { toast } from '@helpers';
import { useQueryClient } from '@tanstack/react-query';
import { GetApprovalTypes } from '@types';
import { CommonLoader } from "@components";
import { useChangeInvoiceStatusMutation } from '@api';

export const ApprovalModal: React.FC<{
  isModalOpen: boolean;
  handleClose: () => void;
}> = ({ isModalOpen, handleClose }) => {
  const { selectedApprovalInvoice, setSelectedApprovalInvoice } = useApproval();
  const queryClient = useQueryClient();
  const approvalInvoices = queryClient.getQueryData<GetApprovalTypes>([
    'approval-invoices',
  ]);
  const selectedInvoice =
    approvalInvoices?.invoices[selectedApprovalInvoice || 0];

  const changeStatusMutation = useChangeInvoiceStatusMutation();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['approval-invoices'] });
    queryClient.invalidateQueries({ queryKey: ['invoices'] });
    handleClose();
    setSelectedApprovalInvoice(null);
    toast.success(
      'Operation Successful',
      'The status of the invoice has been successfully changed.'
    );
  };

  const handleError = () => {
    handleClose();
    setSelectedApprovalInvoice(null);
    toast.error(
      'Error',
      'An error occurred while changing the status of the invoice.'
    );
  };

  const handleChangeStatus = (status: string) => {
    changeStatusMutation.mutate(
      {
        invoiceId: selectedInvoice?._id,
        data: { status }
      },
      {
        onSuccess: handleSuccess,
        onError: handleError
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 flex flex-col transition-opacity duration-300 z-50 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <header className="h-[7rem] px-4 shadow-lg flex justify-between items-center w-full bg-basicWhite">
        <h1 className="md:text-[22px] m-0 text-[17px] font-bold">
          Inspect Invoice
        </h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleChangeStatus('approved')}
            disabled={changeStatusMutation.isPending}
            className={`text-basicWhite md:text-[16px] text-[14px] bg-primaryColor px-7 hover:bg-opacity-70 transition-all border-primaryColor border-[1px] duration-200 py-1.5 rounded-full ${
              changeStatusMutation.isPending && 'bg-blue-700 cursor-not-allowed'
            }`}
          >
            {changeStatusMutation.isPending && changeStatusMutation.variables?.data.status === 'approved' ? (
              <div>
                <CommonLoader color={COLORS.temporaryGray} size={10} />
              </div>
            ) : (
              'Approve'
            )}
          </button>
          <button
            onClick={() => handleChangeStatus('rejected')}
            disabled={changeStatusMutation.isPending}
            className={`text-basicWhite md:text-[16px] text-[14px] bg-basicRed px-7 hover:bg-opacity-70 transition-all border-basicRed border-[1px] duration-200 py-1.5 rounded-full ${
              changeStatusMutation.isPending && 'bg-red-700 cursor-not-allowed'
            }`}
          >
            {changeStatusMutation.isPending && changeStatusMutation.variables?.data.status === 'rejected' ? (
              <div>
                <CommonLoader color={COLORS.temporaryGray} size={10} />
              </div>
            ) : (
              'Reject'
            )}
          </button>
          <button onClick={handleClose}>
            <SvgIcon src={ICONS.close} size={24} />
          </button>
        </div>
      </header>
      <div className="grid md:grid-cols-2 mt-[1px] bg-basicWhite h-full">
        <div className="border-r-[1px] border-silverGray md:block hidden">
          {/* Image */}
          {selectedInvoice?.fileUrl ? (
            <div className="w-full h-[89dvh] border-r-[2px]">
              <img
                src={selectedInvoice?.fileUrl}
                alt="Invoice Image"
                className="w-full object-contain h-full"
              />
            </div>
          ) : (
            <DocumentNotFound />
          )}
        </div>
        {/* Overview Data */}
        <div className="bg-temporaryGray overflow-auto h-[89dvh]">
          <InvoiceOverview data={selectedInvoice || {}} showControls={false} />
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
