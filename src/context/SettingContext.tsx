import { useAuth } from '@context';
import { settingServices } from '@services';
import { SettingContextTypes } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from '@helpers';

const SettingContext = createContext<SettingContextTypes | undefined>(
  undefined
);

export const SettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userData, setUserData } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const changePassword = async (data: unknown) => {
    try {
      setErrorMessage('');
      const response = await settingServices.changePassword(data);
      console.log(response);
      toast.success('Update Complete', 'Your password has been successfully updated.');
      return response;
    } catch (error) {
      console.log(error);
      setErrorMessage(
        typeof error === 'object' ? (error as Error)?.message : String(error)
      );
    }
  };

  const changeUserData = async (data: unknown) => {
    try {
      const response = await settingServices.changeUserData(
        data,
        userData?._id || ''
      );
      setUserData(response.data.data);
      console.log('Checking the update');
      toast.success('Update Complete', 'The data has been updated successfully.');
    } catch (error) {
      console.log(error);
      setErrorMessage(
        typeof error === 'object' ? (error as Error)?.message : String(error)
      );
    }
  };

  const changeInvoiceExportFormat = async (data: unknown) => {
    try {
      const response = await settingServices.changeInvoiceExportFormat(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getInvoiceFormatExport = async () => {
    try {
      const response = await settingServices.getInvoiceFormatExport();
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SettingContext.Provider
      value={{ changePassword, errorMessage, changeUserData, changeInvoiceExportFormat, getInvoiceFormatExport }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = (): SettingContextTypes => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error('use useSetting inside Setting Provider');
  }
  return context;
};
