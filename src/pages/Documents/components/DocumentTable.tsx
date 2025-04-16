import React, { useState } from 'react';
import { ICONS } from '@constants';
import { IDocument } from '@types';
import DocumentModel from './DocumentModel';
import { formatDate } from '@helpers';

export const DocumentTable: React.FC<{ searchData: IDocument[] | undefined, document: IDocument[] | undefined }> = ({
  searchData,
  document
}) => {
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDocumentClick = (document: IDocument) => {
    setSelectedDocument(document);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <table className="min-w-full sm:text-[16px] text-[11px] text-left">
        <thead className={`border-b sticky top-0 bg-mistGray`}>
          <tr>
            <th className="px-4 py-2 font-bold">Name</th>
            <th className="px-4 py-2 font-bold">Section</th>
            <th className="px-4 py-2 font-bold">Added</th>
          </tr>
        </thead>
        <tbody>
          {searchData && document && (searchData?.length !== 0 ? searchData : document).map(
            (item, index) => (
              <tr key={index} className="cursor-pointer" onClick={() => handleDocumentClick(item)}>
                <td className="px-4 py-2 flex gap-2 items-center">
                  <ICONS.documentSVG /> {item.fileName}
                </td>
                <td className="px-4 py-2">{item.documentType}</td>
                <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {selectedDocument && (
        <DocumentModel
          fileUrl={selectedDocument.fileUrl}
          visible={isModalVisible}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
