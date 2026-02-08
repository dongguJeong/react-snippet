### 예시 1

```jsx
import { ErrorBoundary } from "./ErrorBoundary";
import { useFetch } from "./useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const { result, isLoading, ok, status } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    { method: "GET" }
  );

  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!ok) {
    throw new Error(`API 요청 실패: ${status}`);
  }

  return (
    <div className="user-list">
      <h2>사용자 목록</h2>
      <ul>
        {result?.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UserListPage() {
  return (
    <ErrorBoundary>
      <UserList />
    </ErrorBoundary>
  );
}
```

### 예시 2 post

```jsx
import { useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { useFetch } from "./useFetch";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");

  const { result, isLoading, ok, status } = useFetch<Post>(url, {
    method: "POST",
    body: JSON.stringify({ title, body, userId: 1 }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl("https://jsonplaceholder.typicode.com/posts");
  };

  if (!ok && status) {
    throw new Error(`게시글 작성 실패: ${status}`);
  }

  return (
    <div className="create-post">
      <h2>게시글 작성</h2>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "작성 중..." : "작성하기"}
        </button>
      </form>

      {result && (
        <div className="success">
          <h3>작성 완료!</h3>
          <p>ID: {result.id}</p>
          <p>제목: {result.title}</p>
        </div>
      )}
    </div>
  );
}

export function CreatePostPage() {
  return (
    <ErrorBoundary fallback={<div>게시글 작성 중 오류가 발생했습니다.</div>}>
      <CreatePost />
    </ErrorBoundary>
  );
}
```

### 예시 3 다중 api

```jsx
import { ErrorBoundary } from "./ErrorBoundary";
import { useFetch } from "./useFetch";

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  userId: number;
}

function UserDashboard({ userId }: { userId: number }) {
  const userRequest = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    { method: "GET" }
  );

  const postsRequest = useFetch<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    { method: "GET" }
  );

  if (userRequest.isLoading || postsRequest.isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!userRequest.ok || !postsRequest.ok) {
    throw new Error("데이터 로딩 실패");
  }

  return (
    <div className="dashboard">
      <h2>{userRequest.result?.name}님의 대시보드</h2>
      <div className="posts">
        <h3>작성한 게시글 ({postsRequest.result?.length}개)</h3>
        <ul>
          {postsRequest.result?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DashboardPage() {
  return (
    <ErrorBoundary>
      <UserDashboard userId={1} />
    </ErrorBoundary>
  );
}

```

### 예시 4 전체 앱 구조

```jsx
import { ErrorBoundary } from "./ErrorBoundary";
import { UserListPage } from "./UserListPage";
import { CreatePostPage } from "./CreatePostPage";
import { DashboardPage } from "./DashboardPage";

function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className="app-error">
          <h1>앱에서 오류가 발생했습니다</h1>
          <button onClick={() => window.location.reload()}>
            페이지 새로고침
          </button>
        </div>
      }
    >
      <div className="app">
        <header>
          <h1>My App</h1>
        </header>
        <main>
          <ErrorBoundary>
            <UserListPage />
          </ErrorBoundary>

          <ErrorBoundary>
            <CreatePostPage />
          </ErrorBoundary>

          <ErrorBoundary>
            <DashboardPage />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
```
