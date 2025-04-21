import { Button, ErrorMessage } from '@components';

interface ActionButtonsProps {
  addColumn: () => void;
  removeLastColumn: () => void;
  handleSave: () => void;
  columnsCount: number;
  isFormValid: boolean;
  showError: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  addColumn,
  removeLastColumn,
  handleSave,
  columnsCount,
  isFormValid,
  showError,
}) => {
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
          className="!bg-permanentGreen cursor-pointer hover:!bg-permanentGreen/80 !rounded-md !px-4 w-full sm:w-auto"
          disabled={!isFormValid}
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