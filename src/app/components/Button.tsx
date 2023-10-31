import React from "react";

type ButtonProps = {
  label: string;
  type: "submit" | "button";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary-blue w-full p-3 rounded-lg text-white hover:opacity-95 transition-all duration-200"
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
