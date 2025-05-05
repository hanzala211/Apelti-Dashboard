import { DatePickerField, Input, Select } from "@components";
import {
  ACTIONS,
  INVOICE_AREAS,
  INVOICE_FIELD_OPTIONS_RULES,
  INVOICE_ITEM_MAPPING_OPTIONS,
  INVOICE_KEYWORDS,
} from "@constants";
import { InvoiceRulesSchema } from "@types";
import { RefObject, useEffect } from "react";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from "react-hook-form";

interface InvoiceRulesModelFormProps {
  rulesSubmitRef: RefObject<HTMLInputElement | null>;
  handleSubmit: UseFormHandleSubmit<InvoiceRulesSchema>;
  register: UseFormRegister<InvoiceRulesSchema>;
  control: Control<InvoiceRulesSchema>;
  watch: UseFormWatch<InvoiceRulesSchema>;
  setValue: UseFormSetValue<InvoiceRulesSchema>;
  errors: FieldErrors<InvoiceRulesSchema>;
  onSubmit: SubmitHandler<InvoiceRulesSchema>;
}

export const InvoiceRulesModelForm: React.FC<InvoiceRulesModelFormProps> = ({
  rulesSubmitRef,
  handleSubmit,
  control,
  setValue,
  watch,
  register,
  errors,
  onSubmit,
}) => {
  const invoiceAreaValue = useWatch({
    control,
    name: "invoiceArea",
    defaultValue: INVOICE_AREAS[0].value,
  });

  useEffect(() => {
    if (invoiceAreaValue === "header") {
      setValue("field", INVOICE_FIELD_OPTIONS_RULES[0].value);
    } else {
      setValue("field", INVOICE_ITEM_MAPPING_OPTIONS[0].value);
    }
  }, [invoiceAreaValue, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 flex-col">
      <Select
        control={control}
        name="keyWord"
        data={INVOICE_KEYWORDS}
        label="Key Word"
      />
      <Select
        control={control}
        name="invoiceArea"
        data={INVOICE_AREAS}
        label="Invoice Area"
      />
      <Select
        control={control}
        name="field"
        label="Field"
        data={
          watch("invoiceArea") === "header"
            ? INVOICE_FIELD_OPTIONS_RULES
            : INVOICE_ITEM_MAPPING_OPTIONS
        }
      />
      <Select control={control} name="action" data={ACTIONS} label="Action" />
      {watch("field") === "invoiceDate" || watch("field") === "paymentTerms" ? (
        <div className="flex gap-2 flex-col">
          <label htmlFor="value" className="text-neutralGray">
            Value
          </label>
          <DatePickerField control={control} name="value" />
        </div>
      ) : (
        <Input
          type={
            watch("field") === "amount" ||
            watch("field") === "amountWithoutVat" ||
            watch("field") === "vatPercentage"
              ? "number"
              : "string"
          }
          register={register("value")}
          label="Value"
          error={errors["value"]?.message}
        />
      )}
      <input className="hidden" type="submit" ref={rulesSubmitRef} />
    </form>
  );
};

export default InvoiceRulesModelForm;
