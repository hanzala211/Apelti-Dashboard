import { Button, DraggableModal, PageHeading, Table } from "@components";
import {
  ACTIONS,
  INVOICE_AREAS,
  INVOICE_FIELD_OPTIONS_RULES,
  INVOICE_KEYWORDS,
} from "@constants";
import { InvoiceRules, invoiceRulesSchema, InvoiceRulesSchema } from "@types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import InvoiceRulesModelForm from "./components/InvoiceRulesModelForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetting } from "@context";
import { useQuery } from "@tanstack/react-query";

export const InvoiceRulesPage: React.FC = () => {
  const {
    postInvoiceRulesMutation,
    getInvoiceRules,
    updateInvoiceRulesMutation,
    deleteInvoiceRulesMutation,
  } = useSetting();
  const [selectedRules, setSelectedRules] = useState<InvoiceRules[]>([]);
  const [isModelFormOpen, setIsModelFormOpen] = useState<boolean>(false);
  const [invoiceRulesData, setInvoiceRulesData] = useState<InvoiceRules[]>([]);
  const rulesSubmitRef = useRef<HTMLInputElement>(null);

  const { data: invoiceRules, isLoading: isInvoiceRulesLoading } = useQuery({
    queryKey: ["invoiceRules"],
    queryFn: getInvoiceRules,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
  } = useForm<InvoiceRulesSchema>({
    resolver: zodResolver(invoiceRulesSchema),
    defaultValues: {
      invoiceArea: INVOICE_AREAS[0].value,
      field: INVOICE_FIELD_OPTIONS_RULES[0].value,
      keyWord: INVOICE_KEYWORDS[0].value,
      action: ACTIONS[0].value,
    },
  });

  useEffect(() => {
    if (invoiceRules) {
      const mappedData = invoiceRules.map((rule) => {
        const fieldLabel = INVOICE_FIELD_OPTIONS_RULES.find(
          (f) => f.value === rule.field
        )?.label;
        const keywordLabel = INVOICE_KEYWORDS.find(
          (k) => k.value === rule.keyword
        )?.label;
        const actionLabel = ACTIONS.find((l) => l.value === rule.action)?.label;
        const invoiceAreaLabel = INVOICE_AREAS.find(
          (l) => l.value === rule.invoiceArea
        )?.label;
        return {
          ...rule,
          field: fieldLabel || rule.field,
          keyword: keywordLabel || rule.keyword,
          action: actionLabel || rule.action,
          invoiceArea: invoiceAreaLabel || rule.invoiceArea,
        };
      });
      setInvoiceRulesData(mappedData);
    }
  }, [invoiceRules]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: InvoiceRules
  ) => {
    setSelectedRules((prev) =>
      e.target.checked
        ? prev.some((inv) => inv._id === item._id)
          ? prev
          : [...prev, item]
        : prev.filter((inv) => inv._id !== item._id)
    );
  };

  const handleSelectAll = () => {
    if (invoiceRules) setSelectedRules(invoiceRulesData);
  };

  const handleUnselectAll = () => {
    setSelectedRules([]);
  };

  const handleOK = () => {
    rulesSubmitRef.current?.click();
    if (rulesSubmitRef.current) {
      rulesSubmitRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (selectedRules.length === 0) return;
    await Promise.all(
      selectedRules.map(async (item) => {
        deleteInvoiceRulesMutation.mutate(item._id || "");
      })
    );
    setSelectedRules([]);
  };

  const onSubmit: SubmitHandler<InvoiceRulesSchema> = (e) => {
    console.log(e);
    const postData = {
      keyword: e.keyWord,
      invoiceArea: e.invoiceArea,
      field: e.field,
      action: e.action,
      value: e.value,
    };
    postInvoiceRulesMutation.mutate(postData);
    reset();
    setIsModelFormOpen(false);
  };

  const handleActivate = async () => {
    if (selectedRules.length === 0) return;
    await Promise.all(
      selectedRules.map(async (item) => {
        updateInvoiceRulesMutation.mutate({
          ruleId: item._id || "",
          data: {
            status: "Active",
          },
        });
      })
    );
    setSelectedRules([]);
  };

  const handleDeactivate = async () => {
    if (selectedRules.length === 0) return;
    await Promise.all(
      selectedRules.map(async (item) => {
        updateInvoiceRulesMutation.mutate({
          ruleId: item._id || "",
          data: {
            status: "Inactive",
          },
        });
      })
    );
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
    "keyword",
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
          field in the invoice form with the value you've defined.
        </p>
      </div>
      <div>
        <Table<InvoiceRules>
          tableContainerClassName="w-full h-[100dvh] max-h-[calc(100dvh-280px)] md:max-w-[calc(100dvw-250px)] max-w-[calc(100dvw)] overflow-auto"
          headings={headings}
          keys={keys}
          data={invoiceRulesData || []}
          multiSelect={true}
          selectedItems={selectedRules}
          onItemSelect={handleOnChange}
          isLoading={isInvoiceRulesLoading}
          skeletonRowCount={11}
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
          <Button
            btnText="Add"
            className="!rounded-lg"
            handleClick={() => setIsModelFormOpen(true)}
          />
          <Button
            handleClick={handleDelete}
            isLoading={deleteInvoiceRulesMutation.isPending}
            isLoadingClass={`${
              deleteInvoiceRulesMutation.isPending
                ? "!bg-red-900 !cursor-not-allowed"
                : "hover:bg-opacity-70"
            }`}
            btnText="Remove"
            className="!rounded-lg !bg-basicRed hover:!bg-red-400"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button
            isLoading={updateInvoiceRulesMutation.isPending}
            disabled={updateInvoiceRulesMutation.isPending}
            btnText="Activate"
            className="!rounded-lg"
            handleClick={handleActivate}
          />
          <Button
            isLoading={updateInvoiceRulesMutation.isPending}
            disabled={updateInvoiceRulesMutation.isPending}
            handleClick={handleDeactivate}
            btnText="Deactivate"
            isLoadingClass={`${
              updateInvoiceRulesMutation.isPending
                ? "!bg-red-900 !cursor-not-allowed"
                : "hover:bg-opacity-70"
            }`}
            className={`!rounded-lg !bg-basicRed hover:!bg-red-400`}
          />
        </div>
      </div>
      <DraggableModal
        okText="Add"
        heading="Define Invoice Rules"
        open={isModelFormOpen}
        modalItems={
          <InvoiceRulesModelForm
            handleSubmit={handleSubmit}
            register={register}
            watch={watch}
            errors={errors}
            control={control}
            setValue={setValue}
            rulesSubmitRef={rulesSubmitRef}
            onSubmit={onSubmit}
          />
        }
        afterCloseReset={true}
        setOpen={setIsModelFormOpen}
        handleOk={handleOK}
      />
    </div>
  );
};
