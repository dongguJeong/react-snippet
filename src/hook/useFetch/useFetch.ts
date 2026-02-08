import { useEffect, useState } from "react";

export function useFetch<T>(
  url: string,
  { method, body }: { method: string; body?: XMLHttpRequestBodyInit },
) {
  const [result, setResult] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [status, setStatus] = useState<number | undefined>();

  useEffect(() => {
    if (!url) return;
    const abortController = new AbortController();
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          signal: abortController.signal,
        });
        setOk(response.ok);
        setStatus(response.status);

        if (response.ok) {
          const data = await response.json();
          setResult(data);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [url, method, body]);
  return { ok, result, isLoading, status };
}
