# useFetchWithCache

캐싱 기능을 지원하는 fetch 훅입니다. 기존 useFetch를 확장하여 메모리 캐시, 자동 갱신, 캐시 무효화 등을 제공합니다.

## 사용 방법

### 기본 사용법 (캐싱 없이)

```tsx
import { useFetchWithCache } from "./useFetchWithCache";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile() {
  const { data, isLoading, isError, error } = useFetchWithCache<User>(
    "https://api.example.com/user/1",
    { method: "GET" }
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

## 예시 1: 캐싱 활성화

```tsx
import { useFetchWithCache } from "./useFetchWithCache";

function CachedUserList() {
  const { data, isLoading } = useFetchWithCache<User[]>(
    "https://api.example.com/users",
    {
      method: "GET",
      cache: true, // 캐싱 활성화
      cacheTime: 5 * 60 * 1000, // 5분 (기본값)
    }
  );

  // 첫 로드: API 호출
  // 이후 5분 이내 재렌더링: 캐시에서 즉시 반환
  // 5분 이후: 캐시 만료, 새로 API 호출

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

## 예시 2: 수동 새로고침

```tsx
import { useFetchWithCache } from "./useFetchWithCache";
import { Button } from "../../component/Button/Button";

function RefetchExample() {
  const { data, isLoading, refetch } = useFetchWithCache<User[]>(
    "https://api.example.com/users",
    {
      method: "GET",
      cache: true,
    }
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

## 예시 3: 캐시 무효화

```tsx
import { useFetchWithCache } from "./useFetchWithCache";
import { Button } from "../../component/Button/Button";

function CacheClearExample() {
  const { data, clearCache } = useFetchWithCache<User[]>(
    "https://api.example.com/users",
    {
      method: "GET",
      cache: true,
      cacheTime: 10 * 60 * 1000, // 10분
    }
  );

  const handleUpdate = async () => {
    // 데이터 업데이트 후 캐시 무효화
    await fetch("https://api.example.com/users/1", {
      method: "PUT",
      body: JSON.stringify({ name: "New Name" }),
    });

    clearCache(); // 캐시 삭제
  };

  return (
    <div>
      <Button onClick={handleUpdate}>업데이트</Button>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 예시 4: 조건부 fetch (enabled)

```tsx
import { useState } from "react";
import { useFetchWithCache } from "./useFetchWithCache";

function ConditionalFetch() {
  const [userId, setUserId] = useState<number | null>(null);

  const { data, isLoading } = useFetchWithCache<User>(
    `https://api.example.com/users/${userId}`,
    {
      method: "GET",
      enabled: userId !== null, // userId가 있을 때만 fetch
    }
  );

  return (
    <div>
      <button onClick={() => setUserId(1)}>사용자 1 로드</button>
      <button onClick={() => setUserId(2)}>사용자 2 로드</button>

      {isLoading && <div>로딩 중...</div>}
      {data && <div>{data.name}</div>}
    </div>
  );
}
```

## 예시 5: POST 요청 (캐싱 안 함)

```tsx
import { useState } from "react";
import { useFetchWithCache } from "./useFetchWithCache";

function CreatePost() {
  const [url, setUrl] = useState("");
  const [postData, setPostData] = useState({ title: "", body: "" });

  const { data, isLoading, isError } = useFetchWithCache(
    url,
    {
      method: "POST",
      body: JSON.stringify(postData),
      cache: false, // POST는 캐싱하지 않음
    }
  );

  const handleSubmit = () => {
    setUrl("https://api.example.com/posts");
  };

  return (
    <div>
      <input
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <button onClick={handleSubmit}>제출</button>

      {isLoading && <div>전송 중...</div>}
      {isError && <div>에러 발생</div>}
      {data && <div>작성 완료!</div>}
    </div>
  );
}
```

## 예시 6: 전역 캐시 관리

```tsx
import {
  useFetchWithCache,
  clearAllCache,
  clearCacheByPattern,
} from "./useFetchWithCache";

function CacheManagement() {
  return (
    <div>
      {/* 전체 캐시 삭제 */}
      <button onClick={clearAllCache}>
        전체 캐시 삭제
      </button>

      {/* 특정 패턴의 캐시 삭제 */}
      <button onClick={() => clearCacheByPattern("/users")}>
        사용자 캐시만 삭제
      </button>
    </div>
  );
}
```

## 예시 7: 다중 요청 with 캐싱

```tsx
import { useFetchWithCache } from "./useFetchWithCache";

function Dashboard() {
  const users = useFetchWithCache<User[]>(
    "https://api.example.com/users",
    { method: "GET", cache: true, cacheTime: 5 * 60 * 1000 }
  );

  const posts = useFetchWithCache<Post[]>(
    "https://api.example.com/posts",
    { method: "GET", cache: true, cacheTime: 10 * 60 * 1000 }
  );

  const stats = useFetchWithCache<Stats>(
    "https://api.example.com/stats",
    { method: "GET", cache: true, cacheTime: 1 * 60 * 1000 } // 1분
  );

  if (users.isLoading || posts.isLoading || stats.isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <div>사용자: {users.data?.length}명</div>
      <div>게시글: {posts.data?.length}개</div>
      <div>방문자: {stats.data?.visitors}명</div>
    </div>
  );
}
```

## 예시 8: refetchOnMount

```tsx
import { useFetchWithCache } from "./useFetchWithCache";

function AlwaysFreshData() {
  const { data, isLoading } = useFetchWithCache<User[]>(
    "https://api.example.com/users",
    {
      method: "GET",
      cache: true,
      refetchOnMount: true, // 마운트 시 항상 새로 fetch
    }
  );

  // 캐시가 있어도 컴포넌트가 마운트될 때마다 새로 fetch

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

## 예시 9: AsyncBoundary와 함께 사용

```tsx
import { useFetchWithCache } from "./useFetchWithCache";
import { AsyncBoundary } from "../../component/AsyncBoundary/AsyncBoundary";

function UserListWithCache() {
  return (
    <AsyncBoundary
      url="https://api.example.com/users"
      method="GET"
    >
      {(users: User[]) => (
        <UserList users={users} />
      )}
    </AsyncBoundary>
  );
}

// 또는 직접 사용
function UserListDirect() {
  const { data, isLoading, isError, error } = useFetchWithCache<User[]>(
    "https://api.example.com/users",
    { method: "GET", cache: true }
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) throw error;

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Options

- `method`: `string` (필수) - HTTP 메서드
- `body`: `XMLHttpRequestBodyInit` (선택사항) - 요청 본문
- `headers`: `HeadersInit` (선택사항) - 요청 헤더
- `cache`: `boolean` (기본값: false) - 캐싱 활성화
- `cacheTime`: `number` (기본값: 300000, 5분) - 캐시 유효 시간 (밀리초)
- `refetchOnMount`: `boolean` (기본값: false) - 마운트 시 항상 새로 fetch
- `enabled`: `boolean` (기본값: true) - fetch 활성화 여부

## Return Value

- `data`: `T | undefined` - 응답 데이터
- `isLoading`: `boolean` - 로딩 상태
- `isError`: `boolean` - 에러 발생 여부
- `error`: `Error | undefined` - 에러 객체
- `status`: `number | undefined` - HTTP 상태 코드
- `refetch`: `() => void` - 수동으로 다시 fetch
- `clearCache`: `() => void` - 현재 요청의 캐시 삭제

## 유틸리티 함수

- `clearAllCache()`: 전체 캐시 삭제
- `clearCacheByPattern(pattern: string)`: 특정 패턴의 캐시 삭제

## 캐시 동작 방식

1. **캐시 키**: URL + method + body로 생성
2. **캐시 저장**: GET 요청 성공 시 메모리에 저장
3. **캐시 조회**: 동일한 요청 시 캐시에서 먼저 확인
4. **캐시 만료**: cacheTime 경과 후 자동 삭제
5. **메모리 캐시**: 페이지 새로고침 시 초기화

## 장점

- 불필요한 API 호출 감소
- 빠른 응답 속도
- 네트워크 사용량 감소
- 유연한 캐시 관리
- 기존 useFetch와 호환

## 주의사항

- POST/PUT/DELETE 요청은 캐싱하지 않는 것을 권장
- 캐시는 메모리에 저장되므로 페이지 새로고침 시 초기화
- 민감한 데이터는 캐싱하지 말 것
