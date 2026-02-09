import { useState, useCallback } from "react";

interface UseRandomNumberOptions {
  min?: number;
  max?: number;
  autoGenerate?: boolean;
}

interface UseRandomNumberReturn {
  randomNumber: number | null;
  generate: () => void;
  generateByDigits: (digits: number) => void;
  generateInRange: (min: number, max: number) => void;
  reset: () => void;
}

/**
 * 난수를 생성하는 훅
 * @param options - 옵션 객체
 * @param options.min - 최소값 (기본값: 0)
 * @param options.max - 최대값 (기본값: 100)
 * @param options.autoGenerate - 마운트 시 자동 생성 여부 (기본값: false)
 * @returns 난수 생성 관련 함수와 상태
 */
export function useRandomNumber(
  options: UseRandomNumberOptions = {}
): UseRandomNumberReturn {
  const { min = 0, max = 100, autoGenerate = false } = options;
  const [randomNumber, setRandomNumber] = useState<number | null>(
    autoGenerate ? Math.floor(Math.random() * (max - min + 1)) + min : null
  );

  /**
   * 기본 범위(min~max)에서 난수 생성
   */
  const generate = useCallback(() => {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(number);
  }, [min, max]);

  /**
   * 지정된 자릿수의 난수 생성
   * @param digits - 자릿수 (1~15)
   * @example
   * generateByDigits(3) // 100~999 사이의 난수
   * generateByDigits(5) // 10000~99999 사이의 난수
   */
  const generateByDigits = useCallback((digits: number) => {
    if (digits < 1) {
      console.warn("자릿수는 1 이상이어야 합니다.");
      return;
    }
    if (digits > 15) {
      console.warn("자릿수는 15 이하여야 합니다. (JavaScript Number 안전 범위)");
      return;
    }

    const minValue = digits === 1 ? 0 : Math.pow(10, digits - 1);
    const maxValue = Math.pow(10, digits) - 1;
    const number = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    setRandomNumber(number);
  }, []);

  /**
   * 지정된 범위에서 난수 생성
   * @param rangeMin - 최소값
   * @param rangeMax - 최대값
   */
  const generateInRange = useCallback((rangeMin: number, rangeMax: number) => {
    if (rangeMin >= rangeMax) {
      console.warn("최소값은 최대값보다 작아야 합니다.");
      return;
    }
    const number = Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;
    setRandomNumber(number);
  }, []);

  /**
   * 난수 초기화
   */
  const reset = useCallback(() => {
    setRandomNumber(null);
  }, []);

  return {
    randomNumber,
    generate,
    generateByDigits,
    generateInRange,
    reset,
  };
}
