import { useEffect, useState } from "react";

/**
 * 미디어 쿼리 매칭 상태를 추적하는 훅
 * @param query - 미디어 쿼리 문자열 (예: "(min-width: 768px)")
 * @returns 미디어 쿼리가 매칭되는지 여부
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // 초기값 설정
    setMatches(mediaQuery.matches);

    // 이벤트 핸들러
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 이벤트 리스너 등록
    mediaQuery.addEventListener("change", handler);

    // 클린업
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}
