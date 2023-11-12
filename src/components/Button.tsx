import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-300 hover:bg-gray-400 text-gray-800";
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white";
    }
  };

  return (
    <button
      {...props}
      className={`py-2 px-4 rounded focus:outline-none ${getVariantStyles()}`}
    >
      {children}
    </button>
  );
};

export default Button;
