import { Button, PageHeading } from '@components';
import { useSetting } from '@context';
import { handleFileChange, toast } from '@helpers';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

export const ImportDataSetPage: React.FC = () => {
  const { uploadPoData } = useSetting();
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const uploadPoDataMutation = useMutation({
    mutationFn: (data: unknown) => uploadPoData(data),
    onSuccess: (data: { errors: { error: string }[] }) => {
      if (data.errors.length > 0) {
        toast.error('Upload Failed', data.errors[0].error);
      } else {
        toast.success(
          'Dataset Uploaded',
          'The Purchase Order dataset was uploaded successfully.'
        );
      }
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : String(error) || 'An unknown error occurred.';

      toast.error(
        'Upload Failed',
        `Could not upload Purchase Order dataset. ${message}`
      );
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const foundValue = handleFileChange(e, 'excel');
    if (foundValue instanceof File) {
      uploadPoDataMutation.mutate(foundValue);
    } else {
      toast.error(
        'Invalid File',
        'Please upload a valid Excel file (.xls or .xlsx).'
      );
    }
  };

  return (
    <div className="w-full h-[100dvh] max-h-[calc(100dvh-50px)] py-5 overflow-auto pb-4 lg:pb-0 px-4 md:px-20">
      <PageHeading label="Import Dataset" />
      <p className="text-sm text-gray-500 my-2 max-w-3xl">
        Use this page to import your data file. Click “Select File” to upload an
        Excel file from your computer.
      </p>
      <div className="m-3">
        <input
          ref={uploadFileRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={handleChange}
        />
        <Button
          btnText="Select File"
          className="!rounded-lg"
          handleClick={() => uploadFileRef.current?.click()}
        />
      </div>
    </div>
  );
};

export default ImportDataSetPage;
