interface ButtonProps {
  btnText: string;
  handleClick?: () => void;
  className?: string;
  isLoading?: boolean,
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ btnText, handleClick, className, isLoading, disabled = false }) => {
  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`${className} ${isLoading ? "bg-blue-900 cursor-not-allowed" : "hover:bg-opacity-70"} bg-primaryColor md:text-[16px] transition-all duration-200 text-basicWhite p-2 rounded-full text-[14px]`}
    >
      {btnText}
    </button>
  );
};

export default Button;
