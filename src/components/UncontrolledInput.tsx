interface UncontrolledInputProps {
  type: string;
  name: string;
  className?: string;
  min?: number;
  placeholder?: string;
  step?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const UncontrolledInput = ({ type, name, className, min, placeholder, step = "any", value, setValue }: UncontrolledInputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      id={name}
      className={`${className} bg-white rounded-md w-full py-1.5 px-3 border border-basicBlack focus:shadow-blue-300 focus-within:shadow-sm focus:outline-none focus:border-darkBlue hover:border-darkBlue transition-all duration-200`}
      min={min}
      placeholder={placeholder}
      step={step}
    />
  )
}

export default UncontrolledInput;

