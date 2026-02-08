import { useEffect, useState, useRef } from "react";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface UseFetchOptions {
  method: string;
  body?: XMLHttpRequestBodyInit;
  headers?: HeadersInit;
  cache?: boolean;
  cacheTime?: number; // 캐시 유효 시간 (밀리초)
  refetchOnMount?: boolean;
  enabled?: boolean;
}

interface UseFetchResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
  status: number | undefined;
  refetch: () => void;
  clearCache: () => void;
}

// 메모리 캐시 저장소
const memoryCache = new Map<string, CacheEntry<unknown>>();

// 캐시 키 생성
function getCacheKey(url: string, options: UseFetchOptions): string {
  const { method, body } = options;
  return `${method}:${url}:${body ? JSON.stringify(body) : ""}`;
}

// 캐시에서 데이터 가져오기
function getFromCache<T>(cacheKey: string, cacheTime: number): T | null {
  const cached = memoryCache.get(cacheKey) as CacheEntry<T> | undefined;

  if (!cached) return null;

  const now = Date.now();
  const isExpired = now - cached.timestamp > cacheTime;

  if (isExpired) {
    memoryCache.delete(cacheKey);
    return null;
  }

  return cached.data;
}

// 캐시에 데이터 저장
function saveToCache<T>(cacheKey: string, data: T): void {
  memoryCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
}

export function useFetchWithCache<T>(
  url: string,
  options: UseFetchOptions
): UseFetchResult<T> {
  const {
    method,
    body,
    headers,
    cache = false,
    cacheTime = 5 * 60 * 1000, // 기본 5분
    refetchOnMount = false,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [status, setStatus] = useState<number | undefined>();

  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheKey = getCacheKey(url, options);

  const fetchData = async () => {
    if (!url || !enabled) return;

    // 캐시 확인
    if (cache) {
      const cachedData = getFromCache<T>(cacheKey, cacheTime);
      if (cachedData) {
        setData(cachedData);
        setIsLoading(false);
        setIsError(false);
        return;
      }
    }

    // 이전 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setIsError(false);
    setError(undefined);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal: abortControllerRef.current.signal,
      });

      setStatus(response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);

      // 캐시 저장
      if (cache) {
        saveToCache(cacheKey, result);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setIsError(true);
        setError(err);
        console.error("Fetch error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, method, body, enabled]);

  // refetchOnMount가 true이면 마운트 시 항상 새로 fetch
  useEffect(() => {
    if (refetchOnMount && enabled) {
      fetchData();
    }
  }, []);

  const clearCache = () => {
    memoryCache.delete(cacheKey);
  };

  return {
    data,
    isLoading,
    isError,
    error,
    status,
    refetch: fetchData,
    clearCache,
  };
}

// 전체 캐시 클리어 유틸리티
export function clearAllCache(): void {
  memoryCache.clear();
}

// 특정 패턴의 캐시 클리어
export function clearCacheByPattern(pattern: string): void {
  for (const key of memoryCache.keys()) {
    if (key.includes(pattern)) {
      memoryCache.delete(key);
    }
  }
}
