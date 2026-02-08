import { Component, type ReactNode } from "react";
import { useFetch } from "../../hook/useFetch/useFetch";

// URL을 직접 전달하는 방식
interface AsyncBoundaryPropsWithUrl<T> {
  url: string;
  method: string;
  body?: XMLHttpRequestBodyInit;
  children: (data: T) => ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode | ((error: Error) => ReactNode);
}

// useFetch 결과를 전달하는 방식
interface AsyncBoundaryPropsWithFetchResult<T> {
  fetchResult: {
    result: T | undefined;
    isLoading: boolean;
    ok: boolean;
    status: number | undefined;
  };
  children: (data: T) => ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode | ((error: Error) => ReactNode);
}

type AsyncBoundaryProps<T> =
  | AsyncBoundaryPropsWithUrl<T>
  | AsyncBoundaryPropsWithFetchResult<T>;

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryInnerProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
}

class ErrorBoundaryInner extends Component<
  ErrorBoundaryInnerProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryInnerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("AsyncBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback(this.state.error);
      }

      return (
        this.props.fallback || (
          <div className="error-container">
            <h3>오류가 발생했습니다</h3>
            <p>{this.state.error.message}</p>
            <button onClick={() => this.setState({ hasError: false })}>
              다시 시도
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

function AsyncBoundaryContent<T>({
  url,
  method,
  body,
  children,
  loadingFallback,
}: {
  url: string;
  method: string;
  body?: XMLHttpRequestBodyInit;
  children: (data: T) => ReactNode;
  loadingFallback: ReactNode;
}) {
  const { result, isLoading, ok, status } = useFetch<T>(url, { method, body });

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!ok) {
    throw new Error(`API 요청 실패: ${status}`);
  }

  if (!result) {
    return null;
  }

  return <>{children(result)}</>;
}

function AsyncBoundaryWithFetchResult<T>({
  fetchResult,
  children,
  loadingFallback,
}: {
  fetchResult: {
    result: T | undefined;
    isLoading: boolean;
    ok: boolean;
    status: number | undefined;
  };
  children: (data: T) => ReactNode;
  loadingFallback: ReactNode;
}) {
  const { result, isLoading, ok, status } = fetchResult;

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!ok) {
    throw new Error(`API 요청 실패: ${status}`);
  }

  if (!result) {
    return null;
  }

  return <>{children(result)}</>;
}

export function AsyncBoundary<T>(props: AsyncBoundaryProps<T>) {
  const {
    children,
    loadingFallback = <div className="loading">로딩 중...</div>,
    errorFallback,
  } = props;

  // useFetch 결과를 직접 전달받는 경우
  if ("fetchResult" in props) {
    return (
      <ErrorBoundaryInner fallback={errorFallback}>
        <AsyncBoundaryWithFetchResult
          fetchResult={props.fetchResult}
          loadingFallback={loadingFallback}
        >
          {children}
        </AsyncBoundaryWithFetchResult>
      </ErrorBoundaryInner>
    );
  }

  // URL을 전달받는 경우
  return (
    <ErrorBoundaryInner fallback={errorFallback}>
      <AsyncBoundaryContent
        url={props.url}
        method={props.method}
        body={props.body}
        loadingFallback={loadingFallback}
      >
        {children}
      </AsyncBoundaryContent>
    </ErrorBoundaryInner>
  );
}
