import { useAuth } from '@context';
import { toast } from '@helpers';
import { teamServices } from '@services';
import { IUser, TeamContextTypes } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

const TeamContext = createContext<TeamContextTypes | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userData } = useAuth();
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const addMember = async (sendData: unknown) => {
    try {
      setErrorMessage('');
      const response = await teamServices.addMember(sendData);
      if (response.status === 200) {
        toast.success('Operation Successful', 'The new user has been successfully registered in the system.');
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      setErrorMessage(
        typeof error === 'object' ? (error as Error).message : String(error)
      );
    }
  };

  const getMembers = async () => {
    try {
      const response = await teamServices.getMember();
      if (response.status === 200) {
        return response.data.data.users.filter(
          (item: IUser, index: number, self: IUser[]) =>
            item._id !== userData?._id &&
            self.findIndex((u) => u._id === item._id) === index
        );
      }
      return null;
    } catch (error) {
      console.log(error);

    }
  };

  const deleteMember = async (userId: string) => {
    try {
      const response = await teamServices.deleteMember(userId);
      toast.success('Operation Successful', 'The user has been successfully deleted.');
      console.log(response);
      return null;
    } catch (error) {
      console.log(error);
      toast.error("Error", typeof error === 'object' ? (error as Error).message : String(error))
    }
  };

  const updateUser = async (userId: string, data: unknown) => {
    try {
      const response = await teamServices.updateMember(userId, data);
      if (response.status === 200) {
        toast.success('Operation Successful', 'The user has been successfully updated.');
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      setErrorMessage(
        typeof error === 'object' ? (error as Error).message : String(error)
      );
    } finally {
      setEditingUser(null);
    }
  };

  return (
    <TeamContext.Provider
      value={{
        addMember,
        deleteMember,
        editingUser,
        setEditingUser,
        updateUser,
        errorMessage,
        getMembers,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = (): TeamContextTypes => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('use useTeam inside Team Provider');
  }
  return context;
};
