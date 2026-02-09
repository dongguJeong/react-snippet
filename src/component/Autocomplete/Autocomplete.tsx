import { useState, useRef, useEffect, type KeyboardEvent } from "react";

interface AutocompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onCreateOption?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  allowCreate?: boolean;
  filterOptions?: (options: string[], inputValue: string) => string[];
  caseSensitive?: boolean;
  maxSuggestions?: number;
  className?: string;
}

export function Autocomplete({
  options,
  value,
  onChange,
  onCreateOption,
  placeholder = "입력하세요...",
  disabled = false,
  allowCreate = true,
  filterOptions,
  caseSensitive = false,
  maxSuggestions = 5,
  className = "",
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const defaultFilter = (opts: string[], inputValue: string) => {
    if (!inputValue) return opts;
    const searchValue = caseSensitive ? inputValue : inputValue.toLowerCase();
    return opts.filter((option) => {
      const optionValue = caseSensitive ? option : option.toLowerCase();
      return optionValue.includes(searchValue);
    });
  };

  const filteredOptions = (filterOptions || defaultFilter)(options, value).slice(
    0,
    maxSuggestions
  );

  const shouldShowCreate =
    allowCreate &&
    value.trim() !== "" &&
    !options.some((opt) =>
      caseSensitive ? opt === value : opt.toLowerCase() === value.toLowerCase()
    );

  const displayOptions = shouldShowCreate
    ? [...filteredOptions, `+ "${value}" 생성하기`]
    : filteredOptions;

  useEffect(() => {
    setHighlightedIndex(0);
  }, [value]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay to allow click events on options
    setTimeout(() => setIsOpen(false), 200);
  };

  const selectOption = (option: string, isCreate = false) => {
    if (isCreate) {
      onCreateOption?.(value);
      onChange("");
    } else {
      onChange(option);
    }
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev < displayOptions.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : displayOptions.length - 1
        );
        break;

      case "Enter":
        e.preventDefault();
        if (displayOptions.length > 0) {
          const selectedOption = displayOptions[highlightedIndex];
          const isCreate = selectedOption.startsWith("+ ");
          selectOption(
            isCreate ? value : selectedOption,
            isCreate
          );
        } else if (shouldShowCreate) {
          onCreateOption?.(value);
          onChange("");
        }
        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;

      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <>
      <div className={`autocomplete-container ${className}`}>
        <input
          ref={inputRef}
          type="text"
          className={`autocomplete-input ${disabled ? "disabled" : ""}`}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
        />

        {isOpen && displayOptions.length > 0 && (
          <ul ref={listRef} className="autocomplete-list">
            {displayOptions.map((option, index) => {
              const isCreate = option.startsWith("+ ");
              return (
                <li
                  key={index}
                  className={`autocomplete-option ${
                    index === highlightedIndex ? "highlighted" : ""
                  } ${isCreate ? "create-option" : ""}`}
                  onClick={() => selectOption(isCreate ? value : option, isCreate)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {isCreate && <span className="create-icon">➕</span>}
                  {option}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <style>{`
        .autocomplete-container {
          position: relative;
          width: 100%;
        }

        .autocomplete-input {
          width: 100%;
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          transition: all 0.2s;
          background-color: white;
          color: #333;
          font-family: inherit;
        }

        .autocomplete-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .autocomplete-input.disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .autocomplete-list {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          max-height: 250px;
          overflow-y: auto;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          list-style: none;
          margin: 0;
          padding: 4px 0;
          z-index: 1000;
        }

        .autocomplete-option {
          padding: 10px 14px;
          cursor: pointer;
          transition: background-color 0.15s;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .autocomplete-option:hover,
        .autocomplete-option.highlighted {
          background-color: #f0f8ff;
        }

        .autocomplete-option.create-option {
          color: #007bff;
          font-weight: 500;
          border-top: 1px solid #e0e0e0;
          margin-top: 4px;
        }

        .autocomplete-option.create-option:hover,
        .autocomplete-option.create-option.highlighted {
          background-color: #e6f2ff;
        }

        .create-icon {
          font-size: 16px;
          flex-shrink: 0;
        }

        /* 스크롤바 스타일 */
        .autocomplete-list::-webkit-scrollbar {
          width: 8px;
        }

        .autocomplete-list::-webkit-scrollbar-track {
          background: #f5f5f5;
          border-radius: 4px;
        }

        .autocomplete-list::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }

        .autocomplete-list::-webkit-scrollbar-thumb:hover {
          background: #999;
        }

        /* Dark mode */
        .dark .autocomplete-input {
          background-color: #1a1a1a;
          border-color: #444;
          color: #fff;
        }

        .dark .autocomplete-input:focus {
          border-color: #4a9eff;
          box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
        }

        .dark .autocomplete-input.disabled {
          background-color: #111;
        }

        .dark .autocomplete-list {
          background-color: #1a1a1a;
          border-color: #333;
        }

        .dark .autocomplete-option {
          color: #fff;
        }

        .dark .autocomplete-option:hover,
        .dark .autocomplete-option.highlighted {
          background-color: #2a2a2a;
        }

        .dark .autocomplete-option.create-option {
          color: #4a9eff;
          border-top-color: #333;
        }

        .dark .autocomplete-option.create-option:hover,
        .dark .autocomplete-option.create-option.highlighted {
          background-color: #1a2940;
        }

        .dark .autocomplete-list::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        .dark .autocomplete-list::-webkit-scrollbar-thumb {
          background: #444;
        }

        .dark .autocomplete-list::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </>
  );
}
