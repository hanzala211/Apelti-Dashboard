import { LuFileScan } from 'react-icons/lu';

export const InvoiceWidget: React.FC<{ label: string; amount: number }> = ({
  label,
  amount,
}) => {
  return (
    <div
      className={`bg-basicWhite px-4 py-2 flex items-center justify-between rounded-2xl border-[1px]`}
    >
      <div className='space-y-1'>
        <h2 className={`text-silverGray font-semibold m-0`}>{label}</h2>
        <h1 className="font-bold text-[22px] m-0">{amount}</h1>
      </div>
      <div className={`bg-primaryColor rounded-3xl p-4`}>
        <LuFileScan color="white" size={24} />
      </div>
    </div>
  );
};

export default InvoiceWidget;
