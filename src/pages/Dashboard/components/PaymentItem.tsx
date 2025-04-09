interface PaymentItemProps {
  title: string;
  mainAmount: string;
  subAmount: string;
  status: string;
}

export const PaymentItem: React.FC<PaymentItemProps> = ({
  title,
  mainAmount,
  subAmount,
  status,
}) => {
  return (
    <div className="flex gap-2 flex-col">
      <p className="text-sm text-gray-600 font-medium">{title}</p>

      <h2 className={`text-2xl font-semibold text-basicBlack mt-1`}>
        {mainAmount}
      </h2>

      <div className="text-sm text-gray-500 mt-1">
        <p>{subAmount}</p>
        <p>{status}</p>
      </div>
    </div>
  );
};
