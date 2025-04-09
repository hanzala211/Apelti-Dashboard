import { ResizableSlider } from '@components';
import { InvoiceLeftPanel } from './InvoiceLeftPanel';
import InvoiceModelHeader from './InvoiceModelHeader';
import { useInvoice } from '@context';
import InvoiceRightPanelForm from './InvoiceRightPanelForm';

export const InvoiceModel: React.FC = () => {
  const { isInvoiceModelOpen } = useInvoice();

  return (
    <div
      className={`fixed inset-0 flex flex-col transition-opacity duration-300 z-50 ${isInvoiceModelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <InvoiceModelHeader />
      <div className="w-full h-full">
        <ResizableSlider
          minLeftWidth={window.innerWidth > 1280 ? 650 : 300}
          minRightWidth={window.innerWidth > 1280 ? 500 : 400}
          Left={InvoiceLeftPanel}
          Right={<InvoiceRightPanelForm />}
          initialLeftWidth={window.innerWidth > 1280 ? 700 : 300}
        />
      </div>
    </div>
  );
};

export default InvoiceModel;
