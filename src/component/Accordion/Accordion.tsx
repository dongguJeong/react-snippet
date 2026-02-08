import { useState, type ReactNode } from "react";

interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

interface AccordionItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="accordion-item">
      <button
        className={`accordion-header ${isOpen ? "open" : ""}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{item.title}</span>
        <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
      </button>

      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="accordion-content-inner">{item.content}</div>
      </div>
    </div>
  );
}

export function Accordion({
  items,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const defaultOpen = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen) {
        defaultOpen.add(item.id);
      }
    });
    return defaultOpen;
  });

  const handleToggle = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }

      return newSet;
    });
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}

      <style>{`
        .accordion {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }

        .accordion-item {
          border-bottom: 1px solid #ddd;
        }

        .accordion-item:last-child {
          border-bottom: none;
        }

        .accordion-header {
          width: 100%;
          padding: 16px 20px;
          background-color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          transition: background-color 0.2s;
          font-size: 16px;
          font-weight: 500;
        }

        .accordion-header:hover {
          background-color: #f5f5f5;
        }

        .accordion-header.open {
          background-color: #f0f0f0;
        }

        .accordion-title {
          flex: 1;
        }

        .accordion-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: #666;
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .accordion-content.open {
          max-height: 1000px;
          transition: max-height 0.3s ease-in;
        }

        .accordion-content-inner {
          padding: 16px 20px;
          background-color: #fafafa;
        }

        .dark .accordion {
          border-color: #444;
        }

        .dark .accordion-item {
          border-bottom-color: #444;
        }

        .dark .accordion-header {
          background-color: #2a2a2a;
          color: #fff;
        }

        .dark .accordion-header:hover {
          background-color: #333;
        }

        .dark .accordion-header.open {
          background-color: #333;
        }

        .dark .accordion-icon {
          color: #ccc;
        }

        .dark .accordion-content-inner {
          background-color: #1a1a1a;
          color: #ddd;
        }
      `}</style>
    </div>
  );
}
