import clsx from "clsx";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "default";
}

export const AppButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-xl font-medium transition flex items-center justify-center";

  const variantStyles = {
    primary: "bg-[#D90506] text-white hover:bg-[#CC0304] font-medium",
    secondary: "bg-[#F2F2F3] hover:bg-[#EFEFEF] text-text1",
    default: "bg-white hover:bg-[#EFEFEF]",
  };

  return (
    <button
      {...props}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        className,
        "h-11 rounded-lg w-fit "
      )}
    >
      {children}
    </button>
  );
};
