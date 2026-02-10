import { useEffect, useRef, useState, type ReactNode } from "react";
import "./Dropdown.css";

export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  trigger?: ReactNode;
  items: DropdownItem[];
  onSelect?: (value: string) => void;
  position?: "left" | "right" | "center";
  closeOnSelect?: boolean;
  className?: string;

  // 검색 기능
  searchable?: boolean;
  searchPlaceholder?: string;

  // 선택 모드
  multiple?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;

  // 항목 생성 기능
  creatable?: boolean;
  onCreateItem?: (inputValue: string) => void;
  createItemLabel?: (inputValue: string) => string;

  // 스타일
  placeholder?: string;
  maxHeight?: number;
}

export function Dropdown({
  trigger,
  items,
  onSelect,
  position = "left",
  closeOnSelect = true,
  className = "",
  searchable = false,
  searchPlaceholder = "검색...",
  multiple = false,
  value,
  onChange,
  creatable = false,
  onCreateItem,
  createItemLabel = (input) => `"${input}" 생성`,
  placeholder = "선택하세요",
  maxHeight = 300,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(() => {
    if (value) {
      return Array.isArray(value) ? value : [value];
    }
    return [];
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // value prop이 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  // 드롭다운이 열리면 검색 입력창에 포커스
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
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

  // 필터링된 항목
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 새 항목 생성 가능 여부
  const canCreateItem =
    creatable &&
    searchQuery.trim() !== "" &&
    !items.some(
      (item) => item.label.toLowerCase() === searchQuery.toLowerCase()
    );

  const handleSelect = (itemValue: string, disabled?: boolean) => {
    if (disabled) return;

    if (multiple) {
      const newValues = selectedValues.includes(itemValue)
        ? selectedValues.filter((v) => v !== itemValue)
        : [...selectedValues, itemValue];

      setSelectedValues(newValues);
      onChange?.(newValues);
      onSelect?.(itemValue);

      // 다중 선택 시 드롭다운 유지
      setSearchQuery("");
    } else {
      setSelectedValues([itemValue]);
      onChange?.(itemValue);
      onSelect?.(itemValue);

      if (closeOnSelect) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
  };

  const handleCreateItem = () => {
    if (canCreateItem && onCreateItem) {
      onCreateItem(searchQuery.trim());
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const handleRemoveValue = (
    valueToRemove: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    setSelectedValues(newValues);
    onChange?.(multiple ? newValues : "");
  };

  // 선택된 항목 레이블 가져오기
  const getSelectedLabels = () => {
    return selectedValues
      .map((v) => items.find((item) => item.value === v)?.label)
      .filter(Boolean);
  };

  // trigger가 제공되지 않으면 기본 trigger 사용
  const renderTrigger = () => {
    if (trigger) {
      return trigger;
    }

    const selectedLabels = getSelectedLabels();

    return (
      <div className="dropdown-default-trigger">
        <div className="dropdown-trigger-content">
          {selectedLabels.length > 0 ? (
            multiple ? (
              <div className="dropdown-selected-tags">
                {selectedLabels.map((label, index) => (
                  <span key={selectedValues[index]} className="dropdown-tag">
                    {label}
                    <button
                      className="dropdown-tag-remove"
                      onClick={(e) =>
                        handleRemoveValue(selectedValues[index], e)
                      }
                      aria-label={`${label} 제거`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <span className="dropdown-trigger-text">
                {selectedLabels[0]}
              </span>
            )
          ) : (
            <span className="dropdown-trigger-placeholder">
              {placeholder}
            </span>
          )}
        </div>
        <span className="dropdown-trigger-arrow">▼</span>
      </div>
    );
  };

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <div
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {renderTrigger()}
      </div>

      {isOpen && (
        <div
          className={`dropdown-menu ${position}`}
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {searchable && (
            <div className="dropdown-search">
              <input
                ref={searchInputRef}
                type="text"
                className="dropdown-search-input"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    canCreateItem &&
                    onCreateItem
                  ) {
                    handleCreateItem();
                  }
                }}
              />
            </div>
          )}

          <div className="dropdown-items-container">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isSelected = selectedValues.includes(item.value);

                return (
                  <div
                    key={item.value}
                    className={`dropdown-item ${
                      item.disabled ? "disabled" : ""
                    } ${isSelected ? "selected" : ""}`}
                    onClick={() =>
                      handleSelect(item.value, item.disabled)
                    }
                    role="menuitem"
                    aria-selected={isSelected}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        className="dropdown-checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                    {item.icon && (
                      <span className="dropdown-icon">{item.icon}</span>
                    )}
                    <span className="dropdown-label">{item.label}</span>
                  </div>
                );
              })
            ) : (
              <div className="dropdown-empty">
                {searchQuery ? "검색 결과가 없습니다" : "항목이 없습니다"}
              </div>
            )}

            {canCreateItem && onCreateItem && (
              <div
                className="dropdown-item dropdown-create-item"
                onClick={handleCreateItem}
                role="menuitem"
              >
                <span className="dropdown-create-icon">+</span>
                <span className="dropdown-label">
                  {createItemLabel(searchQuery)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
