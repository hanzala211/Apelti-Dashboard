import { COLUMN_CHART } from '@constants';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ColumnChart: React.FC = () => {
  const options: ApexOptions = COLUMN_CHART.options;
  const series = COLUMN_CHART.series;

  return (
    <div className="w-full p-5 rounded-2xl bg-gradient-to-r from-columnGraphGradient to-columnGraphBg ">
      <Chart options={options} series={series} type="bar" height={220} />
    </div>
  );
};

export default ColumnChart;
