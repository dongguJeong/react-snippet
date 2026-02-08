# AsyncBoundary

API 에러 처리와 로딩 스피너를 자동으로 처리하는 래퍼 컴포넌트입니다.

## 주요 기능

1. **ErrorBoundaryInner**: ErrorBoundary 패턴을 사용하여 API 에러를 catch하고 처리
2. **자동 로딩 처리**: `isLoading`이 true일 때 로딩 스피너 자동 표시
3. **자동 에러 처리**: `ok`가 false일 때 Error를 throw하여 ErrorBoundary가 처리
4. **타입 안전성**: 제네릭을 사용하여 타입 안전한 데이터 전달

## 사용 방법

### 방법 1: URL을 직접 전달 (간편한 방식)

AsyncBoundary에 URL과 메서드를 직접 전달하면 내부에서 자동으로 fetch를 실행합니다.

```tsx
import { AsyncBoundary } from "./AsyncBoundary";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserListPage() {
  return (
    <AsyncBoundary<User[]>
      url="https://jsonplaceholder.typicode.com/users"
      method="GET"
      loadingFallback={<div className="loading">사용자 로딩 중...</div>}
      errorFallback={(error) => (
        <div className="error">
          <h3>사용자 목록 로딩 실패</h3>
          <p>{error.message}</p>
        </div>
      )}
    >
      {(users) => (
        <div className="user-list">
          <h2>사용자 목록</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </AsyncBoundary>
  );
}
```

### 방법 2: useFetch 훅과 함께 사용 (세밀한 제어)

useFetch 훅을 직접 사용하고 그 결과를 AsyncBoundary에 전달하는 방식입니다.
여러 API를 조합하거나 조건부 fetch가 필요한 경우 유용합니다.

```tsx
import { AsyncBoundary } from "./AsyncBoundary";
import { useFetch } from "../../hook/useFetch/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserListPage() {
  const fetchResult = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    { method: "GET" }
  );

  return (
    <AsyncBoundary<User[]>
      fetchResult={fetchResult}
      loadingFallback={<div className="loading">사용자 로딩 중...</div>}
      errorFallback={(error) => (
        <div className="error">
          <h3>사용자 목록 로딩 실패</h3>
          <p>{error.message}</p>
        </div>
      )}
    >
      {(users) => (
        <div className="user-list">
          <h2>사용자 목록</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </AsyncBoundary>
  );
}
```

### 예시 3: POST 요청

```tsx
import { useState } from "react";
import { AsyncBoundary } from "./AsyncBoundary";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl("https://jsonplaceholder.typicode.com/posts");
  };

  if (!url) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">작성하기</button>
      </form>
    );
  }

  return (
    <AsyncBoundary<Post>
      url={url}
      method="POST"
      body={JSON.stringify({ title, body, userId: 1 })}
      loadingFallback={<div>게시글 작성 중...</div>}
    >
      {(post) => (
        <div className="success">
          <h3>작성 완료!</h3>
          <p>ID: {post.id}</p>
          <p>제목: {post.title}</p>
        </div>
      )}
    </AsyncBoundary>
  );
}
```

### 예시 4: 다중 API 호출 (useFetch와 함께)

```tsx
import { AsyncBoundary } from "./AsyncBoundary";
import { useFetch } from "../../hook/useFetch/useFetch";

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  userId: number;
}

function UserProfile({ userId }: { userId: number }) {
  const userFetch = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    { method: "GET" }
  );

  return (
    <AsyncBoundary<User> fetchResult={userFetch}>
      {(user) => (
        <div>
          <h2>{user.name}님의 프로필</h2>
          <UserPosts userId={userId} />
        </div>
      )}
    </AsyncBoundary>
  );
}

function UserPosts({ userId }: { userId: number }) {
  const postsFetch = useFetch<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    { method: "GET" }
  );

  return (
    <AsyncBoundary<Post[]> fetchResult={postsFetch}>
      {(posts) => (
        <div>
          <h3>작성한 게시글 ({posts.length}개)</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </AsyncBoundary>
  );
}
```

## Props

### 공통 Props

- `children`: `(data: T) => ReactNode` - 데이터를 받아 렌더링하는 함수
- `loadingFallback?`: `ReactNode` - 로딩 중 표시할 UI (기본값: "로딩 중...")
- `errorFallback?`: `ReactNode | ((error: Error) => ReactNode)` - 에러 발생 시 표시할 UI

### URL 방식 Props

- `url`: `string` - API 엔드포인트 URL
- `method`: `string` - HTTP 메서드 (GET, POST, PUT, DELETE 등)
- `body?`: `XMLHttpRequestBodyInit` - 요청 본문 (POST, PUT 등에 사용)

### useFetch 방식 Props

- `fetchResult`: useFetch 훅의 반환값
  - `result`: `T | undefined`
  - `isLoading`: `boolean`
  - `ok`: `boolean`
  - `status`: `number | undefined`

## 장점

- ErrorBoundary의 howToUse.md처럼 매번 `isLoading`과 `!ok` 체크를 수동으로 할 필요 없음
- AsyncBoundary로 감싸기만 하면 자동으로 로딩/에러 처리
- 타입 안전성 보장
- 두 가지 사용 방식으로 유연한 활용 가능
