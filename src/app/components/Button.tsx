import React from "react";

type ButtonProps = {
  label: string;
  type: "submit" | "button";
  onClick?: () => void;
  personWidth?: string;
  background?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  type,
  onClick,
  personWidth,
  background,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-blue ${background} !important w-full p-3 rounded-lg text-white hover:opacity-95 transition-all duration-200 ${personWidth}`}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
