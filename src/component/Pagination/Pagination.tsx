import { usePagination } from "../../hook/usePagination/usePagination";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className = "",
}: PaginationProps) {
  const { pages, canGoNext, canGoPrev, totalPages } = usePagination({
    totalItems,
    itemsPerPage,
    initialPage: currentPage,
    siblingCount,
  });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`pagination ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className="pagination-button"
        aria-label="이전 페이지"
      >
        ‹
      </button>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="pagination-dots">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`pagination-button ${
              currentPage === page ? "active" : ""
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="pagination-button"
        aria-label="다음 페이지"
      >
        ›
      </button>

      <style>{`
        .pagination {
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: center;
          margin: 20px 0;
        }

        .pagination-button {
          min-width: 32px;
          height: 32px;
          padding: 0 8px;
          border: 1px solid #ddd;
          background-color: #fff;
          color: #333;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
          font-size: 14px;
        }

        .pagination-button:hover:not(:disabled) {
          background-color: #f0f0f0;
          border-color: #999;
        }

        .pagination-button.active {
          background-color: #007bff;
          color: #fff;
          border-color: #007bff;
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-dots {
          padding: 0 8px;
          color: #999;
        }

        .dark .pagination-button {
          background-color: #333;
          color: #fff;
          border-color: #555;
        }

        .dark .pagination-button:hover:not(:disabled) {
          background-color: #444;
          border-color: #777;
        }

        .dark .pagination-button.active {
          background-color: #0056b3;
          border-color: #0056b3;
        }
      `}</style>
    </nav>
  );
}
