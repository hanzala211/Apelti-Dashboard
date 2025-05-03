import { useInvoiceConfig } from '@hooks';
import PageHeader from './components/PageHeader';
import ExportFormatInput from './components/ExportFormatInput';
import ColumnList from './components/ColumnList';
import ActionButtons from './components/ActionButtons';
import { CommonLoader } from "@components"
import { COLORS } from '@constants';
import { Button, UncontrolledInput } from '@components';

export const InvoiceConfigurationPage: React.FC = () => {
  const invoice = useInvoiceConfig();

  const handleNewFormatClick = () => {
    if (!invoice.isAddingNewImport) {
      invoice.setIsAddingNewImport(true);
    } else {
      invoice.createInvoiceExportFormatMutation.mutate({
        exportFormateName: invoice.exportFormatName,
      });
    }
  };

  return (
    <div className="w-full h-[100dvh] max-h-[calc(100dvh-80px)] overflow-auto pb-4 lg:pb-0 px-4 md:px-20">
      <PageHeader />
      {!invoice.isLoading ? (
        <div className="grid xl:grid-cols-[1fr_2fr] grid-cols-1 gap-4 items-start">
          <div className="border-[2px] flex flex-col gap-4 border-basicSilver lg:max-h-[calc(100dvh-200px)] max-h-[calc(100dvh-350px)] overflow-auto rounded-lg p-4">
            {invoice.invoiceFormat?.map(
              (item: Record<string, string | string[]>, index: number) => (
                <div
                  onClickCapture={() => {
                    invoice.setSelectedFormat(item);
                    invoice.setFieldOrder(item.fieldOrder as string[]);
                  }}
                  key={index}
                  className={`border-[2px] p-2 rounded-md cursor-pointer hover:bg-colorMint hover:border-primaryColor hover:text-basicBlack font-medium hover:font-semibold transition-all duration-200 ${invoice.selectedFormat?._id === item._id
                    ? 'bg-colorMint border-primaryColor text-basicBlack font-semibold'
                    : ''
                    }`}
                >
                  {item.exportFormateName}
                </div>
              )
            )}
            {invoice.isAddingNewImport && (
              <UncontrolledInput
                type="text"
                name="newExport"
                placeholder="Export Format Name"
                value={invoice.exportFormatName}
                setValue={invoice.setExportFormatName}
              />
            )}
            {!invoice.createInvoiceExportFormatMutation.isPending ? (
              <Button
                btnText={
                  !invoice.isAddingNewImport
                    ? 'Create a New Export Format'
                    : 'Finish and Save'
                }
                handleClick={handleNewFormatClick}
              />
            ) : (
              <div className="flex items-center justify-center">
                <CommonLoader color={COLORS.primaryColor} />
              </div>
            )}
          </div>
          <div className="border-[2px] border-basicSilver h-full max-h-[calc(100dvh-350px)] lg:max-h-[calc(100dvh-200px)] overflow-auto p-4 rounded-lg">
            <ExportFormatInput
              value={invoice.exportFormat}
              onChange={invoice.setExportFormat}
            />
            <div>
              <ColumnList
                columns={invoice.columns}
                updateColumn={invoice.updateColumn}
                updateItemMapping={invoice.updateItemMapping}
                onDragEnd={invoice.onDragEnd}
              />

              <ActionButtons
                addColumn={invoice.addColumn}
                removeLastColumn={invoice.removeLastColumn}
                columnsCount={invoice.columns.length}
                showError={invoice.showError}
                validateFields={invoice.validateFields}
                transformColumnsForSaving={invoice.transformColumnsForSaving}
                setShowError={invoice.setShowError}
                updateExportFieldsFormatMutation={
                  invoice.updateExportFieldsFormatMutation
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20">
          <CommonLoader color={COLORS.primaryColor} />
        </div>
      )}
    </div>
  );
};

export default InvoiceConfigurationPage;
