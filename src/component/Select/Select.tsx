import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDownIcon, XIcon, SearchIcon } from "../Icon/Icon";

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  label,
  error,
  helperText,
  disabled = false,
  searchable = false,
  multiple = false,
  clearable = false,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiple ? [] : "");
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;

    if (multiple) {
      return selectedValues
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .join(", ");
    }

    return options.find((opt) => opt.value === selectedValues[0])?.label || placeholder;
  };

  const hasValue = selectedValues.length > 0;
  const hasError = Boolean(error);

  return (
    <div className={`select-wrapper ${className}`} ref={selectRef}>
      {label && <label className="select-label">{label}</label>}

      <div
        className={`select-trigger ${isOpen ? "open" : ""} ${
          hasError ? "error" : ""
        } ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`select-value ${!hasValue ? "placeholder" : ""}`}>
          {getDisplayText()}
        </span>

        <div className="select-icons">
          {clearable && hasValue && !disabled && (
            <button
              className="select-clear"
              onClick={handleClear}
              type="button"
              aria-label="Clear selection"
            >
              <XIcon size={16} />
            </button>
          )}
          <ChevronDownIcon
            size={20}
            className={`select-arrow ${isOpen ? "rotate" : ""}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {searchable && (
            <div className="select-search">
              <SearchIcon size={16} color="#999" />
              <input
                type="text"
                className="select-search-input"
                placeholder="검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}

          <div className="select-options">
            {filteredOptions.length === 0 ? (
              <div className="select-empty">결과가 없습니다</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`select-option ${
                    selectedValues.includes(option.value) ? "selected" : ""
                  } ${option.disabled ? "disabled" : ""}`}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option.value)}
                      onChange={() => {}}
                      className="select-checkbox"
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && <span className="select-message error">{error}</span>}
      {!error && helperText && (
        <span className="select-message helper">{helperText}</span>
      )}

      <style>{`
        .select-wrapper {
          display: inline-flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
          min-width: 200px;
        }

        .select-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .select-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }

        .select-trigger:hover:not(.disabled) {
          border-color: #007bff;
        }

        .select-trigger.open {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .select-trigger.error {
          border-color: #dc3545;
        }

        .select-trigger.disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .select-value {
          flex: 1;
          font-size: 14px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .select-value.placeholder {
          color: #999;
        }

        .select-icons {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .select-clear {
          display: flex;
          align-items: center;
          padding: 2px;
          border: none;
          background: none;
          cursor: pointer;
          color: #666;
          border-radius: 2px;
        }

        .select-clear:hover {
          background-color: #f0f0f0;
          color: #333;
        }

        .select-arrow {
          transition: transform 0.2s;
        }

        .select-arrow.rotate {
          transform: rotate(180deg);
        }

        .select-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 4px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          max-height: 300px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .select-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-bottom: 1px solid #e0e0e0;
        }

        .select-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #333;
        }

        .select-options {
          overflow-y: auto;
          max-height: 250px;
        }

        .select-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 14px;
        }

        .select-option:hover:not(.disabled) {
          background-color: #f5f5f5;
        }

        .select-option.selected {
          background-color: #e7f3ff;
          color: #007bff;
        }

        .select-option.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .select-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .select-empty {
          padding: 20px;
          text-align: center;
          color: #999;
          font-size: 14px;
        }

        .select-message {
          font-size: 12px;
        }

        .select-message.error {
          color: #dc3545;
        }

        .select-message.helper {
          color: #666;
        }

        /* Dark mode */
        .dark .select-label {
          color: #ddd;
        }

        .dark .select-trigger {
          background-color: #2a2a2a;
          border-color: #444;
        }

        .dark .select-trigger:hover:not(.disabled) {
          border-color: #4a9eff;
        }

        .dark .select-trigger.disabled {
          background-color: #1a1a1a;
        }

        .dark .select-value {
          color: #ddd;
        }

        .dark .select-value.placeholder {
          color: #777;
        }

        .dark .select-clear:hover {
          background-color: #333;
          color: #ddd;
        }

        .dark .select-dropdown {
          background-color: #2a2a2a;
          border-color: #444;
        }

        .dark .select-search {
          border-bottom-color: #444;
        }

        .dark .select-search-input {
          background-color: transparent;
          color: #ddd;
        }

        .dark .select-option:hover:not(.disabled) {
          background-color: #333;
        }

        .dark .select-option.selected {
          background-color: #1a3a52;
          color: #4a9eff;
        }

        .dark .select-empty {
          color: #777;
        }

        .dark .select-message.helper {
          color: #aaa;
        }
      `}</style>
    </div>
  );
}
