import { DocumentNotFound, SvgIcon } from '@components';
import { COLORS, ICONS, INVOICE_ITEMS_HEADER } from '@constants';
import { useApproval } from '@context';
import { formatDate, toast } from '@helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetApprovalTypes } from '@types';
import { SyncLoader } from 'react-spinners';

export const ApprovalModal: React.FC<{
  isModalOpen: boolean;
  handleClose: () => void;
}> = ({ isModalOpen, handleClose }) => {
  const { selectedApprovalInvoice, changeStatus, setSelectedApprovalInvoice } =
    useApproval();
  const queryClient = useQueryClient();
  const approvalInvoices = queryClient.getQueryData<GetApprovalTypes>([
    'approvalInvoices',
  ]);
  const selectedInvoice =
    approvalInvoices?.invoices[selectedApprovalInvoice || 0];
  const changeStatusApprovedMutation = useMutation({
    mutationFn: (data: unknown) => changeStatus(data, selectedInvoice?._id),
    onSuccess: () => {
      handleSuccess();
    },
    onError: () => {
      handleError();
    },
  });
  const changeStatusRejectedMutation = useMutation({
    mutationFn: (data: unknown) => changeStatus(data, selectedInvoice?._id),
    onSuccess: () => {
      handleSuccess();
    },
    onError: () => {
      handleError();
    },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['approvalInvoices'] });
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
            onClick={() =>
              changeStatusApprovedMutation.mutate({ status: 'approved' })
            }
            disabled={
              changeStatusRejectedMutation.isPending ||
              changeStatusApprovedMutation.isPending
            }
            className={`text-basicWhite md:text-[16px] text-[14px] bg-primaryColor px-7 hover:bg-opacity-70 transition-all border-primaryColor border-[1px] duration-200 py-1.5 rounded-full ${changeStatusRejectedMutation.isPending ||
              (changeStatusApprovedMutation.isPending &&
                'bg-blue-700 cursor-not-allowed')
              }`}
          >
            {changeStatusApprovedMutation.isPending ? (
              <div>
                <SyncLoader color={COLORS.temporaryGray} size={10} />
              </div>
            ) : (
              'Approve'
            )}
          </button>
          <button
            onClick={() =>
              changeStatusRejectedMutation.mutate({ status: 'rejected' })
            }
            disabled={
              changeStatusRejectedMutation.isPending ||
              changeStatusApprovedMutation.isPending
            }
            className={`text-basicWhite md:text-[16px] text-[14px] bg-basicRed px-7 hover:bg-opacity-70 transition-all border-basicRed border-[1px] duration-200 py-1.5 rounded-full ${changeStatusRejectedMutation.isPending ||
              (changeStatusApprovedMutation.isPending &&
                'bg-red-700 cursor-not-allowed')
              }`}
          >
            {changeStatusRejectedMutation.isPending ? (
              <div>
                <SyncLoader color={COLORS.temporaryGray} size={10} />
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
          <div className="md:px-4 w-full px-2 py-7 flex justify-between border-b-[1px] border-silverGray items-baseline">
            <div>
              <h1 className="font-semibold m-0 md:text-[20px] text-[16px]">
                {selectedInvoice?.supplierName}
              </h1>
            </div>
            <div className="flex flex-col gap-2 items-center md:items-start">
              <div className="flex gap-2 items-baseline">
                <h2 className="font-semibold md:text-[17px] m-0 text-[14px]">
                  Amount of the Vendor
                </h2>
                <p className="font-medium">
                  {selectedInvoice?.currency} {selectedInvoice?.amount}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:hidden border-b-[1px] border-silverGray">
            {selectedInvoice?.fileUrl ? (
              <div className="w-full md:hidden flex justify-center border-r-[2px]">
                <img
                  src={selectedInvoice?.fileUrl}
                  alt="Invoice Image"
                  className="w-32 object-contain"
                />
              </div>
            ) : (
              <DocumentNotFound />
            )}
          </div>
          <div className="md:px-4 px-2 py-7 flex border-b-[1px] border-silverGray gap-4 flex-col">
            <div>
              <h1 className="font-semibold md:text-[20px] text-[16px]">
                Payment Details
              </h1>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-neutralGray text-[14px]">Amount To Pay</p>
                <h3 className="font-semibold md:text-[18px] text-[14px]">
                  {selectedInvoice?.currency} {selectedInvoice?.amount}
                </h3>
              </div>
              <div>
                <p className="text-neutralGray text-[14px]">Paid Amount</p>
                <h3 className="font-semibold md:text-[18px] text-[14px]">
                  {selectedInvoice?.currency} 0
                </h3>
              </div>
              <div>
                <p className="text-neutralGray text-[14px]">Past Payments</p>
                <h3 className="font-semibold md:text-[18px] text-[14px]">
                  No records
                </h3>
              </div>
            </div>
          </div>
          <div className="md:px-4 px-2 py-7 flex border-b-[1px] border-silverGray gap-4 flex-col">
            <div>
              <h1 className="font-semibold md:text-[20px] text-[16px]">
                Invoice Details
              </h1>
            </div>
            <div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2">
              <div>
                <p className="text-neutralGray text-[14px]">Invoice Amount</p>
                <h3 className="font-semibold md:text-[18px] text-[15px]">
                  {selectedInvoice?.currency} {selectedInvoice?.amount}
                </h3>
              </div>
              <div>
                <p className="text-neutralGray text-[14px]">Invoice Number</p>
                <h3 className="font-semibold md:text-[18px] text-[15px]">
                  {selectedInvoice?.invoiceNumber} 0
                </h3>
              </div>
              <div>
                <p className="text-neutralGray text-[14px]">PO no.</p>
                <h3 className="font-semibold md:text-[18px] text-[15px]">
                  {selectedInvoice?.poNumber}
                </h3>
              </div>
              <div>
                <p className="text-neutralGray text-[14px]">Terms of Payment</p>
                <h3 className="font-semibold md:text-[18px] text-[15px]">
                  {selectedInvoice?.termsOfPayment}
                </h3>
              </div>
              <div>
                <p className="text-neutralGray text-[14px]">Invoice Date</p>
                <h3 className="font-semibold md:text-[18px] text-[15px]">
                  {formatDate(selectedInvoice?.invoiceDate || '')}
                </h3>
              </div>
              <div>
                <p className="text-neutralGray text-[14px]">Payment Terms</p>
                <h3 className="font-semibold md:text-[18px] text-[15px]">
                  {formatDate(selectedInvoice?.paymentTerms || '')}
                </h3>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-fit px-7">
              <h2 className="text-[18px] font-semibold relative before:absolute before:w-full before:left-0 before:h-1 before:bg-darkBlue before:-bottom-[9px]">
                Costs ({selectedInvoice?.amount} {selectedInvoice?.currency})
              </h2>
            </div>
            <div className="w-full h-[1px] bg-black"></div>
          </div>
          <div className="w-full overflow-x-auto sm:px-0">
            <div className="grid grid-cols-6 min-w-[600px] w-full px-5 sm:px-2 gap-4 place-items-center border border-slateGrey">
              {INVOICE_ITEMS_HEADER.map(
                (header) => (
                  <h4 key={header} className="m-0 py-3 text-center font-medium">
                    {header}
                  </h4>
                )
              )}
            </div>
            {[...Array(selectedInvoice?.items)].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 min-w-[600px] w-full border-b py-4 px-5 sm:px-2 gap-4 place-items-center"
              >
                <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
                  {item?.[index]?.lineItemNumber}
                </div>
                <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
                  {item?.[index]?.glAccount}
                </div>
                <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
                  {item?.[index]?.amount}
                </div>
                <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
                  {item?.[index]?.department}
                </div>
                <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
                  {item?.[index]?.quantity}
                </div>
                <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
                  {item?.[index]?.description}
                </div>
              </div>
            ))}
          </div>
          <div className="md:pl-7 space-y-5 px-7 md:px-0 py-4 w-[98%]">
            <h3 className="md:text-[20px] text-[16px] font-semibold">
              Notes For Invoice
            </h3>
            <p className="md:text-[18px] p-4 border-[1px] border-silverGray text-[14px] font-medium">
              {selectedInvoice?.comment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
