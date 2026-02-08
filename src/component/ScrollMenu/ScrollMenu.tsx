import { useRef, useState, useEffect, type ReactNode } from "react";

interface ScrollMenuProps {
  children: ReactNode;
  showArrows?: boolean;
  arrowSize?: "small" | "medium" | "large";
  className?: string;
}

export function ScrollMenu({
  children,
  showArrows = true,
  arrowSize = "medium",
  className = "",
}: ScrollMenuProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className={`scroll-menu ${className}`}>
      {showArrows && canScrollLeft && (
        <button
          className={`scroll-arrow left ${arrowSize}`}
          onClick={() => scroll("left")}
          aria-label="왼쪽으로 스크롤"
        >
          ‹
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="scroll-container"
        onScroll={checkScroll}
      >
        {children}
      </div>

      {showArrows && canScrollRight && (
        <button
          className={`scroll-arrow right ${arrowSize}`}
          onClick={() => scroll("right")}
          aria-label="오른쪽으로 스크롤"
        >
          ›
        </button>
      )}

      <style>{`
        .scroll-menu {
          position: relative;
          width: 100%;
        }

        .scroll-container {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 8px 0;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .scroll-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          color: #333;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
          z-index: 10;
        }

        .scroll-arrow:hover {
          background-color: #f5f5f5;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .scroll-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }

        .scroll-arrow.left {
          left: 8px;
        }

        .scroll-arrow.right {
          right: 8px;
        }

        .scroll-arrow.small {
          width: 32px;
          height: 32px;
          font-size: 20px;
        }

        .scroll-arrow.medium {
          width: 40px;
          height: 40px;
          font-size: 24px;
        }

        .scroll-arrow.large {
          width: 48px;
          height: 48px;
          font-size: 28px;
        }

        /* Dark mode */
        .dark .scroll-arrow {
          background-color: #2a2a2a;
          border-color: #444;
          color: #fff;
        }

        .dark .scroll-arrow:hover {
          background-color: #333;
        }
      `}</style>
    </div>
  );
}

interface ScrollMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export function ScrollMenuItem({
  children,
  onClick,
  active = false,
  className = "",
}: ScrollMenuItemProps) {
  return (
    <div
      className={`scroll-menu-item ${active ? "active" : ""} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}

      <style>{`
        .scroll-menu-item {
          flex-shrink: 0;
          padding: 12px 20px;
          border-radius: 8px;
          background-color: #f5f5f5;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          user-select: none;
        }

        .scroll-menu-item:hover {
          background-color: #e0e0e0;
          transform: translateY(-2px);
        }

        .scroll-menu-item.active {
          background-color: #007bff;
          color: white;
        }

        .scroll-menu-item.active:hover {
          background-color: #0056b3;
        }

        /* Dark mode */
        .dark .scroll-menu-item {
          background-color: #2a2a2a;
          color: #ddd;
        }

        .dark .scroll-menu-item:hover {
          background-color: #333;
        }

        .dark .scroll-menu-item.active {
          background-color: #0056b3;
        }

        .dark .scroll-menu-item.active:hover {
          background-color: #004085;
        }
      `}</style>
    </div>
  );
}
