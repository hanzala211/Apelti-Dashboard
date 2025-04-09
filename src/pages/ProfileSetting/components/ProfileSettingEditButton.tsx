import { ICONS } from '@constants';

export const ProfileSettingEditButton: React.FC<{
  handleClick?: () => void;
  size?: number;
}> = ({ handleClick, size }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex gap-2 items-center text-primaryColor bg-basicWhite p-2 rounded-full shadow-md shadow-silverGray`}
    >
      <ICONS.edit size={size} />
    </button>
  );
};

export default ProfileSettingEditButton;
