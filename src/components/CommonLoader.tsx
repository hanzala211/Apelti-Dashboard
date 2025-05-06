import { COLORS } from "@constants";
import { SyncLoader } from "react-spinners";

interface CommonLoaderProps {
  color?: string;
  size?: number;
}

export const CommonLoader: React.FC<CommonLoaderProps> = ({
  color = COLORS.primaryColor,
  size = 16,
}) => {
  return <SyncLoader color={color} size={size} />;
};

export default CommonLoader;
