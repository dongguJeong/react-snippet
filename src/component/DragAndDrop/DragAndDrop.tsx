import { useState, useRef, type DragEvent, type ReactNode } from "react";

interface DragAndDropProps {
  onFilesDropped?: (files: FileList) => void;
  onItemsReorder?: (items: string[]) => void;
  children?: ReactNode;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  disabled?: boolean;
  className?: string;
  mode?: "file" | "sortable";
  items?: string[];
}

export function DragAndDrop({
  onFilesDropped,
  onItemsReorder,
  children,
  accept,
  multiple = true,
  maxSize,
  disabled = false,
  className = "",
  mode = "file",
  items = [],
}: DragAndDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const dragCounter = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: FileList): boolean => {
    if (maxSize) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          setError(`파일 크기는 ${(maxSize / 1024 / 1024).toFixed(2)}MB를 초과할 수 없습니다.`);
          return false;
        }
      }
    }
    setError("");
    return true;
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    setIsDragging(false);
    dragCounter.current = 0;

    if (mode === "file" && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      if (validateFiles(files)) {
        onFilesDropped?.(files);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (validateFiles(e.target.files)) {
        onFilesDropped?.(e.target.files);
      }
    }
  };

  const handleItemDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    if (disabled) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleItemDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (disabled || draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    onItemsReorder?.(newItems);
  };

  const handleItemDragEnd = () => {
    setDraggedIndex(null);
  };

  if (mode === "sortable") {
    return (
      <>
        <div className={`sortable-container ${className}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`sortable-item ${draggedIndex === index ? "dragging" : ""} ${
                disabled ? "disabled" : ""
              }`}
              draggable={!disabled}
              onDragStart={(e) => handleItemDragStart(e, index)}
              onDragOver={(e) => handleItemDragOver(e, index)}
              onDragEnd={handleItemDragEnd}
            >
              <span className="drag-handle">⋮⋮</span>
              <span className="item-content">{item}</span>
            </div>
          ))}
        </div>

        <style>{`
          .sortable-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .sortable-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background-color: white;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            cursor: move;
            transition: all 0.2s;
            user-select: none;
          }

          .sortable-item:hover:not(.disabled) {
            border-color: #007bff;
            box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
          }

          .sortable-item.dragging {
            opacity: 0.5;
            transform: scale(0.98);
          }

          .sortable-item.disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }

          .drag-handle {
            color: #999;
            font-size: 16px;
            line-height: 1;
          }

          .item-content {
            flex: 1;
            color: #333;
          }

          /* Dark mode */
          .dark .sortable-item {
            background-color: #1a1a1a;
            border-color: #333;
          }

          .dark .sortable-item:hover:not(.disabled) {
            border-color: #4a9eff;
            box-shadow: 0 2px 8px rgba(74, 158, 255, 0.1);
          }

          .dark .item-content {
            color: #fff;
          }

          .dark .drag-handle {
            color: #666;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div
        className={`drag-drop-zone ${isDragging ? "dragging" : ""} ${
          disabled ? "disabled" : ""
        } ${className}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          disabled={disabled}
        />

        {children || (
          <div className="drag-drop-content">
            <div className="drag-drop-icon">📁</div>
            <p className="drag-drop-text">
              {isDragging ? "파일을 여기에 놓으세요" : "파일을 드래그하거나 클릭하세요"}
            </p>
            {accept && (
              <p className="drag-drop-hint">
                지원 형식: {accept.split(",").join(", ")}
              </p>
            )}
            {maxSize && (
              <p className="drag-drop-hint">
                최대 크기: {(maxSize / 1024 / 1024).toFixed(2)}MB
              </p>
            )}
          </div>
        )}

        {error && <p className="drag-drop-error">{error}</p>}
      </div>

      <style>{`
        .drag-drop-zone {
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background-color: #fafafa;
        }

        .drag-drop-zone:hover:not(.disabled) {
          border-color: #007bff;
          background-color: #f0f8ff;
        }

        .drag-drop-zone.dragging {
          border-color: #007bff;
          background-color: #e6f2ff;
          transform: scale(1.02);
        }

        .drag-drop-zone.disabled {
          cursor: not-allowed;
          opacity: 0.6;
          background-color: #f5f5f5;
        }

        .drag-drop-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .drag-drop-icon {
          font-size: 48px;
        }

        .drag-drop-text {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .drag-drop-hint {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .drag-drop-error {
          margin: 12px 0 0;
          padding: 8px 12px;
          background-color: #fee;
          color: #c00;
          border-radius: 4px;
          font-size: 14px;
        }

        /* Dark mode */
        .dark .drag-drop-zone {
          background-color: #1a1a1a;
          border-color: #444;
        }

        .dark .drag-drop-zone:hover:not(.disabled) {
          border-color: #4a9eff;
          background-color: #1a2332;
        }

        .dark .drag-drop-zone.dragging {
          border-color: #4a9eff;
          background-color: #1a2940;
        }

        .dark .drag-drop-zone.disabled {
          background-color: #111;
        }

        .dark .drag-drop-text {
          color: #fff;
        }

        .dark .drag-drop-hint {
          color: #999;
        }

        .dark .drag-drop-error {
          background-color: #3a1a1a;
          color: #ff6b6b;
        }
      `}</style>
    </>
  );
}
