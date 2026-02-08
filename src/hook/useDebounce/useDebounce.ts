import { useEffect, useState } from "react";

/**
 * 값의 변경을 지연시키는 훅
 * @param value - debounce할 값
 * @param delay - 지연 시간 (밀리초)
 * @returns debounced된 값
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 후에 값을 업데이트하는 타이머 설정
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 다음 effect 실행 전 또는 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
