import { Button, PageHeading, Table } from "@components";
import { DEFINE_RULES_DATA } from "@constants";
import { InvoiceRules } from "@types";
import { ChangeEvent, useState } from "react";

export const InvoiceRulesPage: React.FC = () => {
  const [selectedRules, setSelectedRules] = useState<InvoiceRules[]>([]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: InvoiceRules
  ) => {
    setSelectedRules((prev) =>
      e.target.checked
        ? prev.some((inv) => inv.value === item.value)
          ? prev
          : [...prev, item]
        : prev.filter((inv) => inv.value !== item.value)
    );
  };

  const handleSelectAll = () => {
    setSelectedRules(DEFINE_RULES_DATA);
  };

  const handleUnselectAll = () => {
    setSelectedRules([]);
  };

  const headings = [
    "Key Word",
    "Invoice Area",
    "Field",
    "Action",
    "Value",
    "Status",
  ];

  const keys: (keyof InvoiceRules)[] = [
    "keyWord",
    "invoiceArea",
    "field",
    "action",
    "value",
    "status",
  ];

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full pb-4 lg:pb-0 px-4 md:px-20 py-5">
        <PageHeading label="Define Invoice Rules" />
        <p className="text-sm text-gray-500 my-2 max-w-3xl">
          Use this page to create custom invoice rules: specify a keyword and
          the invoice field it applies to. Whenever that keyword is detected in
          an invoice, the system will automatically populate the corresponding
          field in the invoice form with the value you’ve defined.
        </p>
      </div>
      <div>
        <Table<InvoiceRules>
          tableContainerClassName="w-full h-[100dvh] max-h-[calc(100dvh-280px)] md:max-w-[calc(100dvw-250px)] max-w-[calc(100dvw)] overflow-auto"
          headings={headings}
          keys={keys}
          data={DEFINE_RULES_DATA}
          multiSelect={true}
          selectedItems={selectedRules}
          onItemSelect={handleOnChange}
        />
      </div>
      <div className="grid lg:grid-cols-3 border-t-[1px] border-silverGray grid-cols-1 pt-5 place-items-center gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Button
            btnText="Select All"
            className="!rounded-lg"
            handleClick={handleSelectAll}
          />
          <Button
            btnText="Unselect All"
            className="!rounded-lg !bg-basicRed hover:!bg-red-400"
            handleClick={handleUnselectAll}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button btnText="Add" className="!rounded-lg" />
          <Button
            btnText="Remove"
            className="!rounded-lg !bg-basicRed hover:!bg-red-400"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button btnText="Activate" className="!rounded-lg" />
          <Button
            btnText="Deactivate"
            className="!rounded-lg !bg-basicRed hover:!bg-red-400"
          />
        </div>
      </div>
    </div>
  );
};
