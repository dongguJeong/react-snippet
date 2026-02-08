import { useEffect, useRef, useState, type ReactNode } from "react";

interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  position?: "left" | "right" | "center";
  closeOnSelect?: boolean;
  className?: string;
}

export function Dropdown({
  trigger,
  items,
  onSelect,
  position = "left",
  closeOnSelect = true,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
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

  const handleSelect = (value: string, disabled?: boolean) => {
    if (disabled) return;
    onSelect(value);
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <div
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div className={`dropdown-menu ${position}`}>
          {items.map((item) => (
            <div
              key={item.value}
              className={`dropdown-item ${item.disabled ? "disabled" : ""}`}
              onClick={() => handleSelect(item.value, item.disabled)}
              role="menuitem"
            >
              {item.icon && <span className="dropdown-icon">{item.icon}</span>}
              <span className="dropdown-label">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-trigger {
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          margin-top: 8px;
          min-width: 200px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          overflow: hidden;
        }

        .dropdown-menu.left {
          left: 0;
        }

        .dropdown-menu.right {
          right: 0;
        }

        .dropdown-menu.center {
          left: 50%;
          transform: translateX(-50%);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          gap: 12px;
        }

        .dropdown-item:hover:not(.disabled) {
          background-color: #f5f5f5;
        }

        .dropdown-item.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .dropdown-icon {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        .dropdown-label {
          flex: 1;
        }

        .dark .dropdown-menu {
          background-color: #2a2a2a;
          border-color: #444;
        }

        .dark .dropdown-item:hover:not(.disabled) {
          background-color: #333;
        }
      `}</style>
    </div>
  );
}
