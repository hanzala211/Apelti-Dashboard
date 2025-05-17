
export const AuthButton: React.FC<{ text: string, isAuthLoading: boolean }> = ({ text, isAuthLoading }) => {
  return (
    <button
      type="submit"
      disabled={isAuthLoading}
      className={`bg-basicBlack ${isAuthLoading
          ? 'bg-opacity-50 cursor-not-allowed'
          : 'hover:bg-opacity-80'
        } text-basicWhite rounded-full py-2 transition-all duration-200 `}
    >
      {text}
    </button>
  );
};
