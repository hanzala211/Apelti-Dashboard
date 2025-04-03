import { useInvoice } from '@context';
import React from 'react';

export const InvoiceHeader: React.FC = () => {
  const { selectedData, extractDataMutation } = useInvoice();

  const message = extractDataMutation.isPending
    ? 'Loading Invoice'
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
