import React from 'react';
import { Skeleton } from 'antd';

export const MessageSkeleton: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex gap-2 rounded-md cursor-default flex-col border-[1px] p-3 w-full border-basicSilver">
        <div className="flex gap-2 items-center">
          <Skeleton.Avatar active shape="circle" size={52} />
          <div className='flex flex-col gap-1'>
            <Skeleton.Input active style={{ width: '30%', height: "1rem" }} />
            <Skeleton.Input active style={{ width: '30%', height: "1rem" }} />
          </div>
        </div>
        <div className="ml-5 space-y-2 mt-2">
          <Skeleton.Button active style={{ width: 60, height: "1rem" }} />
          <div className="flex items-center justify-between">
            <Skeleton.Input active style={{ width: '40%', height: "1rem" }} />
            <Skeleton.Button active style={{ width: 100 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton
