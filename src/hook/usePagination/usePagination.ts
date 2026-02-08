import { useMemo, useState } from "react";

interface UsePaginationOptions {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
  siblingCount?: number; // 현재 페이지 양옆에 보여줄 페이지 수
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  pages: (number | string)[]; // 페이지 번호 배열 (... 포함)
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  startIndex: number;
  endIndex: number;
}

/**
 * 페이지네이션을 구현하는 훅
 * @param options - totalItems, itemsPerPage, initialPage, siblingCount
 * @returns 페이지네이션 관련 상태와 함수들
 */
export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
  siblingCount = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5; // 양옆 sibling + 처음/끝 + 현재 + 2개 dots

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return [];
  }, [totalPages, currentPage, siblingCount]);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    pages,
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    startIndex,
    endIndex,
  };
}
