# useThrottle

값의 변경을 throttle하는 훅입니다. 일정 시간 간격으로만 값을 업데이트하여 성능을 최적화할 때 유용합니다.

## useDebounce vs useThrottle

- **useDebounce**: 마지막 호출 이후 일정 시간이 지나야 실행 (입력이 끝날 때까지 기다림)
- **useThrottle**: 일정 시간 간격으로 주기적으로 실행 (연속적인 업데이트)

## 사용 방법

### 기본 사용법

```tsx
import { useThrottle } from "./useThrottle";
import { useState } from "react";

function ScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 500);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div>스크롤 위치: {throttledScrollY}px</div>;
}
```

## 예시 1: 무한 스크롤

```tsx
import { useEffect, useState } from "react";
import { useThrottle } from "./useThrottle";

interface Post {
  id: number;
  title: string;
}

function InfiniteScroll() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 300);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (throttledScrollY + clientHeight >= scrollHeight - 100) {
      // 하단에 도달하면 다음 페이지 로드
      fetch(`https://api.example.com/posts?page=${page}`)
        .then((res) => res.json())
        .then((newPosts) => {
          setPosts((prev) => [...prev, ...newPosts]);
          setPage((prev) => prev + 1);
        });
    }
  }, [throttledScrollY, page]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## 예시 2: 실시간 검색 (Throttle)

```tsx
import { useState } from "react";
import { useThrottle } from "./useThrottle";
import { useFetch } from "../useFetch/useFetch";

function ThrottledSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const throttledSearchTerm = useThrottle(searchTerm, 500);

  const { result, isLoading } = useFetch(
    throttledSearchTerm
      ? `https://api.example.com/search?q=${throttledSearchTerm}`
      : "",
    { method: "GET" }
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어 입력 (0.5초마다 검색)"
      />
      {isLoading && <div>검색 중...</div>}
      {result && <div>결과: {JSON.stringify(result)}</div>}
    </div>
  );
}
```

## 예시 3: 윈도우 리사이즈

```tsx
import { useEffect, useState } from "react";
import { useThrottle } from "./useThrottle";

function ResponsiveComponent() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const throttledWidth = useThrottle(windowWidth, 200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <p>현재 너비: {throttledWidth}px</p>
      {throttledWidth < 768 ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

## 예시 4: 마우스 추적

```tsx
import { useState } from "react";
import { useThrottle } from "./useThrottle";

function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const throttledPosition = useThrottle(mousePosition, 100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <p>마우스 위치: ({throttledPosition.x}, {throttledPosition.y})</p>
      <div
        style={{
          position: "fixed",
          left: throttledPosition.x,
          top: throttledPosition.y,
          width: "20px",
          height: "20px",
          backgroundColor: "red",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
```

## 예시 5: 드래그 앤 드롭

```tsx
import { useState } from "react";
import { useThrottle } from "./useThrottle";

function DraggableBox() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const throttledPosition = useThrottle(position, 50);

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        position: "fixed",
        left: throttledPosition.x,
        top: throttledPosition.y,
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      드래그하세요
    </div>
  );
}
```

## 예시 6: 스크롤 진행률

```tsx
import { useEffect, useState } from "react";
import { useThrottle } from "./useThrottle";

function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const throttledProgress = useThrottle(scrollProgress, 100);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "4px",
        width: `${throttledProgress}%`,
        backgroundColor: "#007bff",
        transition: "width 0.1s",
      }}
    />
  );
}
```

## 예시 7: 실시간 입력 카운터

```tsx
import { useState } from "react";
import { useThrottle } from "./useThrottle";

function CharacterCounter() {
  const [text, setText] = useState("");
  const throttledText = useThrottle(text, 300);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="입력하세요"
        rows={5}
        style={{ width: "100%" }}
      />
      <p>현재 글자 수: {text.length}</p>
      <p>업데이트된 글자 수 (0.3초마다): {throttledText.length}</p>
    </div>
  );
}
```

## 매개변수

- `value`: `T` - throttle할 값
- `interval`: `number` - throttle 간격 (밀리초, 기본값: 500)

## 반환값

- `throttledValue`: `T` - interval 간격으로 업데이트되는 값

## 동작 원리

1. interval이 지났으면 즉시 값을 업데이트
2. interval이 지나지 않았으면 남은 시간 후에 업데이트
3. 연속적인 이벤트에서 일정 간격으로 값을 반영

## 사용 시나리오

- **스크롤 이벤트**: 스크롤 위치 추적, 무한 스크롤
- **리사이즈 이벤트**: 윈도우 크기 변경 감지
- **마우스 이벤트**: 마우스 추적, 드래그 앤 드롭
- **실시간 검색**: 연속적인 API 호출 제한
- **애니메이션**: 프레임 제어

## Debounce vs Throttle 선택 가이드

### Debounce 사용
- 검색 입력 (사용자가 입력을 완료할 때까지 기다림)
- 자동 저장 (마지막 변경 후 저장)
- 폼 검증 (입력이 끝난 후 검증)

### Throttle 사용
- 스크롤 이벤트 (연속적인 업데이트 필요)
- 리사이즈 이벤트 (실시간 반응 필요)
- 무한 스크롤 (주기적인 체크)
- 마우스 추적 (부드러운 애니메이션)

## 장점

- 성능 최적화
- API 호출 횟수 감소
- 부드러운 사용자 경험
- 서버 부하 감소
