import { documentServices } from '@services';
import { DocumentContextTypes } from '@types';
import { createContext, useContext } from 'react';

export const DocumentContext = createContext<DocumentContextTypes | undefined>(
  undefined
);

export const DocumentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getDocuments = async () => {
    try {
      const response = await documentServices.getDocuments();
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DocumentContext.Provider value={{ getDocuments }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = (): DocumentContextTypes => {
  const context = useContext(DocumentContext);
  if (!context)
    throw new Error('useDocument must be used within a DocumentProvider');
  return context;
};
