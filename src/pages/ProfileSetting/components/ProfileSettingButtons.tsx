export const ProfileSettingButtons: React.FC<{ handleCancel?: () => void }> = ({
  handleCancel,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <button
        type="button"
        onClick={handleCancel}
        className="border-silverGray border-2 px-2 py-1 hover:text-silverGray hover:border-neutralGray transition-all duration-200 rounded-lg text-[13px]"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="border-primaryColor hover:bg-primaryColor border-2 px-2 py-1 hover:text-basicWhite bg-transparent transition-all duration-200 text-primaryColor rounded-lg text-[13px]"
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileSettingButtons;
