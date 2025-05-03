import { ICONS, INVOICE_ITEMS_HEADER } from '@constants';
import { ReactSVG } from 'react-svg';
import { CommonLoader } from "@components"

type InvoiceItem = {
  lineItemNumber?: string;
  glAccount?: string;
  amount?: string | number;
  department?: string;
  quantity?: string | number;
  description?: string;
};

type InvoiceData = {
  _id?: string;
  supplierName?: string;
  currency?: string;
  amount?: string | number;
  invoiceNumber?: string;
  poNumber?: string;
  termsOfPayment?: string;
  invoiceDate?: string;
  paymentTerms?: string;
  comment?: string;
  items?: InvoiceItem[];
  fileUrl?: string;
};

type InvoiceOverviewProps = {
  data: InvoiceData;
  showControls?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  deleteButtonColor?: string;
};

export const InvoiceOverview: React.FC<InvoiceOverviewProps> = ({
  data,
  showControls = false,
  onEdit,
  onDelete,
  isDeleting = false,
  deleteButtonColor = 'text-primaryColor',
}) => {
  return (
    <div className="w-full h-full bg-temporaryGray">
      <div className="md:px-4 px-2 py-7 flex justify-between border-b-[1px] border-silverGray items-baseline">
        <div>
          <h1 className="font-semibold md:text-[20px] text-[16px]">
            {data?.supplierName}
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-center md:items-start">
          {showControls && (
            <div className="flex gap-5 items-baseline">
              <button
                onClick={onEdit}
                className="flex gap-2 items-center font-medium md:text-[18px] text-[15px] text-primaryColor"
              >
                <ReactSVG src={ICONS.edit_overview} />
                Edit
              </button>
              {isDeleting ? (
                <div>
                  <CommonLoader color={deleteButtonColor} size={10} />
                </div>
              ) : (
                <button
                  onClick={onDelete}
                  className={`flex gap-2 items-center font-medium md:text-[18px] text-[15px] text-primaryColor`}
                >
                  <ReactSVG src={ICONS.delete_overview} />
                  Delete
                </button>
              )}
            </div>
          )}
          <div className="flex gap-2 items-baseline">
            <h2 className="font-semibold md:text-[17px] text-[14px]">
              Amount of the Vendor
            </h2>
            <p className="font-medium">
              {data?.currency} {data?.amount}
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
              {data?.currency} {data?.amount}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Paid Amount</p>
            <h3 className="font-semibold md:text-[18px] text-[14px]">
              {data?.currency} 0
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
              {data?.currency} {data?.amount}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Invoice Number</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {data?.invoiceNumber} 0
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">PO no.</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {data?.poNumber}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Terms of Payment</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {data?.termsOfPayment}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Invoice Date</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {data?.invoiceDate}
            </h3>
          </div>
          <div>
            <p className="text-neutralGray text-[14px]">Payment Terms</p>
            <h3 className="font-semibold md:text-[18px] text-[15px]">
              {data?.paymentTerms}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-fit px-7">
          <h2 className="text-[18px] font-semibold relative before:absolute before:w-full before:left-0 before:h-1 before:bg-darkBlue before:-bottom-[9px]">
            Costs ({data?.amount} {data?.currency})
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
        {Array.isArray(data?.items) && data?.items?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 min-w-[600px] w-full border-b py-4 px-5 sm:px-2 gap-4 place-items-center"
          >
            <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
              {item?.lineItemNumber}
            </div>
            <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
              {item?.glAccount}
            </div>
            <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
              {item?.amount}
            </div>
            <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
              {item?.department}
            </div>
            <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
              {item?.quantity}
            </div>
            <div className="border-[1px] border-silverGray w-full p-3 rounded-md font-semibold">
              {item?.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceOverview; 