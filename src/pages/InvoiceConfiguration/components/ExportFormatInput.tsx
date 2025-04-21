import { UncontrolledInput } from "@components";

interface ExportFormatInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ExportFormatInput: React.FC<ExportFormatInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full max-w-[50%]">
      <UncontrolledInput
        value={value}
        setValue={(value) => typeof value === 'string' && onChange(value)}
        placeholder="Export Format Name"
        name="exportFormat"
        type="text"
        className="w-fit"
      />
    </div>
  );
};

export default ExportFormatInput; 