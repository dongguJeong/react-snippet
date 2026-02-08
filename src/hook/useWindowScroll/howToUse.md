# useWindowScroll

윈도우 스크롤 위치를 추적하는 훅입니다. 스크롤 기반 UI나 애니메이션을 구현할 때 유용합니다.

## 사용 방법

### 기본 사용법

```tsx
import { useWindowScroll } from "./useWindowScroll";

function ScrollIndicator() {
  const { x, y } = useWindowScroll();

  return (
    <div>
      <p>가로 스크롤: {x}px</p>
      <p>세로 스크롤: {y}px</p>
    </div>
  );
}
```

## 예시 1: 스크롤 진행률 표시

```tsx
import { useWindowScroll } from "./useWindowScroll";

function ScrollProgressBar() {
  const { y } = useWindowScroll();

  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const maxScroll = scrollHeight - clientHeight;
  const progress = maxScroll > 0 ? (y / maxScroll) * 100 : 0;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        backgroundColor: "#f0f0f0",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "#007bff",
          transition: "width 0.1s",
        }}
      />
    </div>
  );
}
```

## 예시 2: Scroll to Top 버튼

```tsx
import { useWindowScroll } from "./useWindowScroll";

function ScrollToTopButton() {
  const { y } = useWindowScroll();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 300px 이상 스크롤하면 버튼 표시
  if (y < 300) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      ↑
    </button>
  );
}
```

## 예시 3: 헤더 숨김/표시

```tsx
import { useEffect, useState } from "react";
import { useWindowScroll } from "./useWindowScroll";

function AutoHideHeader() {
  const { y } = useWindowScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (y > prevScrollY && y > 100) {
      // 아래로 스크롤 & 100px 이상
      setIsVisible(false);
    } else {
      // 위로 스크롤
      setIsVisible(true);
    }
    setPrevScrollY(y);
  }, [y, prevScrollY]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        padding: "16px",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s",
        boxShadow: y > 0 ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <h1>헤더</h1>
    </header>
  );
}
```

## 예시 4: 스크롤 기반 애니메이션

```tsx
import { useWindowScroll } from "./useWindowScroll";

function ParallaxSection() {
  const { y } = useWindowScroll();

  return (
    <div style={{ height: "200vh" }}>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${y * 0.5}px)`,
        }}
      >
        <h1>Parallax Effect</h1>
      </div>
    </div>
  );
}
```

## 예시 5: 섹션 하이라이트 (목차)

```tsx
import { useWindowScroll } from "./useWindowScroll";
import { useEffect, useState } from "react";

const sections = [
  { id: "intro", title: "소개" },
  { id: "features", title: "기능" },
  { id: "pricing", title: "가격" },
  { id: "contact", title: "연락처" },
];

function TableOfContents() {
  const { y } = useWindowScroll();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // 현재 스크롤 위치에서 가장 가까운 섹션 찾기
    let currentSection = "";
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = section.id;
        }
      }
    }
    setActiveSection(currentSection);
  }, [y]);

  return (
    <nav
      style={{
        position: "fixed",
        top: "100px",
        right: "20px",
        backgroundColor: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sections.map((section) => (
          <li key={section.id} style={{ marginBottom: "8px" }}>
            <a
              href={`#${section.id}`}
              style={{
                color: activeSection === section.id ? "#007bff" : "#666",
                fontWeight: activeSection === section.id ? "bold" : "normal",
                textDecoration: "none",
              }}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

## 예시 6: 무한 스크롤

```tsx
import { useEffect, useState } from "react";
import { useWindowScroll } from "./useWindowScroll";
import { useThrottle } from "../useThrottle/useThrottle";

interface Post {
  id: number;
  title: string;
}

function InfiniteScrollList() {
  const { y } = useWindowScroll();
  const throttledY = useThrottle(y, 300);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // 하단에서 100px 이내이고 로딩 중이 아니면
    if (throttledY + clientHeight >= scrollHeight - 100 && !isLoading) {
      setIsLoading(true);
      fetch(`https://api.example.com/posts?page=${page}`)
        .then((res) => res.json())
        .then((newPosts: Post[]) => {
          setPosts((prev) => [...prev, ...newPosts]);
          setPage((prev) => prev + 1);
          setIsLoading(false);
        });
    }
  }, [throttledY, isLoading, page]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
          <h3>{post.title}</h3>
        </div>
      ))}
      {isLoading && <div style={{ textAlign: "center", padding: "16px" }}>로딩 중...</div>}
    </div>
  );
}
```

## 예시 7: 스크롤에 따른 페이드 인

```tsx
import { useWindowScroll } from "./useWindowScroll";

function FadeInSection({ children }: { children: React.ReactNode }) {
  const { y } = useWindowScroll();
  const [elementTop, setElementTop] = useState(0);
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elementRef) {
      setElementTop(elementRef.offsetTop);
    }
  }, [elementRef]);

  const opacity = Math.min(1, Math.max(0, (y + window.innerHeight - elementTop) / 200));

  return (
    <div
      ref={setElementRef}
      style={{
        opacity,
        transform: `translateY(${(1 - opacity) * 50}px)`,
        transition: "opacity 0.3s, transform 0.3s",
      }}
    >
      {children}
    </div>
  );
}

function Page() {
  return (
    <div>
      <FadeInSection>
        <h2>섹션 1</h2>
        <p>스크롤하면 나타납니다</p>
      </FadeInSection>
      <FadeInSection>
        <h2>섹션 2</h2>
        <p>스크롤하면 나타납니다</p>
      </FadeInSection>
    </div>
  );
}
```

## 예시 8: useThrottle과 함께 사용

성능 최적화를 위해 useThrottle과 함께 사용하는 것을 권장합니다.

```tsx
import { useWindowScroll } from "./useWindowScroll";
import { useThrottle } from "../useThrottle/useThrottle";

function OptimizedScrollComponent() {
  const scroll = useWindowScroll();
  const throttledScroll = useThrottle(scroll, 100);

  return (
    <div>
      <p>실시간 스크롤: {scroll.y}px</p>
      <p>Throttled 스크롤: {throttledScroll.y}px (0.1초마다 업데이트)</p>
    </div>
  );
}
```

## 반환값

- `{ x: number, y: number }`: 현재 스크롤 위치
  - `x`: 가로 스크롤 위치 (px)
  - `y`: 세로 스크롤 위치 (px)

## 사용 시나리오

- 스크롤 진행률 표시
- Scroll to Top 버튼
- 헤더 숨김/표시
- Parallax 효과
- 무한 스크롤
- 섹션 하이라이트
- 스크롤 기반 애니메이션

## 성능 최적화

스크롤 이벤트는 매우 빈번하게 발생하므로 **useThrottle**과 함께 사용하는 것을 권장합니다.

```tsx
const scroll = useWindowScroll();
const throttledScroll = useThrottle(scroll, 100); // 100ms마다 업데이트
```

## 장점

- 간단한 API
- SSR 환경 고려 (window 체크)
- 자동 이벤트 리스너 정리
- passive 이벤트 리스너 사용 (성능 최적화)
