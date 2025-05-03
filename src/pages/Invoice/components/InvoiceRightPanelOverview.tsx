import { COLORS, ICONS, INVOICE_ITEMS_HEADER } from '@constants';
import { useInvoice } from '@context';
import { SyncLoader } from 'react-spinners';
import { ReactSVG } from 'react-svg';

export const InvoiceRightPanelOverview: React.FC = () => {
  const { reviewData, setReviewData, setSelectedData, deleteInvoiceMutation } =
    useInvoice();

  const handleEdit = () => {
    setSelectedData(reviewData);
    setReviewData(null);
  };

  const handleDelete = () => {
    deleteInvoiceMutation.mutate(reviewData?._id || '');
  };

  return (
    <div className="w-full h-full bg-temporaryGray">
      <div className="md:px-4 px-2 py-7 flex justify-between border-b-[1px] border-silverGray items-baseline">
        <div>
          <h1 className="font-semibold md:text-[20px] text-[16px]">
            {reviewData?.supplierName}
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="flex gap-5 items-baseline">
            <button
              onClick={handleEdit}
              className="flex gap-2 items-center font-medium md:text-[18px] text-[15px] text-primaryColor"
            >
              <ReactSVG src={ICONS.edit_overview} />
              Edit
            </button>
            {deleteInvoiceMutation.isPending ? (
              <div>
                <SyncLoader color={COLORS.primaryColor} size={10} />
              </div>
            ) : (
              <button
                onClick={handleDelete}
                className="flex gap-2 items-center font-medium md:text-[18px] text-[15px] text-primaryColor"
              >
                <ReactSVG src={ICONS.delete_overview} />
                Delete
              </button>
            )}
          </div>
          <div className="flex gap-2 items-baseline">
            <h2 className="font-semibold md:text-[17px] text-[14px]">
              Amount of the Vendor
            </h2>
            <p className="font-medium">
              {reviewData?.currency} {reviewData?.amount}
            </p>
          </div>
        </div>
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
              {reviewData?.currency} {reviewData?.amount}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Paid Amount</p>
            <h3 className="font-semibold md:text-[18px] text-[14px]">
              {reviewData?.currency} 0
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
              {reviewData?.currency} {reviewData?.amount}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Invoice Number</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {reviewData?.invoiceNumber} 0
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">PO no.</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {reviewData?.poNumber}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Terms of Payment</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {reviewData?.termsOfPayment}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Invoice Date</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {reviewData?.invoiceDate}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Payment Terms</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {reviewData?.paymentTerms}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full h-52 mb-5 grid md:grid-cols-2 md:px-7 px-0  border-b-[1px] border-silverGray">
        <div className="md:border-r-2 border-b-2 md:border-b-0 border-silverGray py-4 md:pr-7 px-7 md:px-0">
          <h3 className="md:text-[20px] text-[16px] font-semibold">
            Approvers
          </h3>
        </div>
        <div className="md:pl-7 space-y-5 px-7 md:px-0 py-4">
          <h3 className="md:text-[20px] text-[16px] font-semibold">
            Notes For Invoice
          </h3>
          <p className="md:text-[18px] text-[14px] font-medium">
            {reviewData?.comment}
          </p>
        </div>
      </div>
      <div>
        <div className="w-fit px-7">
          <h2 className="text-[18px] font-semibold relative before:absolute before:w-full before:left-0 before:h-1 before:bg-darkBlue before:-bottom-[9px]">
            Costs ({reviewData?.amount} {reviewData?.currency})
          </h2>
        </div>
        <div className="w-full h-[1px] bg-black"></div>
      </div>
      <div className="w-full overflow-x-auto md:px-4 px-2 sm:px-0">
        <div className="grid grid-cols-6 min-w-[600px] w-full px-5 sm:px-2 gap-4 place-items-center border border-slateGrey">
          {INVOICE_ITEMS_HEADER.map((header) => (
            <h4 key={header} className="m-0 py-3 text-center font-medium">
              {header}
            </h4>
          ))}
        </div>
        {[...Array(reviewData?.items)].map((item, index) => (
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
    </div>
  );
};

export default InvoiceRightPanelOverview;
