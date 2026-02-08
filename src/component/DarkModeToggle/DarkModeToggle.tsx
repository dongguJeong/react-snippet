import { useDarkMode } from "../../hook/useDarkMode/useDarkMode";

interface DarkModeToggleProps {
  className?: string;
  variant?: "switch" | "button" | "icon";
}

export function DarkModeToggle({
  className = "",
  variant = "switch",
}: DarkModeToggleProps) {
  const { isDarkMode, toggleTheme } = useDarkMode();

  if (variant === "switch") {
    return (
      <label className={`dark-mode-toggle switch ${className}`}>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          aria-label="다크모드 토글"
        />
        <span className="slider"></span>
        <style>{`
          .dark-mode-toggle.switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 28px;
            cursor: pointer;
          }

          .dark-mode-toggle.switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.3s;
            border-radius: 28px;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
          }

          input:checked + .slider {
            background-color: #007bff;
          }

          input:checked + .slider:before {
            transform: translateX(24px);
          }

          input:focus + .slider {
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
          }
        `}</style>
      </label>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={toggleTheme}
        className={`dark-mode-toggle button ${className}`}
        aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
      >
        {isDarkMode ? "🌙 다크" : "☀️ 라이트"}
        <style>{`
          .dark-mode-toggle.button {
            padding: 8px 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #fff;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .dark-mode-toggle.button:hover {
            background-color: #f5f5f5;
            border-color: #999;
          }

          .dark .dark-mode-toggle.button {
            background-color: #2a2a2a;
            border-color: #444;
            color: #ddd;
          }

          .dark .dark-mode-toggle.button:hover {
            background-color: #333;
            border-color: #666;
          }
        `}</style>
      </button>
    );
  }

  // variant === "icon"
  return (
    <button
      onClick={toggleTheme}
      className={`dark-mode-toggle icon ${className}`}
      aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDarkMode ? "🌙" : "☀️"}
      <style>{`
        .dark-mode-toggle.icon {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background-color: transparent;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark-mode-toggle.icon:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .dark .dark-mode-toggle.icon:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </button>
  );
}
