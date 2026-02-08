import { useEffect, useState, type ReactNode } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "left" | "right";
  width?: string;
  closeOnClickOutside?: boolean;
  showOverlay?: boolean;
  className?: string;
}

export function Sidebar({
  isOpen,
  onClose,
  children,
  position = "left",
  width = "280px",
  closeOnClickOutside = true,
  showOverlay = true,
  className = "",
}: SidebarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <>
      {showOverlay && (
        <div
          className={`sidebar-overlay ${isOpen ? "active" : ""}`}
          onClick={closeOnClickOutside ? onClose : undefined}
        />
      )}

      <div
        className={`sidebar ${position} ${isOpen ? "open" : ""} ${className}`}
        style={{ width }}
      >
        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="사이드바 닫기"
        >
          ×
        </button>
        <div className="sidebar-content">{children}</div>
      </div>

      <style>{`
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 999;
        }

        .sidebar-overlay.active {
          opacity: 1;
        }

        .sidebar {
          position: fixed;
          top: 0;
          bottom: 0;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
          z-index: 1000;
          overflow-y: auto;
        }

        .sidebar.left {
          left: 0;
          transform: translateX(-100%);
        }

        .sidebar.left.open {
          transform: translateX(0);
        }

        .sidebar.right {
          right: 0;
          transform: translateX(100%);
        }

        .sidebar.right.open {
          transform: translateX(0);
        }

        .sidebar-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border: none;
          background: none;
          font-size: 32px;
          line-height: 1;
          cursor: pointer;
          color: #666;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-close:hover {
          color: #333;
        }

        .sidebar-content {
          padding: 60px 20px 20px;
        }

        .dark .sidebar {
          background-color: #1a1a1a;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .dark .sidebar-close {
          color: #ccc;
        }

        .dark .sidebar-close:hover {
          color: #fff;
        }
      `}</style>
    </>
  );
}
