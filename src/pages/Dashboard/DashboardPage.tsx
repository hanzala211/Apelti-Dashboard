import { useAuth } from '@context';
import { ApexChart } from './components/ApexChart';
import { PaymentItem } from './components/PaymentItem';
import {
  APP_ACTIONS,
  CHART_DATA,
  ICONS,
  PERMISSIONS,
  ROUTES,
} from '@constants';
import { ChartState } from '@types';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ColumnChart from './components/ColumnChart';
import GraphItem from './components/GraphItem';
import { InvoiceWidget } from "@components"

export const DashboardPage: React.FC = () => {
  const { userData } = useAuth();
  const [state] = useState<ChartState>(CHART_DATA);
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  if (!userPermissions.includes(APP_ACTIONS.dashboardPage))
    return <Navigate to={ROUTES.not_available} />;

  return (
    <section className="md:p-9 md:pt-4 px-2 pt-20 md:max-h-[calc(100dvh-50px)] w-full flex gap-5 flex-col sm:max-w-[98%] max-w-full mx-auto overflow-y-auto h-[100dvh]">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:gap-16 gap-2">
        <InvoiceWidget label="Total Invoice" amount={182} />
        <InvoiceWidget label="Total Invoice" amount={182} />
        <InvoiceWidget label="Total Invoice" amount={182} />
        <InvoiceWidget label="Total Invoice" amount={182} />
      </div>

      <div
        className={`bg-basicWhite border-[1px] rounded-xl relative sm:px-4 -z-10`}
      >
        <h1 className="font-semibold z-0 w-fit text-[20px] absolute top-4 left-8">
          Invoices For Payment
        </h1>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          <div className="py-8 pt-12 sm:border-t-0 border-t sm:pt-16 px-5">
            <PaymentItem
              title="Late"
              mainAmount="KM 0"
              subAmount="KM 1200 (2)"
              status="Unpaid"
            />
          </div>
          <div className="py-8 px-5 sm:border-t-0 border-t sm:pt-16">
            <PaymentItem
              title="Late"
              mainAmount="KM 0"
              subAmount="KM 1200 (2)"
              status="Unpaid"
            />
          </div>
          <div className="py-8 px-5 sm:border-t-0 border-t sm:pt-16">
            <PaymentItem
              title="Late"
              mainAmount="KM 0"
              subAmount="KM 1200 (2)"
              status="Unpaid"
            />
          </div>
          <div className="lg:border-l sm:border-t-0 border-t h-full py-8 sm:pt-16 px-6">
            <PaymentItem
              title="Late"
              mainAmount="KM 0"
              subAmount="KM 1200 (2)"
              status="Unpaid"
            />
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
        <div className="bg-basicWhite space-y-4 border-[1px] p-5 w-full rounded-lg">
          <ColumnChart />
          <div>
            <h2 className="text-[22px] font-semibold">Active Users</h2>
            <p className="text-silverGray font-medium">
              <span className="text-primaryColor">(+23)</span> than last week
            </p>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-1">
            <GraphItem label='Users' value='32,983' icon={ICONS.wallet} />
            <GraphItem label='Clicks' value='2,42m' icon={ICONS.rocket} />
            <GraphItem label='Sales' value='32,983' icon={ICONS.cart} />
            <GraphItem label='Items' value='320' icon={ICONS.wrench} />
          </div>
        </div>
        <div className="bg-basicWhite border-[1px] p-5 w-full rounded-lg">
          <h1 className="font-semibold w-fit text-[20px]">Best Suppliers</h1>
          <ApexChart state={state} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
