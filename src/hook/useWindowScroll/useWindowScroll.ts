import { useEffect, useState } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * 윈도우 스크롤 위치를 추적하는 훅
 * @returns 현재 스크롤 위치 {x, y}
 */
export function useWindowScroll(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: typeof window !== "undefined" ? window.scrollX : 0,
    y: typeof window !== "undefined" ? window.scrollY : 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    // 초기값 설정
    handleScroll();

    // 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 클린업
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}
