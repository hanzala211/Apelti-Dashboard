import { Button, PageHeading } from '@components';
import { useAuth, useInvoice } from '@context';
import { useInvoiceConfig } from '@hooks';
import { Skeleton } from 'antd';

export const ExportInvoicePage: React.FC = () => {
  const { userData, setUserData } = useAuth();
  const { downloadInvoices, isDownloading } = useInvoice();
  const invoice = useInvoiceConfig();

  const selectFormat = (item: Record<string, string | string[]>) => {
    if (
      userData?.exportFormatMethodId !== item?._id &&
      !invoice.selectExportFormatMutation.isPending
    ) {
      invoice.selectExportFormatMutation.mutate({ mappingId: item?._id });
      setUserData((prev) =>
        prev ? { ...prev, exportFormatMethodId: item?._id as string } : null
      );
    }
  };

  return (
    <div className="w-full h-[100dvh] max-h-[calc(100dvh-50px)] py-5 overflow-auto pb-4 lg:pb-0 px-4 md:px-20">
      <PageHeading label="Export Invoice" className="mb-5" />
      <div className="border-[2px] flex flex-col gap-4 border-basicSilver lg:max-h-[calc(100dvh-200px)] max-h-[calc(100dvh-180px)] overflow-auto rounded-lg p-4">
        <h3 className="m-0 text-[22px] font-semibold text-center">
          Select Export Format
        </h3>
        {invoice.isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-md border-[1px] p-2">
              <Skeleton.Button active size="default" block />
            </div>
          ))
          : invoice.invoiceFormat?.map(
            (item: Record<string, string | string[]>) => (
              <div
                onClick={() => selectFormat(item)}
                key={item?._id as string}
                className={`border-[2px] p-2 rounded-md cursor-pointer hover:bg-colorMint hover:border-primaryColor hover:text-basicBlack font-medium hover:font-semibold transition-all duration-200 ${userData?.exportFormatMethodId === item?._id
                  ? 'bg-colorMint border-primaryColor text-basicBlack font-semibold'
                  : ''
                  }`}
              >
                {item.exportFormateName}
              </div>
            )
          )}
        <Button
          btnText="Download Invoices"
          handleClick={downloadInvoices}
          disabled={invoice.selectExportFormatMutation.isPending || isDownloading}
          isLoading={invoice.selectExportFormatMutation.isPending || isDownloading}
        />
      </div>
    </div>
  );
};

export default ExportInvoicePage;
