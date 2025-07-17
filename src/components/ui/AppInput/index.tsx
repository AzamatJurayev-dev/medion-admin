import { useState } from "react";

interface CustomInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prefix?: React.ReactNode;
  error?: boolean;
  type?: string;
  className?: string;
}

const AppInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder,
  prefix,
  error,
  type = "text",
  className = "",
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex items-center rounded-lg px-3 h-[42px] text-base bg-white transition-all
        ${
          error
            ? "border border-red-500 bg-red-50"
            : focused
            ? "border border-[#c1c1c1] shadow-none"
            : "border border-gray-300"
        }
        ${className} 
      `}
    >
      {prefix && (
        <div className="mr-2 text-gray-500 flex items-center">{prefix}</div>
      )}
      <input
        type={type}
        className="flex-1 outline-none border-none bg-transparent placeholder:text-gray-400"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default AppInput;
