import { useState, useRef, useEffect, type ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click" | "focus";
  delay?: number;
  arrow?: boolean;
  maxWidth?: number;
  className?: string;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  position = "top",
  trigger = "hover",
  delay = 200,
  arrow = true,
  maxWidth = 250,
  className = "",
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = arrow ? 12 : 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + gap;
        break;
    }

    // 화면 밖으로 나가지 않도록 조정
    const padding = 8;
    if (left < padding) left = padding;
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + tooltipRect.height > window.innerHeight - padding) {
      top = window.innerHeight - tooltipRect.height - padding;
    }

    setCoords({ top, left });
  };

  const show = () => {
    if (disabled) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const toggle = () => {
    if (disabled) return;
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();

      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getTriggerProps = () => {
    const props: React.HTMLAttributes<HTMLDivElement> = {};

    if (trigger === "hover") {
      props.onMouseEnter = show;
      props.onMouseLeave = hide;
    } else if (trigger === "click") {
      props.onClick = toggle;
    } else if (trigger === "focus") {
      props.onFocus = show;
      props.onBlur = hide;
    }

    return props;
  };

  useEffect(() => {
    if (trigger === "click" && isVisible) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          tooltipRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          !tooltipRef.current.contains(e.target as Node)
        ) {
          hide();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [trigger, isVisible]);

  return (
    <>
      <div
        ref={triggerRef}
        className={`tooltip-trigger ${className}`}
        {...getTriggerProps()}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`tooltip-content ${position} ${arrow ? "with-arrow" : ""}`}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            maxWidth: `${maxWidth}px`,
          }}
        >
          {content}
          {arrow && <div className="tooltip-arrow" />}
        </div>
      )}

      <style>{`
        .tooltip-trigger {
          display: inline-block;
          cursor: help;
        }

        .tooltip-content {
          position: fixed;
          z-index: 10000;
          background-color: #333;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          line-height: 1.5;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: tooltip-fade-in 0.2s ease-out;
          pointer-events: none;
        }

        @keyframes tooltip-fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .tooltip-arrow {
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
        }

        .tooltip-content.top .tooltip-arrow {
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 6px 6px 0 6px;
          border-color: #333 transparent transparent transparent;
        }

        .tooltip-content.bottom .tooltip-arrow {
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 6px 6px 6px;
          border-color: transparent transparent #333 transparent;
        }

        .tooltip-content.left .tooltip-arrow {
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 0 6px 6px;
          border-color: transparent transparent transparent #333;
        }

        .tooltip-content.right .tooltip-arrow {
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 6px 6px 0;
          border-color: transparent #333 transparent transparent;
        }

        /* Dark mode */
        .dark .tooltip-content {
          background-color: #1a1a1a;
          border: 1px solid #444;
        }

        .dark .tooltip-content.top .tooltip-arrow {
          border-color: #1a1a1a transparent transparent transparent;
          filter: drop-shadow(0 1px 0 #444);
        }

        .dark .tooltip-content.bottom .tooltip-arrow {
          border-color: transparent transparent #1a1a1a transparent;
          filter: drop-shadow(0 -1px 0 #444);
        }

        .dark .tooltip-content.left .tooltip-arrow {
          border-color: transparent transparent transparent #1a1a1a;
          filter: drop-shadow(1px 0 0 #444);
        }

        .dark .tooltip-content.right .tooltip-arrow {
          border-color: transparent #1a1a1a transparent transparent;
          filter: drop-shadow(-1px 0 0 #444);
        }
      `}</style>
    </>
  );
}
