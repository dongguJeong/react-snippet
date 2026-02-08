import { useEffect, useState, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "small" | "medium" | "large" | "fullscreen";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer,
  className = "",
}: ModalProps) {
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
      <div
        className={`modal-overlay ${isOpen ? "active" : ""}`}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div className={`modal-container ${isOpen ? "active" : ""}`}>
        <div className={`modal ${size} ${className}`} onClick={(e) => e.stopPropagation()}>
          {(title || showCloseButton) && (
            <div className="modal-header">
              {title && <h2 className="modal-title">{title}</h2>}
              {showCloseButton && (
                <button
                  className="modal-close"
                  onClick={onClose}
                  aria-label="닫기"
                >
                  ×
                </button>
              )}
            </div>
          )}

          <div className="modal-body">{children}</div>

          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 1000;
        }

        .modal-overlay.active {
          opacity: 1;
        }

        .modal-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          padding: 20px;
          pointer-events: none;
        }

        .modal-container.active {
          pointer-events: auto;
        }

        .modal {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.3s;
        }

        .modal-container.active .modal {
          opacity: 1;
          transform: scale(1);
        }

        .modal.small {
          width: 100%;
          max-width: 400px;
        }

        .modal.medium {
          width: 100%;
          max-width: 600px;
        }

        .modal.large {
          width: 100%;
          max-width: 900px;
        }

        .modal.fullscreen {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          border-radius: 0;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #e0e0e0;
        }

        .modal-title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #333;
        }

        .modal-close {
          width: 32px;
          height: 32px;
          border: none;
          background: none;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
          color: #666;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .modal-close:hover {
          background-color: #f0f0f0;
          color: #333;
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        /* Dark mode */
        .dark .modal {
          background-color: #1a1a1a;
        }

        .dark .modal-header {
          border-bottom-color: #333;
        }

        .dark .modal-title {
          color: #fff;
        }

        .dark .modal-close {
          color: #ccc;
        }

        .dark .modal-close:hover {
          background-color: #333;
          color: #fff;
        }

        .dark .modal-footer {
          border-top-color: #333;
        }
      `}</style>
    </>
  );
}
