import { useState, useMemo, type ReactNode } from "react";
import "./Table.css";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];

  // 정렬 옵션
  sortable?: boolean;
  defaultSortKey?: keyof T | string;
  defaultSortOrder?: "asc" | "desc";

  // 선택 옵션
  selectable?: "single" | "multiple" | false;
  onSelectionChange?: (selected: T[]) => void;
  rowKey?: keyof T;

  // 스타일 옵션
  zebra?: boolean;
  className?: string;

  // 필터링 옵션
  filterable?: boolean;
  onFilterChange?: (filteredData: T[]) => void;

  // 페이지네이션 옵션
  paginated?: boolean;
  pageSize?: number;
  defaultPage?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageInfo?: boolean;

  // 커스텀 렌더링
  emptyMessage?: ReactNode;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  sortable = false,
  defaultSortKey,
  defaultSortOrder = "asc",
  selectable = false,
  onSelectionChange,
  rowKey = "id" as keyof T,
  zebra = false,
  className = "",
  filterable = false,
  onFilterChange,
  paginated = false,
  pageSize: initialPageSize = 10,
  defaultPage = 1,
  onPageChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
  showPageInfo = true,
  emptyMessage = "데이터가 없습니다.",
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | string | null>(
    defaultSortKey || null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);
  const [selectedRows, setSelectedRows] = useState<Set<any>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    if (!filterable || Object.keys(filters).length === 0) {
      return data;
    }

    const result = data.filter((item) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        const itemValue = String(item[key as keyof T] || "").toLowerCase();
        return itemValue.includes(filterValue.toLowerCase());
      });
    });

    onFilterChange?.(result);
    return result;
  }, [data, filters, filterable, onFilterChange]);

  // 정렬된 데이터
  const sortedData = useMemo(() => {
    if (!sortable || !sortKey) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey as keyof T];
      const bVal = b[sortKey as keyof T];

      if (aVal === bVal) return 0;

      let comparison = 0;
      if (typeof aVal === "string" && typeof bVal === "string") {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortKey, sortOrder, sortable]);

  // 페이지네이션 계산
  const totalItems = sortedData.length;
  const totalPages = paginated ? Math.ceil(totalItems / pageSize) : 1;

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    if (!paginated) {
      return sortedData;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, paginated, currentPage, pageSize]);

  // 정렬 핸들러
  const handleSort = (key: keyof T | string) => {
    if (!sortable) return;

    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // 선택 핸들러
  const handleRowSelect = (item: T) => {
    if (!selectable) return;

    const itemKey = item[rowKey];
    const newSelected = new Set(selectedRows);

    if (selectable === "single") {
      if (newSelected.has(itemKey)) {
        newSelected.clear();
      } else {
        newSelected.clear();
        newSelected.add(itemKey);
      }
    } else {
      // multiple
      if (newSelected.has(itemKey)) {
        newSelected.delete(itemKey);
      } else {
        newSelected.add(itemKey);
      }
    }

    setSelectedRows(newSelected);

    const selectedItems = sortedData.filter((row) =>
      newSelected.has(row[rowKey])
    );
    onSelectionChange?.(selectedItems);
  };

  // 전체 선택 핸들러 (현재 페이지 또는 전체 데이터)
  const handleSelectAll = () => {
    if (selectable !== "multiple") return;

    const dataToSelect = paginated ? paginatedData : sortedData;
    const currentPageKeys = new Set(dataToSelect.map((item) => item[rowKey]));
    const allCurrentPageSelected = [...currentPageKeys].every((key) =>
      selectedRows.has(key)
    );

    const newSelected = new Set(selectedRows);

    if (allCurrentPageSelected) {
      // 현재 페이지 선택 해제
      currentPageKeys.forEach((key) => newSelected.delete(key));
    } else {
      // 현재 페이지 선택
      currentPageKeys.forEach((key) => newSelected.add(key));
    }

    setSelectedRows(newSelected);

    const selectedItems = sortedData.filter((row) =>
      newSelected.has(row[rowKey])
    );
    onSelectionChange?.(selectedItems);
  };

  // 필터 핸들러
  const handleFilterChange = (columnKey: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
    // 필터 변경 시 첫 페이지로 이동
    if (paginated) {
      setCurrentPage(1);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    onPageChange?.(newPage, pageSize);
  };

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로
    onPageChange?.(1, newPageSize);
  };

  const tableClasses = [
    "table",
    zebra && "table-zebra",
    selectable && "table-selectable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const displayData = paginatedData;
  const currentPageKeys = new Set(displayData.map((item) => item[rowKey]));
  const allCurrentPageSelected =
    displayData.length > 0 &&
    [...currentPageKeys].every((key) => selectedRows.has(key));

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className={tableClasses}>
          <thead>
            <tr>
              {selectable === "multiple" && (
                <th className="table-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={allCurrentPageSelected}
                    onChange={handleSelectAll}
                    aria-label={
                      paginated ? "현재 페이지 전체 선택" : "전체 선택"
                    }
                  />
                </th>
              )}
              {selectable === "single" && (
                <th className="table-checkbox-cell"></th>
              )}
              {columns.map((column) => {
                const isSortable = sortable && column.sortable !== false;
                const isFilterable =
                  filterable && column.filterable !== false;

                return (
                  <th key={String(column.key)} className="table-header-cell">
                    <div className="table-header-content">
                      <button
                        className={`table-header-button ${
                          isSortable ? "sortable" : ""
                        }`}
                        onClick={() => isSortable && handleSort(column.key)}
                        disabled={!isSortable}
                      >
                        {column.header}
                        {isSortable && sortKey === column.key && (
                          <span className="sort-indicator">
                            {sortOrder === "asc" ? " ▲" : " ▼"}
                          </span>
                        )}
                      </button>
                    </div>
                    {isFilterable && (
                      <input
                        type="text"
                        className="table-filter-input"
                        placeholder="필터..."
                        value={filters[String(column.key)] || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            String(column.key),
                            e.target.value
                          )
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="table-empty-cell"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayData.map((item, index) => {
                const itemKey = item[rowKey];
                const isSelected = selectedRows.has(itemKey);
                const globalIndex = paginated
                  ? (currentPage - 1) * pageSize + index
                  : index;

                return (
                  <tr
                    key={itemKey || index}
                    className={`table-row ${isSelected ? "selected" : ""} ${
                      zebra && globalIndex % 2 === 1 ? "zebra" : ""
                    }`}
                    onClick={() => selectable && handleRowSelect(item)}
                  >
                    {selectable && (
                      <td className="table-checkbox-cell">
                        <input
                          type={
                            selectable === "multiple" ? "checkbox" : "radio"
                          }
                          checked={isSelected}
                          onChange={() => handleRowSelect(item)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`행 ${globalIndex + 1} 선택`}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={String(column.key)} className="table-cell">
                        {column.render
                          ? column.render(item)
                          : String(item[column.key as keyof T] || "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {paginated && totalItems > 0 && (
        <div className="table-pagination">
          <div className="pagination-info">
            {showPageInfo && (
              <span className="pagination-text">
                {(currentPage - 1) * pageSize + 1}-
                {Math.min(currentPage * pageSize, totalItems)} / {totalItems}개
              </span>
            )}
            <select
              className="pagination-page-size"
              value={pageSize}
              onChange={(e) =>
                handlePageSizeChange(Number(e.target.value))
              }
              aria-label="페이지당 항목 수"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}개씩 보기
                </option>
              ))}
            </select>
          </div>

          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              aria-label="첫 페이지"
            >
              «
            </button>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="이전 페이지"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // 현재 페이지 기준 앞뒤 2페이지만 표시
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                );
              })
              .map((page, index, array) => {
                // ... 표시를 위한 로직
                const prevPage = array[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                  <div key={page} style={{ display: "flex", gap: "4px" }}>
                    {showEllipsis && (
                      <span className="pagination-ellipsis">...</span>
                    )}
                    <button
                      className={`pagination-button ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`${page}페이지`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}

            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="다음 페이지"
            >
              ›
            </button>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="마지막 페이지"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
