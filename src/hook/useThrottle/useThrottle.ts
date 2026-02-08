import { useEffect, useRef, useState } from "react";

/**
 * 값의 변경을 throttle하는 훅
 * @param value - throttle할 값
 * @param interval - throttle 간격 (밀리초)
 * @returns throttled된 값
 */
export function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    if (timeSinceLastExecution >= interval) {
      // interval이 지났으면 즉시 업데이트
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      // interval이 지나지 않았으면 타이머 설정
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval - timeSinceLastExecution);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, interval]);

  return throttledValue;
}
