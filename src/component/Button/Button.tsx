import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={`button ${variant} ${size} ${fullWidth ? "full-width" : ""} ${
          loading ? "loading" : ""
        } ${className}`}
        disabled={isDisabled}
        {...props}
      >
        {loading && <span className="button-spinner">⏳</span>}
        {!loading && leftIcon && <span className="button-icon left">{leftIcon}</span>}
        <span className="button-content">{children}</span>
        {!loading && rightIcon && <span className="button-icon right">{rightIcon}</span>}

        <style>{`
          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border: none;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            position: relative;
          }

          .button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .button.full-width {
            width: 100%;
          }

          /* Sizes */
          .button.small {
            padding: 6px 12px;
            font-size: 13px;
          }

          .button.medium {
            padding: 10px 20px;
            font-size: 14px;
          }

          .button.large {
            padding: 14px 28px;
            font-size: 16px;
          }

          /* Variants */
          .button.primary {
            background-color: #007bff;
            color: white;
          }

          .button.primary:hover:not(:disabled) {
            background-color: #0056b3;
          }

          .button.primary:active:not(:disabled) {
            background-color: #004085;
          }

          .button.secondary {
            background-color: #6c757d;
            color: white;
          }

          .button.secondary:hover:not(:disabled) {
            background-color: #5a6268;
          }

          .button.outline {
            background-color: transparent;
            color: #007bff;
            border: 2px solid #007bff;
          }

          .button.outline:hover:not(:disabled) {
            background-color: #007bff;
            color: white;
          }

          .button.danger {
            background-color: #dc3545;
            color: white;
          }

          .button.danger:hover:not(:disabled) {
            background-color: #c82333;
          }

          .button.ghost {
            background-color: transparent;
            color: #007bff;
          }

          .button.ghost:hover:not(:disabled) {
            background-color: rgba(0, 123, 255, 0.1);
          }

          /* Loading */
          .button.loading {
            position: relative;
          }

          .button-spinner {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .button-icon {
            display: flex;
            align-items: center;
            font-size: 18px;
          }

          .button-content {
            display: flex;
            align-items: center;
          }

          /* Dark mode */
          .dark .button.primary {
            background-color: #0056b3;
          }

          .dark .button.primary:hover:not(:disabled) {
            background-color: #004085;
          }

          .dark .button.secondary {
            background-color: #5a6268;
          }

          .dark .button.secondary:hover:not(:disabled) {
            background-color: #495057;
          }

          .dark .button.outline {
            border-color: #0056b3;
            color: #4a9eff;
          }

          .dark .button.outline:hover:not(:disabled) {
            background-color: #0056b3;
            color: white;
          }

          .dark .button.ghost {
            color: #4a9eff;
          }

          .dark .button.ghost:hover:not(:disabled) {
            background-color: rgba(74, 158, 255, 0.1);
          }
        `}</style>
      </button>
    );
  }
);

Button.displayName = "Button";
