import { AuthService } from "@services";
import { AuthContextTypes, IMessage, IUser } from "@types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { socket } from "@helpers";
import { Socket } from "socket.io-client";

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [isMainLoading, setIsMainLoading] = useState<boolean>(true);
  const [socketClient, setSocketClient] = useState<Socket | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);

  const loadAuth = async () => {
    try {
      const response = await AuthService.me();
      if (response.status === 200) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
    } finally {
      setIsMainLoading(false);
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null && userData === null) {
      loadAuth();
      const newSocket = socket(token);
      newSocket.on("connect", () => {
        console.log("Connected", newSocket.id);
        setSocketClient(newSocket);
      });
      newSocket.on("receiveMessage", (data) => console.log(data));
    } else {
      setIsMainLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isRemember,
        setIsRemember,
        isMainLoading,
        setIsMainLoading,
        socketClient,
        loadAuth,
        selectedMessage,
        setSelectedMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextTypes => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use useAuth inside Auth Provider");
  }
  return context;
};
