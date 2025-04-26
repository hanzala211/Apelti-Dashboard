import { Button, ErrorMessage } from '@components';
import { useMutation } from '@tanstack/react-query';

interface ActionButtonsProps {
  addColumn(): void;
  removeLastColumn(): void;
  columnsCount: number;
  showError: boolean;
  validateFields(): boolean;
  transformColumnsForSaving(): Record<string, unknown>;
  setShowError(flag: boolean): void;
  updateExportFieldsFormatMutation: ReturnType<typeof useMutation>;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  addColumn,
  removeLastColumn,
  columnsCount,
  showError,
  validateFields,
  transformColumnsForSaving,
  setShowError,
  updateExportFieldsFormatMutation,
}) => {

  const handleSave = () => {
    if (!validateFields()) {
      setShowError(true);
      return;
    }
    setShowError(false);

    const transformedData = transformColumnsForSaving();
    updateExportFieldsFormatMutation.mutate({ ...transformedData });
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          btnText="Add Column"
          handleClick={addColumn}
          className="!rounded-md !px-4 w-full sm:w-auto"
        />
        <Button
          btnText="Remove Column"
          handleClick={removeLastColumn}
          className="!bg-basicRed cursor-pointer hover:!bg-basicRed/80 !rounded-md !px-4 w-full sm:w-auto"
          disabled={columnsCount === 0}
        />
        <Button
          btnText="Save Export Format"
          handleClick={handleSave}
          className={`!bg-permanentGreen cursor-pointer hover:!bg-permanentGreen/80 !rounded-md !px-4 w-full sm:w-auto ${updateExportFieldsFormatMutation.isPending ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
          disabled={updateExportFieldsFormatMutation.isPending}
          isLoading={updateExportFieldsFormatMutation.isPending}
        />
      </div>
      <ErrorMessage
        error={
          showError
            ? 'Please complete all required fields including item mapping headers if selected.'
            : ''
        }
      />
    </div>
  );
};

export default ActionButtons;