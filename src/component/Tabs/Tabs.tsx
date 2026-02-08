import { useState, type ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "default" | "pills" | "underline";
  className?: string;
}

export function Tabs({
  tabs,
  defaultActiveTab,
  onChange,
  variant = "default",
  className = "",
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab || tabs[0]?.id || ""
  );

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`tabs ${variant} ${className}`}>
      <div className="tabs-list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`tab ${activeTab === tab.id ? "active" : ""} ${
              tab.disabled ? "disabled" : ""
            }`}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div
        className="tabs-content"
        role="tabpanel"
        id={`panel-${activeTab}`}
      >
        {activeTabContent}
      </div>

      <style>{`
        .tabs {
          display: flex;
          flex-direction: column;
        }

        .tabs-list {
          display: flex;
          gap: 4px;
          border-bottom: 2px solid #e0e0e0;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          position: relative;
        }

        .tab:hover:not(.disabled) {
          color: #007bff;
        }

        .tab.active {
          color: #007bff;
          border-bottom-color: #007bff;
        }

        .tab.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tab-icon {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        .tabs-content {
          padding: 24px 0;
        }

        /* Pills variant */
        .tabs.pills .tabs-list {
          border-bottom: none;
          gap: 8px;
        }

        .tabs.pills .tab {
          border-radius: 6px;
          margin-bottom: 0;
          border-bottom: none;
        }

        .tabs.pills .tab:hover:not(.disabled) {
          background-color: #f0f0f0;
        }

        .tabs.pills .tab.active {
          background-color: #007bff;
          color: white;
          border-bottom: none;
        }

        /* Underline variant */
        .tabs.underline .tabs-list {
          border-bottom: 1px solid #e0e0e0;
        }

        .tabs.underline .tab {
          padding: 12px 16px;
          border-bottom: 3px solid transparent;
          margin-bottom: -1px;
        }

        .tabs.underline .tab.active {
          border-bottom-color: #007bff;
        }

        /* Dark mode */
        .dark .tabs-list {
          border-bottom-color: #333;
        }

        .dark .tab {
          color: #aaa;
        }

        .dark .tab:hover:not(.disabled) {
          color: #4a9eff;
        }

        .dark .tab.active {
          color: #4a9eff;
          border-bottom-color: #4a9eff;
        }

        .dark.tabs.pills .tab:hover:not(.disabled) {
          background-color: #333;
        }

        .dark.tabs.pills .tab.active {
          background-color: #0056b3;
        }

        .dark.tabs.underline .tabs-list {
          border-bottom-color: #333;
        }

        .dark.tabs.underline .tab.active {
          border-bottom-color: #4a9eff;
        }
      `}</style>
    </div>
  );
}
