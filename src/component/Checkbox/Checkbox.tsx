import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { CheckIcon, MinusIcon } from "../Icon/Icon";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  indeterminate?: boolean;
  checkIcon?: ReactNode;
  error?: string;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      checkIcon,
      error,
      helperText,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <div className={`checkbox-wrapper ${className}`}>
        <label className={`checkbox-label ${disabled ? "disabled" : ""}`}>
          <input
            ref={ref}
            type="checkbox"
            className="checkbox-input"
            disabled={disabled}
            {...props}
          />

          <span
            className={`checkbox-box ${props.checked ? "checked" : ""} ${
              indeterminate ? "indeterminate" : ""
            } ${hasError ? "error" : ""}`}
          >
            {indeterminate ? (
              <MinusIcon size={16} color="#fff" />
            ) : props.checked ? (
              checkIcon || <CheckIcon size={16} color="#fff" />
            ) : null}
          </span>

          {label && <span className="checkbox-text">{label}</span>}
        </label>

        {error && <span className="checkbox-message error">{error}</span>}
        {!error && helperText && (
          <span className="checkbox-message helper">{helperText}</span>
        )}

        <style>{`
          .checkbox-wrapper {
            display: inline-flex;
            flex-direction: column;
            gap: 4px;
          }

          .checkbox-label {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
          }

          .checkbox-label.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .checkbox-input {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }

          .checkbox-box {
            width: 20px;
            height: 20px;
            border: 2px solid #ddd;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            flex-shrink: 0;
          }

          .checkbox-box:hover {
            border-color: #007bff;
          }

          .checkbox-box.checked,
          .checkbox-box.indeterminate {
            background-color: #007bff;
            border-color: #007bff;
          }

          .checkbox-box.error {
            border-color: #dc3545;
          }

          .checkbox-input:focus + .checkbox-box {
            outline: 2px solid rgba(0, 123, 255, 0.3);
            outline-offset: 2px;
          }

          .checkbox-input:disabled + .checkbox-box {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .checkbox-text {
            font-size: 14px;
            color: #333;
          }

          .checkbox-message {
            font-size: 12px;
            margin-left: 28px;
          }

          .checkbox-message.error {
            color: #dc3545;
          }

          .checkbox-message.helper {
            color: #666;
          }

          /* Dark mode */
          .dark .checkbox-box {
            border-color: #555;
          }

          .dark .checkbox-box:hover {
            border-color: #4a9eff;
          }

          .dark .checkbox-box.checked,
          .dark .checkbox-box.indeterminate {
            background-color: #0056b3;
            border-color: #0056b3;
          }

          .dark .checkbox-text {
            color: #ddd;
          }

          .dark .checkbox-message.helper {
            color: #aaa;
          }
        `}</style>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
