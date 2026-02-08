# useAxios

Axios를 사용하는 훅입니다. 캐싱, 인터셉터, 타임아웃 등 Axios의 모든 기능을 활용할 수 있습니다.

## 설치

```bash
npm install axios
```

## 사용 방법

### 기본 사용법

```tsx
import axios from "axios";
import { useAxios } from "./useAxios";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile() {
  const { data, isLoading, isError, error } = useAxios<User>(
    "/users/1",
    { method: "GET" },
    axios
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러: {error?.message}</div>;

  return (
    <div>
      <h2>{data?.name}</h2>
      <p>{data?.email}</p>
    </div>
  );
}
```

## 예시 1: Axios 인스턴스 생성

```tsx
import axios from "axios";
import { useAxios } from "./useAxios";

// API 클라이언트 생성
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인터셉터 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 로그아웃 처리
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 사용
function UserList() {
  const { data, isLoading } = useAxios<User[]>(
    "/users",
    { method: "GET" },
    api
  );

  return (
    <div>
      {isLoading && <div>로딩 중...</div>}
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 예시 2: 캐싱 활성화

```tsx
import axios from "axios";
import { useAxios } from "./useAxios";

const api = axios.create({ baseURL: "https://api.example.com" });

function CachedUserList() {
  const { data, isLoading } = useAxios<User[]>(
    "/users",
    {
      method: "GET",
      cache: true, // 캐싱 활성화
      cacheTime: 5 * 60 * 1000, // 5분
    },
    api
  );

  // 캐시가 있으면 즉시 반환, 없으면 API 호출

  return (
    <div>
      {isLoading && <div>로딩 중...</div>}
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 예시 3: POST 요청

```tsx
import axios from "axios";
import { useState } from "react";
import { useAxios } from "./useAxios";

const api = axios.create({ baseURL: "https://api.example.com" });

function CreateUser() {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const { data, isLoading, isError } = useAxios(
    "/users",
    {
      method: "POST",
      data: userData,
      enabled: shouldSubmit, // 조건부 실행
    },
    api
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShouldSubmit(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <input
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "생성 중..." : "생성"}
      </button>

      {isError && <div>에러 발생</div>}
      {data && <div>생성 완료!</div>}
    </form>
  );
}
```

## 예시 4: Query Parameters

```tsx
import axios from "axios";
import { useState } from "react";
import { useAxios } from "./useAxios";

const api = axios.create({ baseURL: "https://api.example.com" });

function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useAxios<User[]>(
    "/users",
    {
      method: "GET",
      params: {
        search: searchTerm,
        limit: 10,
        sort: "name",
      },
      enabled: searchTerm.length > 0,
    },
    api
  );

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색..."
      />

      {isLoading && <div>검색 중...</div>}
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 예시 5: 수동 새로고침

```tsx
import axios from "axios";
import { useAxios } from "./useAxios";
import { Button } from "../../component/Button/Button";

const api = axios.create({ baseURL: "https://api.example.com" });

function RefetchExample() {
  const { data, isLoading, refetch } = useAxios<User[]>(
    "/users",
    { method: "GET", cache: true },
    api
  );

  return (
    <div>
      <Button onClick={refetch} loading={isLoading}>
        새로고침
      </Button>

      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 예시 6: Success/Error 콜백

```tsx
import axios from "axios";
import { useAxios } from "./useAxios";

const api = axios.create({ baseURL: "https://api.example.com" });

function UserWithCallbacks() {
  const { data } = useAxios<User>(
    "/users/1",
    {
      method: "GET",
      onSuccess: (data) => {
        console.log("데이터 로드 성공:", data);
        // 분석 이벤트 전송, 알림 표시 등
      },
      onError: (error) => {
        console.error("에러 발생:", error);
        // 에러 로깅, 사용자에게 알림 등
      },
    },
    api
  );

  return <div>{data?.name}</div>;
}
```

## 예시 7: 전역 캐시 관리

```tsx
import axios from "axios";
import {
  useAxios,
  clearAllAxiosCache,
  clearAxiosCacheByPattern,
} from "./useAxios";

const api = axios.create({ baseURL: "https://api.example.com" });

function CacheManagement() {
  return (
    <div>
      <button onClick={clearAllAxiosCache}>
        전체 캐시 삭제
      </button>

      <button onClick={() => clearAxiosCacheByPattern("/users")}>
        사용자 캐시만 삭제
      </button>
    </div>
  );
}
```

## 예시 8: 인증 토큰 관리

```tsx
import axios, { AxiosError } from "axios";
import { useAxios } from "./useAxios";

const api = axios.create({
  baseURL: "https://api.example.com",
});

// 요청 인터셉터: 토큰 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 토큰 갱신
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      // 토큰 갱신
      const refreshToken = localStorage.getItem("refresh_token");
      const { data } = await axios.post("/auth/refresh", { refreshToken });

      localStorage.setItem("access_token", data.accessToken);

      // 원래 요청 재시도
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

function ProtectedData() {
  const { data, isLoading } = useAxios<ProtectedData>(
    "/protected-data",
    { method: "GET" },
    api
  );

  return <div>{data?.value}</div>;
}
```

## 예시 9: 파일 업로드

```tsx
import axios from "axios";
import { useState } from "react";
import { useAxios } from "./useAxios";

const api = axios.create({ baseURL: "https://api.example.com" });

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [shouldUpload, setShouldUpload] = useState(false);

  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }

  const { data, isLoading, error } = useAxios(
    "/upload",
    {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      enabled: shouldUpload,
    },
    api
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      setShouldUpload(true);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || isLoading}>
        {isLoading ? "업로드 중..." : "업로드"}
      </button>

      {error && <div>에러: {error.message}</div>}
      {data && <div>업로드 완료!</div>}
    </div>
  );
}
```

## Options

- `method`: `"GET" | "POST" | "PUT" | "DELETE" | "PATCH"` (기본값: "GET")
- `data`: `unknown` (선택사항) - 요청 본문
- `params`: `Record<string, unknown>` (선택사항) - URL 쿼리 파라미터
- `headers`: `Record<string, string>` (선택사항) - 요청 헤더
- `cache`: `boolean` (기본값: false) - 캐싱 활성화 (GET만)
- `cacheTime`: `number` (기본값: 300000) - 캐시 유효 시간
- `refetchOnMount`: `boolean` (기본값: false) - 마운트 시 항상 새로 fetch
- `enabled`: `boolean` (기본값: true) - 요청 활성화 여부
- `onSuccess`: `(data: T) => void` (선택사항) - 성공 콜백
- `onError`: `(error: AxiosError) => void` (선택사항) - 에러 콜백

## Return Value

- `data`: `T | undefined` - 응답 데이터
- `isLoading`: `boolean` - 로딩 상태
- `isError`: `boolean` - 에러 발생 여부
- `error`: `AxiosError | undefined` - Axios 에러 객체
- `status`: `number | undefined` - HTTP 상태 코드
- `refetch`: `() => void` - 수동 재요청
- `clearCache`: `() => void` - 캐시 삭제

## Axios vs Fetch 비교

### Axios 장점
- 자동 JSON 변환
- 요청/응답 인터셉터
- 요청 취소 (자동)
- 진행 상황 추적
- XSRF 보호
- 타임아웃 설정 간편

### Fetch 장점
- 브라우저 내장 (번들 크기 작음)
- 표준 API
- 스트림 API 지원

## 유틸리티 함수

- `clearAllAxiosCache()`: 전체 캐시 삭제
- `clearAxiosCacheByPattern(pattern: string)`: 패턴 매칭 캐시 삭제

## 주의사항

- axios 패키지 설치 필수
- GET 요청만 캐싱됨
- 캐시는 메모리에 저장 (새로고침 시 초기화)
- 민감한 데이터는 캐싱하지 말 것

## 장점

- Axios의 모든 기능 활용
- 인터셉터로 전역 설정
- 타입 안전성
- 캐싱 지원
- Success/Error 콜백
