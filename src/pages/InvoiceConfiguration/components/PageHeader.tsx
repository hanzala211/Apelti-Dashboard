import { PageHeading } from "@components";

export const PageHeader: React.FC = () => {
  return (
    <div className="my-5">
      <PageHeading label="Invoice Export Configuration" />
      <p className="text-sm text-gray-500 my-2 max-w-3xl">
        Configure how your invoice data should be exported. Add fields by
        clicking "Add Column", then select the field type and provide a
        header. For item mapping, you'll need to specify headers for each
        item detail field.
      </p>
    </div>
  );
};

export default PageHeader; 