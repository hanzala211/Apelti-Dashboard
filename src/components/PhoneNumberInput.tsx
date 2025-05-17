import PhoneInput from "react-phone-input-2";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { ErrorMessage } from "@components";
import React from "react";

interface PhoneNumberInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  defaultCountry?: string;
}

export const PhoneNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  defaultCountry = "pk",
}: PhoneNumberInputProps<T>) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label} className="text-neutralGray">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <React.Fragment>
            <PhoneInput
              country={defaultCountry}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              inputProps={{
                name: name,
                id: name,
                placeholder: "",
              }}
              autoFormat={true}
              countryCodeEditable={true}
              inputClass="!w-full rounded-md focus:outline-none focus:!border-blue-500 hover:!border-blue-500 transition-all duration-200 !bg-white !py-1 !pl-16 focus-within:!outline-none !border-basicBlack !border-[1px] !text-[15px] !font-medium"
              buttonClass="bg-transparent border-none outline-none focus:outline-none rounded-md focus:outline-none focus:!border-blue-500 hover:!border-blue-500 transition-all duration-200 !bg-white !py-1 !px-2 focus-within:outline-none border-basicBlack border-[1px]"
              specialLabel=""
            />
            <ErrorMessage error={error?.message} />
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default PhoneNumberInput;
