# Sidebar

사이드바 컴포넌트입니다. 왼쪽 또는 오른쪽에서 슬라이드되어 나타나며, 오버레이와 함께 표시됩니다.

## 사용 방법

### 기본 사용법

```tsx
import { useState } from "react";
import { Sidebar } from "./Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsSidebarOpen(true)}>
        메뉴 열기
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <nav>
          <h2>메뉴</h2>
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/about">소개</a></li>
            <li><a href="/contact">연락처</a></li>
          </ul>
        </nav>
      </Sidebar>
    </div>
  );
}
```

## 예시 1: 오른쪽 사이드바

```tsx
import { useState } from "react";
import { Sidebar } from "./Sidebar";

function RightSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        설정
      </button>

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
      >
        <h2>설정</h2>
        <div>
          <label>
            <input type="checkbox" />
            알림 받기
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" />
            자동 업데이트
          </label>
        </div>
      </Sidebar>
    </div>
  );
}
```

## 예시 2: 커스텀 너비

```tsx
import { Sidebar } from "./Sidebar";

function WideSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      width="400px"
    >
      <h2>넓은 사이드바</h2>
      {/* 컨텐츠 */}
    </Sidebar>
  );
}
```

## 예시 3: 오버레이 없이 사용

```tsx
import { Sidebar } from "./Sidebar";

function SidebarWithoutOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      showOverlay={false}
    >
      <nav>{/* 메뉴 */}</nav>
    </Sidebar>
  );
}
```

## 예시 4: 외부 클릭으로 닫히지 않게 설정

```tsx
import { Sidebar } from "./Sidebar";

function PersistentSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      closeOnClickOutside={false}
    >
      <h2>이 사이드바는 X 버튼으로만 닫을 수 있습니다</h2>
    </Sidebar>
  );
}
```

## 예시 5: 모바일 네비게이션

```tsx
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { useMediaQuery } from "../../hook/useMediaQuery/useMediaQuery";

function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!isMobile) {
    // 데스크톱에서는 일반 네비게이션
    return (
      <nav>
        <a href="/">홈</a>
        <a href="/about">소개</a>
        <a href="/contact">연락처</a>
      </nav>
    );
  }

  // 모바일에서는 사이드바
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        ☰
      </button>

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <nav>
          <a href="/" onClick={() => setIsOpen(false)}>홈</a>
          <a href="/about" onClick={() => setIsOpen(false)}>소개</a>
          <a href="/contact" onClick={() => setIsOpen(false)}>연락처</a>
        </nav>
      </Sidebar>
    </div>
  );
}
```

## 예시 6: 필터 사이드바

```tsx
import { useState } from "react";
import { Sidebar } from "./Sidebar";

function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    inStock: false,
  });

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        필터
      </button>

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        width="320px"
      >
        <h2>필터</h2>

        <div>
          <label>카테고리</label>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
          >
            <option value="">전체</option>
            <option value="electronics">전자기기</option>
            <option value="clothing">의류</option>
          </select>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) =>
                setFilters((f) => ({ ...f, inStock: e.target.checked }))
              }
            />
            재고 있는 상품만
          </label>
        </div>

        <button onClick={() => setIsOpen(false)}>
          적용
        </button>
      </Sidebar>
    </div>
  );
}
```

## Props

- `isOpen`: `boolean` (필수) - 사이드바 열림 상태
- `onClose`: `() => void` (필수) - 닫기 핸들러
- `children`: `ReactNode` (필수) - 사이드바 내용
- `position`: `"left" | "right"` (선택사항, 기본값: "left") - 사이드바 위치
- `width`: `string` (선택사항, 기본값: "280px") - 사이드바 너비
- `closeOnClickOutside`: `boolean` (선택사항, 기본값: true) - 외부 클릭 시 닫기
- `showOverlay`: `boolean` (선택사항, 기본값: true) - 오버레이 표시 여부
- `className`: `string` (선택사항) - 추가 CSS 클래스

## 키보드 지원

- `Escape` 키를 누르면 사이드바가 닫힙니다

## 접근성

- `aria-label`: 닫기 버튼에 레이블 제공
- 포커스 트랩 (권장): react-focus-lock 등의 라이브러리 사용 권장

## 스크롤 잠금

사이드바가 열리면 `body`의 스크롤이 자동으로 잠기고, 닫히면 해제됩니다.

## 애니메이션

- 슬라이드 애니메이션: 0.3초
- 오버레이 페이드: 0.3초

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 장점

- 부드러운 애니메이션
- 키보드 지원 (Escape)
- 스크롤 잠금
- 다크모드 지원
- 왼쪽/오른쪽 위치 선택
- 커스터마이징 가능
