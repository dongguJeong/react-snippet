import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number; // 하단에서 몇 px 떨어진 지점에서 트리거할지
  rootMargin?: string; // Intersection Observer의 rootMargin
}

interface UseInfiniteScrollReturn {
  loadMoreRef: (node: HTMLElement | null) => void;
  isLoading: boolean;
  hasMore: boolean;
}

/**
 * 무한 스크롤을 구현하는 훅
 * @param fetchMore - 다음 페이지를 가져오는 함수
 * @param hasMore - 더 가져올 데이터가 있는지 여부
 * @param options - threshold, rootMargin 옵션
 * @returns loadMoreRef - 마지막 요소에 연결할 ref, isLoading - 로딩 상태
 */
export function useInfiniteScroll(
  fetchMore: () => Promise<void>,
  hasMore: boolean,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn {
  const { threshold = 0, rootMargin = "0px" } = options;
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            setIsLoading(true);
            fetchMore().finally(() => {
              setIsLoading(false);
            });
          }
        },
        { threshold, rootMargin }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchMore, threshold, rootMargin]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { loadMoreRef, isLoading, hasMore };
}
