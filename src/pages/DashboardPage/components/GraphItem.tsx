import { Progress } from "antd";
import { SvgIcon } from "@components";

interface GraphItemProps {
  icon: string;
  value: string;
  label: string;
}

export const GraphItem: React.FC<GraphItemProps> = ({ icon, label, value }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="bg-primaryColor rounded-xl p-2 w-fit block">
          <SvgIcon
            className="text-white"
            src={icon}
            size={15}
            injectionOptions={{ fill: "currentColor", stroke: "none" }}
          />
        </span>
        <p className="m-0 text-neutralGray font-medium">{label}</p>
      </div>
      <div className="pt-1">
        <p className="font-semibold m-0 text-[18px]">{value}</p>
        <Progress percent={60} showInfo={false} size={[96, 4]} />
      </div>
    </div>
  );
};

export default GraphItem;
