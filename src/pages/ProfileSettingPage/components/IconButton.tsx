import React from 'react';
import { SvgIcon } from '@components';

export const IconButton: React.FC<{
  icon: string;
  label: string;
  className?: string;
}> = ({ icon, label, className }) => {
  return (
    <button
      className={`text-basicBlack ${className} font-semibold flex gap-2 items-center rounded-full shadow-md p-2`}
    >
      <SvgIcon
        src={icon}
        size={16}
        injectionOptions={{ fill: 'currentColor', stroke: 'none' }}
      />
      {label}
    </button>
  );
};

export default IconButton;
