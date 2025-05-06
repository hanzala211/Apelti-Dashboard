import { ICONS } from '@constants';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SettingSidebarItemProps {
  isOpen?: boolean;
  data: {
    label: string;
    links: { link: string; value: string }[];
    isBorderBottom: boolean;
  };
}

export const SettingSidebarItem: React.FC<SettingSidebarItemProps> = ({
  isOpen = false,
  data,
}) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(
    data.links.some((item) => location.pathname === item.link) || isOpen
  );

  return (
    <div
      className={`px-5 pb-5 ${data.isBorderBottom ? 'border-b-[1px] border-silverGray' : ''
        }`}
    >
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex gap-2 items-center font-medium"
      >
        {data.label}{' '}
        <ICONS.arrowDown
          size={20}
          className={`${isDropdownOpen ? '-rotate-180' : ''
            } transition-all duration-200`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${isDropdownOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
      >
        <div className="overflow-hidden flex flex-col gap-2 px-4 pt-2">
          {data.links.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                `${ isActive ? 'text-basicBlack' : 'text-neutralGray'
                } transition-all duration-150 hover:text-basicBlack`
              }
            >
              {item.value}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingSidebarItem;
