import { useInvoice } from '@context';
import React from 'react';

export const InvoiceHeader: React.FC = () => {
  const { selectedData, extractDataMutation, extractedData } = useInvoice();

  const message = extractDataMutation.isPending
    ? 'Loading Invoice'
    : extractedData?.matchedWithPO
      ? 'The data has been successfully extracted from the PO dataset.'
      : extractDataMutation.error
        ? 'There was a problem processing the selected image. Please try again.'
        : extractDataMutation.isSuccess
          ? 'The Apelti AI has filled in the data from the invoice. Review and add the invoice.'
          : extractDataMutation.isError
            ? ''
            : selectedData
              ? 'Review and update your invoice details below'
              : 'Enter Invoice Data Manually';

  return (
    <div className="w-full border-b-[1px] py-14 px-7">
      <div className="w-full border-[1px] rounded-md border-basicBlack p-5 flex justify-center items-center">
        <h1
          className={`text-[22px] ${extractDataMutation.isPending || extractDataMutation.isSuccess
              ? 'text-primaryColor'
              : extractDataMutation.isError
                ? 'text-basicRed'
                : ''
            } m-0 text-center font-semibold`}
        >
          {message}
        </h1>
      </div>
    </div>
  );
};

export default InvoiceHeader;
