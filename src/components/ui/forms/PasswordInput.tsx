import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
}

const PasswordInput = ({
  label,
  id,
  error,
  className = "",
  ...props
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-primary text-sm text-content-light font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          className={`w-full px-4 py-3 pr-11 rounded-lg border text-sm
            font-primary text-content placeholder:text-content-muted
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/10
            [&::-ms-reveal]:hidden [&::-ms-clear]:hidden
            [&::-webkit-credentials-auto-fill-button]:hidden
            ${
              error
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-primary"
            }
            ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2
            text-content-muted hover:text-primary transition-colors duration-200"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 font-primary">{error}</p>}
    </div>
  );
};

export default PasswordInput;
