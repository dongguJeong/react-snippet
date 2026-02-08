import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <div className={`input-wrapper ${fullWidth ? "full-width" : ""}`}>
        {label && (
          <label className="input-label" htmlFor={props.id}>
            {label}
            {props.required && <span className="input-required">*</span>}
          </label>
        )}

        <div
          className={`input-container ${hasError ? "error" : ""} ${
            disabled ? "disabled" : ""
          }`}
        >
          {leftIcon && <span className="input-icon left">{leftIcon}</span>}

          <input
            ref={ref}
            className={`input ${leftIcon ? "has-left-icon" : ""} ${
              rightIcon ? "has-right-icon" : ""
            } ${className}`}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && <span className="input-icon right">{rightIcon}</span>}
        </div>

        {error && (
          <span className="input-message error" id={`${props.id}-error`}>
            {error}
          </span>
        )}

        {!error && helperText && (
          <span className="input-message helper" id={`${props.id}-helper`}>
            {helperText}
          </span>
        )}

        <style>{`
          .input-wrapper {
            display: inline-flex;
            flex-direction: column;
            gap: 6px;
          }

          .input-wrapper.full-width {
            width: 100%;
          }

          .input-label {
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }

          .input-required {
            color: #dc3545;
            margin-left: 4px;
          }

          .input-container {
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #fff;
            transition: all 0.2s;
          }

          .input-container:focus-within {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
          }

          .input-container.error {
            border-color: #dc3545;
          }

          .input-container.error:focus-within {
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
          }

          .input-container.disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
          }

          .input {
            flex: 1;
            padding: 10px 12px;
            border: none;
            background: none;
            font-size: 14px;
            outline: none;
            color: #333;
          }

          .input.has-left-icon {
            padding-left: 4px;
          }

          .input.has-right-icon {
            padding-right: 4px;
          }

          .input:disabled {
            cursor: not-allowed;
            color: #999;
          }

          .input::placeholder {
            color: #999;
          }

          .input-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 18px;
          }

          .input-icon.left {
            padding-left: 12px;
            padding-right: 8px;
          }

          .input-icon.right {
            padding-right: 12px;
            padding-left: 8px;
          }

          .input-message {
            font-size: 12px;
            margin-top: 4px;
          }

          .input-message.error {
            color: #dc3545;
          }

          .input-message.helper {
            color: #666;
          }

          .dark .input-label {
            color: #ddd;
          }

          .dark .input-container {
            background-color: #2a2a2a;
            border-color: #444;
          }

          .dark .input-container.disabled {
            background-color: #1a1a1a;
          }

          .dark .input {
            color: #ddd;
          }

          .dark .input::placeholder {
            color: #777;
          }

          .dark .input-icon {
            color: #aaa;
          }

          .dark .input-message.helper {
            color: #aaa;
          }
        `}</style>
      </div>
    );
  }
);

Input.displayName = "Input";
