import { useInvoice } from '@context';
import InvoiceModelHeader from './InvoiceModelHeader';
import { Invoice } from '@types';
import { ChangeEvent, ReactNode, useState } from 'react';
import { formatDate } from '@helpers';
import { Button, CheckInput } from '@components';
import { v4 as uuidv4 } from 'uuid';

export const MultipleInvoicesModal: React.FC = () => {
  const {
    isMultipleInvoicesModalOpen,
    setIsMultipleInvoicesModalOpen,
    multipleInvoicesExtractedData,
    setMultipleInvoicesExtractedData,
    setSelectedData,
    setIsInvoiceModelOpen,
    selectedMultipleImages,
    setIsAddingMultipleInvoices
  } = useInvoice();
  const [multipleSelectedInvoices, setMultipleSelectedInvoices] = useState<
    Invoice[]
  >([]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, item: Invoice) => {
    setMultipleSelectedInvoices((prev) =>
      e.target.checked
        ? prev.some((inv) => inv.invoiceNumber === item.invoiceNumber)
          ? prev
          : [...prev, item]
        : prev.filter((inv) => inv.invoiceNumber !== item.invoiceNumber)
    );
  };

  const handleSelectAll = () => {
    setMultipleSelectedInvoices(multipleInvoicesExtractedData);
  };

  const handleAdd = () => {
    setMultipleInvoicesExtractedData((prev) => [
      ...prev,
      { _id: uuidv4() } as Invoice,
    ]);
  };

  const handleRemove = () => {
    if (multipleSelectedInvoices.length === 0) return;

    setMultipleInvoicesExtractedData((prev) =>
      prev.filter(
        (item) =>
          !multipleSelectedInvoices.some(
            (selected) => item._id ? selected._id === item._id : selected.invoiceNumber === item.invoiceNumber
          )
      )
    );

    setMultipleSelectedInvoices([]);
  };

  const handleEdit = (item: Invoice, index: number) => {
    setIsInvoiceModelOpen(true);
    setSelectedData({
      ...item,
      fileName: selectedMultipleImages[index]
        ? selectedMultipleImages[index].label
        : '',
    });
    setIsMultipleInvoicesModalOpen(false);
    setTimeout(() => {
      setIsAddingMultipleInvoices(true);
    }, 400)
  };

  const headings = [
    'Invoice Number',
    'Supplier',
    'PO Number',
    'Invoice Date',
    'Payment Terms',
    'Amount (Including VAT)',
    'Amount (Excluding VAT)',
    'Currency',
    'Internal Partner Code',
    'Location',
    'VAT Number',
    'VAT Percentage',
    'Vendor ID',
    'JCI Number',
    'Comment',
    'Action',
  ];

  const keys: (keyof Invoice)[] = [
    'invoiceNumber',
    'supplierName',
    'poNumber',
    'invoiceDate',
    'paymentTerms',
    'amount',
    'amountWithOutVat',
    'currency',
    'internalPartnerCode',
    'location',
    'vatNumber',
    'vatPercentage',
    'vendorId',
    'jciNumber',
    'comment',
  ];

  return (
    <div
      className={`fixed inset-0 flex flex-col transition-opacity duration-300 z-50 ${isMultipleInvoicesModalOpen
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none'
        }`}
    >
      <InvoiceModelHeader
        setIsInvoiceModelOpen={setIsMultipleInvoicesModalOpen}
        isAddingMultipleInvoices={true}
      />
      <div className="w-full h-full mt-[1px] bg-basicWhite">
        <div className="overflow-auto w-[100dvw] max-w-[calc(100dvw-0rem)] h-[100dvh] max-h-[calc(100dvh-6.5rem)]">
          <table className="w-full text-center text-sm text-gray-700 table-auto border-separate border-spacing-x-[0px]">
            <thead className="sticky top-0 z-20 bg-paleGray border-silverGray border-b">
              <tr>
                <th className="px-6 py-4 font-medium text-[14px] text-slateGrey">
                  Select
                </th>
                {headings.map((heading, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 font-medium text-[14px] text-slateGrey"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {multipleInvoicesExtractedData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-silverGray last:border-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-[14px] border-[1px]">
                    <CheckInput
                      label={`select-${rowIndex}`}
                      checkValue={multipleSelectedInvoices.some((inv) =>
                        item._id
                          ? inv._id === item._id
                          : inv.invoiceNumber === item.invoiceNumber
                      )}
                      handleOnChange={(e) => handleOnChange(e, item)}
                    />
                  </td>
                  {keys.map((key, colIndex) => {
                    const isException =
                      (key === 'jciNumber' && item.isLocalInvoice) ||
                      (key === 'vendorId' && !item.isLocalInvoice);
                    const isEmpty = !item[key];
                    const hasError = isEmpty && !isException;
                    return (
                      <td
                        key={colIndex}
                        className={`px-6 py-4 text-[14px] border-t border-b ${hasError
                          ? 'border-l border-basicRed bg-red-100'
                          : 'border-l border-gray-200'
                          } border-r`}
                      >
                        {key === keys[3] || key === keys[4]
                          ? formatDate((item[key] as string) || '')
                          : (item[key] as ReactNode)}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 text-[14px] border-[1px]">
                    <Button
                      handleClick={() => handleEdit(item, rowIndex)}
                      btnText="Edit"
                      className="!bg-transparent !text-primaryColor !relative !z-[2000]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5 flex justify-evenly w-full">
            <Button
              btnText="Select All"
              handleClick={handleSelectAll}
              className="!rounded-md"
            />
            <div className="flex gap-5">
              <Button
                btnText="Remove"
                handleClick={handleRemove}
                className="!rounded-md !bg-basicRed hover:!bg-red-300"
              />
              <Button
                btnText="Add"
                handleClick={handleAdd}
                className="!rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleInvoicesModal;
