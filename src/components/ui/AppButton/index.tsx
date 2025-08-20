import clsx from "clsx";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "delete" | "edit";
}

export const AppButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const variantStyles = {
    primary:
      "bg-[#D90506] text-white hover:bg-[#CC0304] font-medium px-4 py-2  bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white",
    delete:
      "text-red-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700",
    edit: "text-blue-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700",
  };

  return (
    <button
      {...props}
      className={clsx(
        variantStyles[variant],
        className,
        "rounded-lg w-fit "
      )}
    >
      {children}
    </button>
  );
};
