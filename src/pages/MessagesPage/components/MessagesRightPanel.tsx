import { DocumentNotFound } from '@components';
import { useMessage } from '@context';

export const MessagesRightPanel: React.FC = () => {
  const { selectedMessage } = useMessage();
  return (
    <>
      {selectedMessage?.fileUrl ?
        <img
          src={selectedMessage?.fileUrl}
          alt="Preview"
          className="absolute inset-0 w-[90%] mx-auto h-full object-contain"
        />
        : <DocumentNotFound />}
    </>
  );
};
