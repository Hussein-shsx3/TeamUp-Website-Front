import React from "react";

interface SubmitButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const SubmitButton = ({
  label,
  onClick,
  disabled = false,
  className = "",
}: SubmitButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 bg-primary text-white text-sm font-medium font-primary
        rounded-lg hover:bg-primary-dark transition-colors duration-200
        shadow-[0_2px_12px_rgba(37,99,235,0.3)]
        hover:shadow-[0_4px_18px_rgba(37,99,235,0.4)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        ${className}`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
