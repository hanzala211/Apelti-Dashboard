import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "@types";

interface TeamContextTypes {
  editingUser: IUser | null;
  setEditingUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const TeamContext = createContext<TeamContextTypes | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <TeamContext.Provider
      value={{
        editingUser,
        setEditingUser,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = (): TeamContextTypes => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("use useTeam inside Team Provider");
  }
  return context;
};
