import { useEffect, useState, useRef } from "react";

// axios 타입을 직접 정의 (axios 설치가 안되어 있을 수 있으므로)
interface AxiosRequestConfig {
  method?: string;
  url?: string;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

interface AxiosResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}

interface AxiosError<T = unknown> {
  message: string;
  code?: string;
  config?: AxiosRequestConfig;
  request?: unknown;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
}

// axios 함수 타입 (실제 axios import를 대체)
type AxiosInstance = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface UseAxiosOptions<TData = unknown> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  cache?: boolean;
  cacheTime?: number;
  refetchOnMount?: boolean;
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: AxiosError) => void;
}

interface UseAxiosResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | undefined;
  status: number | undefined;
  refetch: () => void;
  clearCache: () => void;
}

// 메모리 캐시
const axiosCache = new Map<string, CacheEntry<unknown>>();

// 캐시 키 생성
function getCacheKey(url: string, options: UseAxiosOptions): string {
  const { method = "GET", data, params } = options;
  const paramsStr = params ? JSON.stringify(params) : "";
  const dataStr = data ? JSON.stringify(data) : "";
  return `${method}:${url}:${paramsStr}:${dataStr}`;
}

// 캐시에서 데이터 가져오기
function getFromCache<T>(cacheKey: string, cacheTime: number): T | null {
  const cached = axiosCache.get(cacheKey) as CacheEntry<T> | undefined;

  if (!cached) return null;

  const now = Date.now();
  const isExpired = now - cached.timestamp > cacheTime;

  if (isExpired) {
    axiosCache.delete(cacheKey);
    return null;
  }

  return cached.data;
}

// 캐시에 데이터 저장
function saveToCache<T>(cacheKey: string, data: T): void {
  axiosCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Axios를 사용하는 훅
 * @param url - 요청 URL
 * @param options - 요청 옵션
 * @param axiosInstance - axios 인스턴스 (선택사항)
 *
 * 사용 전에 axios를 설치하세요: npm install axios
 *
 * @example
 * import axios from 'axios';
 *
 * const { data, isLoading } = useAxios('/api/users', {
 *   method: 'GET',
 *   cache: true
 * }, axios);
 */
export function useAxios<T>(
  url: string,
  options: UseAxiosOptions<T> = {},
  axiosInstance?: AxiosInstance
): UseAxiosResult<T> {
  const {
    method = "GET",
    data: requestData,
    params,
    headers,
    cache = false,
    cacheTime = 5 * 60 * 1000,
    refetchOnMount = false,
    enabled = true,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<AxiosError | undefined>();
  const [status, setStatus] = useState<number | undefined>();

  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheKey = getCacheKey(url, options);

  const fetchData = async () => {
    if (!url || !enabled) return;

    if (!axiosInstance) {
      console.error(
        "axios instance is required. Please pass axios as the third parameter."
      );
      return;
    }

    // 캐시 확인
    if (cache && method === "GET") {
      const cachedData = getFromCache<T>(cacheKey, cacheTime);
      if (cachedData) {
        setData(cachedData);
        setIsLoading(false);
        setIsError(false);
        onSuccess?.(cachedData);
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
      const response = await axiosInstance({
        method,
        url,
        data: requestData,
        params,
        headers,
        signal: abortControllerRef.current.signal,
      });

      setStatus(response.status);
      setData(response.data);

      // GET 요청만 캐시
      if (cache && method === "GET") {
        saveToCache(cacheKey, response.data);
      }

      onSuccess?.(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.code !== "ERR_CANCELED") {
        setIsError(true);
        setError(axiosError);
        setStatus(axiosError.response?.status);
        onError?.(axiosError);
        console.error("Axios error:", axiosError);
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
  }, [url, method, requestData, params, enabled]);

  useEffect(() => {
    if (refetchOnMount && enabled) {
      fetchData();
    }
  }, []);

  const clearCache = () => {
    axiosCache.delete(cacheKey);
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

// 전체 캐시 클리어
export function clearAllAxiosCache(): void {
  axiosCache.clear();
}

// 패턴으로 캐시 클리어
export function clearAxiosCacheByPattern(pattern: string): void {
  for (const key of axiosCache.keys()) {
    if (key.includes(pattern)) {
      axiosCache.delete(key);
    }
  }
}

// Axios 인스턴스 생성 헬퍼 (타입만 제공)
export interface CreateAxiosDefaults {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * 사용 예시:
 *
 * import axios from 'axios';
 *
 * const api = axios.create({
 *   baseURL: 'https://api.example.com',
 *   timeout: 10000,
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 *
 * const { data } = useAxios('/users', { method: 'GET' }, api);
 */
