import { PageHeading } from "@components";

export const InvoiceRulesPage: React.FC = () => {
  return (
    <div className="w-full h-[100dvh] max-h-[calc(100dvh-80px)] overflow-auto pb-4 lg:pb-0 px-4 md:px-20 py-5">
      <PageHeading label="Define Invoice Rules" />
      <p className="text-sm text-gray-500 my-2 max-w-3xl">
        Use this page to create custom invoice rules: specify a keyword and the
        invoice field it applies to. Whenever that keyword is detected in an
        invoice, the system will automatically populate the corresponding field
        in the invoice form with the value you’ve defined.
      </p>
    </div>
  );
};
