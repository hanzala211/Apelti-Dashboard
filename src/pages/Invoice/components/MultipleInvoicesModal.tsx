import { useInvoice } from "@context";
import InvoiceModelHeader from "./InvoiceModelHeader";
import { Invoice } from "@types";
import { ChangeEvent, useState } from "react";
import { Button, Table } from "@components";
import { v4 as uuidv4 } from "uuid";

export const MultipleInvoicesModal: React.FC = () => {
  const {
    isMultipleInvoicesModalOpen,
    setIsMultipleInvoicesModalOpen,
    multipleInvoicesExtractedData,
    setMultipleInvoicesExtractedData,
    setSelectedData,
    setIsInvoiceModelOpen,
    selectedMultipleImages,
    setIsAddingMultipleInvoices,
  } = useInvoice();
  const [multipleSelectedInvoices, setMultipleSelectedInvoices] = useState<
    Invoice[]
  >([]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, item: Invoice) => {
    setMultipleSelectedInvoices((prev) =>
      e.target.checked
        ? prev.some((inv) => inv._id === item._id)
          ? prev
          : [...prev, item]
        : prev.filter((inv) => inv._id !== item._id)
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
          !multipleSelectedInvoices.some((selected) =>
            item._id
              ? selected._id === item._id
              : selected.invoiceNumber === item.invoiceNumber
          )
      )
    );

    setMultipleSelectedInvoices([]);
  };

  const handleEdit = (item: Invoice, index: number) => {
    setSelectedData({
      ...item,
      fileName: selectedMultipleImages[index]
      ? selectedMultipleImages[index].label
      : "",
    });
    setIsMultipleInvoicesModalOpen(false);
    setTimeout(() => {
      setIsAddingMultipleInvoices(true);
      setIsInvoiceModelOpen(true);
    }, 400);
  };

  const validateCell = (item: Invoice, key: keyof Invoice): boolean => {
    if (key === "jciNumber" && item.isLocalInvoice) {
      return true;
    }
    if (key === "vendorId" && !item.isLocalInvoice) {
      return true;
    }
    return !!item[key];
  };

  const headings = [
    "Invoice Number",
    "Supplier",
    "PO Number",
    "Invoice Date",
    "Payment Terms",
    "Amount (Including VAT)",
    "Amount (Excluding VAT)",
    "Currency",
    "Internal Partner Code",
    "Location",
    "VAT Number",
    "VAT Percentage",
    "Vendor ID",
    "JCI Number",
    "Comment",
  ];

  const keys: (keyof Invoice)[] = [
    "invoiceNumber",
    "supplierName",
    "poNumber",
    "invoiceDate",
    "paymentTerms",
    "amount",
    "amountWithOutVat",
    "currency",
    "internalPartnerCode",
    "location",
    "vatNumber",
    "vatPercentage",
    "vendorId",
    "jciNumber",
    "comment",
  ];

  const dateFields: Array<keyof Invoice> = ["invoiceDate", "paymentTerms"];

  return (
    <div
      className={`fixed inset-0 flex flex-col transition-opacity duration-300 z-50 ${
        isMultipleInvoicesModalOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <InvoiceModelHeader
        setIsInvoiceModelOpen={setIsMultipleInvoicesModalOpen}
        isAddingMultipleInvoices={true}
      />
      <div className="w-full h-full mt-[1px] bg-basicWhite">
        <div className="overflow-auto w-[100dvw] max-w-[calc(100dvw-0rem)] h-[100dvh] max-h-[calc(100dvh-10rem)]">
          <Table
            headings={headings}
            data={multipleInvoicesExtractedData}
            keys={keys}
            multiSelect={true}
            selectedItems={multipleSelectedInvoices}
            onItemSelect={handleOnChange}
            actionLabel="Edit"
            onActionClick={handleEdit}
            validateCell={validateCell}
            dateFields={dateFields}
            tableContainerClassName="w-full"
            cellClassName="px-6 py-4 text-[14px] border-t border-b border-l border-r border-gray-200"
            tableClassName="text-center"
          />
        </div>
        <div className="pt-3 border-t-[1px] flex justify-around w-full">
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
  );
};

export default MultipleInvoicesModal;
