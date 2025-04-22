import { useInvoiceConfig } from '@hooks';
import PageHeader from './components/PageHeader';
import ExportFormatInput from './components/ExportFormatInput';
import ColumnList from './components/ColumnList';
import ActionButtons from './components/ActionButtons';
import { SyncLoader } from 'react-spinners';
import { COLORS } from '@constants';
import { Button, UncontrolledInput } from '@components';

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
    onDragEnd,
    isLoading: isFormatLoading,
    createInvoiceExportFormatMutation,
    isAddingNewImport,
    setIsAddingNewImport,
    exportFormatName,
    setExportFormatName,
    selectedFormat,
    setSelectedFormat,
    invoiceFormat,
  } = useInvoiceConfig();

  const handleNewFormatClick = () => {
    if (!isAddingNewImport) {
      setIsAddingNewImport(true);
    } else {
      createInvoiceExportFormatMutation.mutate({
        exportFormateName: exportFormatName,
      });
    }
  };

  return (
    <div className="w-full h-[100dvh] max-h-[calc(100dvh-50px)] overflow-auto pb-4 lg:pb-0 px-4 md:px-20">
      <PageHeader />
      {!isFormatLoading ? (
        <div className="grid xl:grid-cols-[1fr_2fr] grid-cols-1 gap-4 items-start">
          <div className="border-[2px] flex flex-col gap-4 border-basicSilver lg:max-h-[calc(100dvh-200px)] max-h-[calc(100dvh-350px)] overflow-auto rounded-lg p-4">
            {invoiceFormat?.map((item, index) => (
              <div
                onClickCapture={() => {
                  setSelectedFormat(item);
                }}
                key={index}
                className={`border-[2px] p-2 rounded-md cursor-pointer hover:bg-colorMint hover:border-primaryColor hover:text-basicBlack font-medium hover:font-semibold transition-all duration-200 ${selectedFormat?._id === item._id
                  ? 'bg-colorMint border-primaryColor text-basicBlack font-semibold'
                  : ''
                  }`}
              >
                {item.exportFormateName}
              </div>
            ))}
            {isAddingNewImport && (
              <UncontrolledInput
                type="text"
                name="newExport"
                placeholder="Export Format Name"
                value={exportFormatName}
                setValue={setExportFormatName}
              />
            )}
            {!createInvoiceExportFormatMutation.isPending ? (
              <Button
                btnText={
                  !isAddingNewImport
                    ? 'Create a New Export Format'
                    : 'Finish and Save'
                }
                handleClick={handleNewFormatClick}
              />
            ) : (
              <div className="flex items-center justify-center">
                <SyncLoader color={COLORS.primaryColor} />
              </div>
            )}
          </div>
          <div className="border-[2px] border-basicSilver h-full max-h-[calc(100dvh-350px)] lg:max-h-[calc(100dvh-200px)] overflow-auto p-4 rounded-lg">
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
                columnsCount={columns.length}
                isFormValid={validateFields()}
                showError={showError}
                selectedFormat={selectedFormat}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20">
          <SyncLoader color={COLORS.primaryColor} />
        </div>
      )}
    </div>
  );
};

export default InvoiceConfigurationPage;
