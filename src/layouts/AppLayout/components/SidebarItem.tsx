import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import { SvgIcon } from '@components';

interface SidebarItemProps {
  label: string;
  icon: string | IconType;
  link: string;
  onClick?: () => void;
  isIconType?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  link,
  onClick,
  isIconType,
}) => {
  return (
    <NavLink to={link} onClick={onClick}>
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition group ${isActive ? 'bg-colorMint text-basicBlack' : 'text-gray-400 hover:bg-colorMint'
            }`}
        >
          {!isIconType ? (
            <SvgIcon
              src={typeof Icon === 'string' ? Icon : ''}
              size={20}
              className={
                isActive
                  ? 'text-primaryColor w-5 h-5'
                  : 'text-gray-400 group-hover:text-primaryColor w-5 h-5'
              }
              injectionOptions={{ fill: 'currentColor', stroke: 'none' }}
            />
          ) : (
            <Icon
              size={18}
              className={
                isActive
                  ? 'text-primaryColor'
                  : 'text-gray-400 group-hover:text-primaryColor'
              }
            />
          )}
          <span className="text-sm">{label}</span>
        </div>
      )}
    </NavLink>
  );
};

export default SidebarItem;
