# useInfiniteScroll

무한 스크롤을 구현하는 훅입니다. Intersection Observer API를 사용하여 마지막 요소가 보일 때 자동으로 다음 페이지를 로드합니다.

## 사용 방법

### 기본 사용법

```tsx
import { useState } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

interface Post {
  id: number;
  title: string;
  content: string;
}

function InfiniteScrollList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async () => {
    const response = await fetch(`https://api.example.com/posts?page=${page}`);
    const data = await response.json();

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }
  };

  const { loadMoreRef, isLoading } = useInfiniteScroll(fetchMore, hasMore);

  return (
    <div>
      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={index === posts.length - 1 ? loadMoreRef : null}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
      {isLoading && <div>로딩 중...</div>}
      {!hasMore && <div>더 이상 게시글이 없습니다</div>}
    </div>
  );
}
```

## 예시 1: AsyncBoundary와 함께 사용

```tsx
import { useState } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { AsyncBoundary } from "../../component/AsyncBoundary/AsyncBoundary";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async () => {
    const response = await fetch(`https://api.example.com/users?page=${page}`);
    const data = await response.json();

    if (data.users.length < 20) {
      setHasMore(false);
    }

    setUsers((prev) => [...prev, ...data.users]);
    setPage((prev) => prev + 1);
  };

  const { loadMoreRef, isLoading } = useInfiniteScroll(fetchMore, hasMore, {
    threshold: 0.5, // 요소가 50% 보일 때 트리거
  });

  return (
    <div>
      <h2>사용자 목록</h2>
      {users.map((user, index) => (
        <div
          key={user.id}
          ref={index === users.length - 1 ? loadMoreRef : null}
          style={{ padding: "16px", borderBottom: "1px solid #ddd" }}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
      {isLoading && <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>}
      {!hasMore && <div style={{ textAlign: "center", padding: "20px" }}>모든 사용자를 불러왔습니다</div>}
    </div>
  );
}
```

## 예시 2: 이미지 갤러리

```tsx
import { useState } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

interface Image {
  id: string;
  url: string;
  title: string;
}

function ImageGallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async () => {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=12`
    );
    const data = await response.json();

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setImages((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }
  };

  const { loadMoreRef, isLoading } = useInfiniteScroll(fetchMore, hasMore, {
    rootMargin: "200px", // 200px 전에 미리 로드
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      {images.map((image, index) => (
        <div
          key={image.id}
          ref={index === images.length - 1 ? loadMoreRef : null}
        >
          <img src={image.url} alt={image.title} style={{ width: "100%" }} />
        </div>
      ))}
      {isLoading && (
        <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px" }}>
          로딩 중...
        </div>
      )}
    </div>
  );
}
```

## 예시 3: 검색 결과 무한 스크롤

```tsx
import { useState, useEffect } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { useDebounce } from "../useDebounce/useDebounce";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // 검색어가 변경되면 리셋
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearchTerm]);

  const fetchMore = async () => {
    if (!debouncedSearchTerm) return;

    const response = await fetch(
      `https://api.example.com/search?q=${debouncedSearchTerm}&page=${page}`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      setHasMore(false);
    } else {
      setResults((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
    }
  };

  const { loadMoreRef, isLoading } = useInfiniteScroll(
    fetchMore,
    hasMore && !!debouncedSearchTerm
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
      />

      {results.map((result, index) => (
        <div
          key={result.id}
          ref={index === results.length - 1 ? loadMoreRef : null}
        >
          <h3>{result.title}</h3>
        </div>
      ))}

      {isLoading && <div>검색 중...</div>}
      {!hasMore && results.length > 0 && <div>검색 결과를 모두 불러왔습니다</div>}
    </div>
  );
}
```

## 매개변수

- `fetchMore`: `() => Promise<void>` - 다음 페이지를 가져오는 비동기 함수
- `hasMore`: `boolean` - 더 가져올 데이터가 있는지 여부
- `options`: `UseInfiniteScrollOptions` (선택사항)
  - `threshold`: `number` - 요소가 몇 % 보일 때 트리거할지 (0~1, 기본값: 0)
  - `rootMargin`: `string` - 미리 로드할 거리 (기본값: "0px")

## 반환값

- `loadMoreRef`: `(node: HTMLElement | null) => void` - 마지막 요소에 연결할 ref
- `isLoading`: `boolean` - 로딩 상태
- `hasMore`: `boolean` - 더 가져올 데이터가 있는지 여부

## 사용 팁

1. **마지막 요소에 ref 연결**: `index === items.length - 1 ? loadMoreRef : null`
2. **hasMore 상태 관리**: 데이터가 없으면 `setHasMore(false)`로 설정
3. **rootMargin 사용**: 미리 로드하려면 `rootMargin: "200px"` 설정
4. **검색과 함께 사용**: 검색어 변경 시 상태 리셋

## 장점

- Intersection Observer API 사용으로 성능 최적화
- 스크롤 이벤트 리스너 불필요
- 자동 cleanup
- 간단한 API
