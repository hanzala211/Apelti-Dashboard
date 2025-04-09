import { ChartState } from '@types';
import ReactApexChart from 'react-apexcharts';

export const ApexChart: React.FC<{ state: ChartState }> = ({ state }) => {
  return (
    <div className="w-full">
      <div>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={400}
        />
      </div>
    </div>
  );
};

export default ApexChart;
