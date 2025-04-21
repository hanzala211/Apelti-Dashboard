import { useInvoiceConfig } from "@hooks";
import PageHeader from "./components/PageHeader";
import ExportFormatInput from "./components/ExportFormatInput";
import ColumnList from "./components/ColumnList";
import ActionButtons from "./components/ActionButtons";
import { SyncLoader } from "react-spinners";
import { COLORS } from "@constants";

export const InvoiceConfigurationPage: React.FC = () => {
  const {
    exportFormat,
    setExportFormat,
    columns,
    showError,
    addColumn,
    removeLastColumn,
    updateColumn,
    updateItemMapping,
    validateFields,
    handleSave,
    onDragEnd,
    isLoading: isFormatLoading
  } = useInvoiceConfig();

  return (
    <div className="h-[100dvh] overflow-auto">
      <div className="w-full max-w-[1000px] pb-10 mx-auto px-4 md:px-6">
        <PageHeader />
        {!isFormatLoading ? (
          <>
            <ExportFormatInput
              value={exportFormat}
              onChange={setExportFormat}
            />
            <div>
              <ColumnList
                columns={columns}
                updateColumn={updateColumn}
                updateItemMapping={updateItemMapping}
                onDragEnd={onDragEnd}
              />

              <ActionButtons
                addColumn={addColumn}
                removeLastColumn={removeLastColumn}
                handleSave={handleSave}
                columnsCount={columns.length}
                isFormValid={validateFields()}
                showError={showError}
              />
            </div>
          </>) : <div className="flex justify-center mt-20"><SyncLoader color={COLORS.primaryColor} /></div>}
      </div>
    </div>
  );
};

export default InvoiceConfigurationPage;
