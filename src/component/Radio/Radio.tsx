import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, error, disabled, className = "", ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className={`radio-wrapper ${className}`}>
        <label className={`radio-label ${disabled ? "disabled" : ""}`}>
          <input
            ref={ref}
            type="radio"
            className="radio-input"
            disabled={disabled}
            {...props}
          />

          <span
            className={`radio-box ${props.checked ? "checked" : ""} ${
              hasError ? "error" : ""
            }`}
          >
            {props.checked && <span className="radio-dot" />}
          </span>

          <div className="radio-content">
            {label && <span className="radio-text">{label}</span>}
            {description && (
              <span className="radio-description">{description}</span>
            )}
          </div>
        </label>

        {error && <span className="radio-message error">{error}</span>}

        <style>{`
          .radio-wrapper {
            display: inline-flex;
            flex-direction: column;
            gap: 4px;
          }

          .radio-label {
            display: inline-flex;
            align-items: flex-start;
            gap: 8px;
            cursor: pointer;
            user-select: none;
          }

          .radio-label.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .radio-input {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }

          .radio-box {
            width: 20px;
            height: 20px;
            border: 2px solid #ddd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .radio-box:hover {
            border-color: #007bff;
          }

          .radio-box.checked {
            border-color: #007bff;
          }

          .radio-box.error {
            border-color: #dc3545;
          }

          .radio-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #007bff;
            transition: all 0.2s;
          }

          .radio-input:focus + .radio-box {
            outline: 2px solid rgba(0, 123, 255, 0.3);
            outline-offset: 2px;
          }

          .radio-input:disabled + .radio-box {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .radio-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .radio-text {
            font-size: 14px;
            color: #333;
            font-weight: 500;
          }

          .radio-description {
            font-size: 13px;
            color: #666;
          }

          .radio-message {
            font-size: 12px;
            margin-left: 28px;
          }

          .radio-message.error {
            color: #dc3545;
          }

          /* Dark mode */
          .dark .radio-box {
            border-color: #555;
          }

          .dark .radio-box:hover {
            border-color: #4a9eff;
          }

          .dark .radio-box.checked {
            border-color: #4a9eff;
          }

          .dark .radio-dot {
            background-color: #4a9eff;
          }

          .dark .radio-text {
            color: #ddd;
          }

          .dark .radio-description {
            color: #aaa;
          }
        `}</style>
      </div>
    );
  }
);

Radio.displayName = "Radio";

// RadioGroup 컴포넌트
interface RadioGroupProps {
  children: ReactNode;
  label?: string;
  error?: string;
  className?: string;
}

export function RadioGroup({
  children,
  label,
  error,
  className = "",
}: RadioGroupProps) {
  return (
    <div className={`radio-group ${className}`}>
      {label && <div className="radio-group-label">{label}</div>}
      <div className="radio-group-items">{children}</div>
      {error && <span className="radio-group-error">{error}</span>}

      <style>{`
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .radio-group-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }

        .radio-group-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .radio-group-error {
          font-size: 12px;
          color: #dc3545;
        }

        /* Dark mode */
        .dark .radio-group-label {
          color: #ddd;
        }
      `}</style>
    </div>
  );
}
