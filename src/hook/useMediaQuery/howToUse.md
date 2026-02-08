# useMediaQuery

미디어 쿼리 매칭 상태를 추적하는 훅입니다. 반응형 디자인에서 화면 크기에 따라 조건부 렌더링을 할 때 유용합니다.

## 사용 방법

### 기본 사용법

```tsx
import { useMediaQuery } from "./useMediaQuery";

function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return (
    <div>
      {isMobile && <div>모바일 화면</div>}
      {isTablet && <div>태블릿 화면</div>}
      {isDesktop && <div>데스크톱 화면</div>}
    </div>
  );
}
```

## 예시 1: 반응형 네비게이션

```tsx
import { useMediaQuery } from "./useMediaQuery";
import { useState } from "react";

function Navigation() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      {isMobile ? (
        <>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            메뉴
          </button>
          {isMenuOpen && (
            <ul className="mobile-menu">
              <li>홈</li>
              <li>소개</li>
              <li>연락처</li>
            </ul>
          )}
        </>
      ) : (
        <ul className="desktop-menu">
          <li>홈</li>
          <li>소개</li>
          <li>연락처</li>
        </ul>
      )}
    </nav>
  );
}
```

## 예시 2: 다크 모드 감지

```tsx
import { useMediaQuery } from "./useMediaQuery";
import { useEffect } from "react";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    document.body.className = prefersDark ? "dark-theme" : "light-theme";
  }, [prefersDark]);

  return <div>{children}</div>;
}
```

## 예시 3: 디바이스 방향 감지

```tsx
import { useMediaQuery } from "./useMediaQuery";

function OrientationComponent() {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <div>
      {isPortrait && <div>세로 모드</div>}
      {isLandscape && <div>가로 모드</div>}
    </div>
  );
}
```

## 예시 4: 터치 기기 감지

```tsx
import { useMediaQuery } from "./useMediaQuery";

function TouchOptimizedButton() {
  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");

  return (
    <button
      style={{
        padding: isTouchDevice ? "16px" : "8px",
        fontSize: isTouchDevice ? "18px" : "14px",
      }}
    >
      클릭
    </button>
  );
}
```

## 예시 5: 고해상도 디스플레이 감지

```tsx
import { useMediaQuery } from "./useMediaQuery";

function ImageComponent() {
  const isRetina = useMediaQuery("(min-resolution: 2dppx)");

  return (
    <img
      src={isRetina ? "/image@2x.png" : "/image.png"}
      alt="Responsive image"
    />
  );
}
```

## 예시 6: 커스텀 브레이크포인트

```tsx
import { useMediaQuery } from "./useMediaQuery";

// 재사용 가능한 커스텀 훅
function useBreakpoint() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1440px)");

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    device: isMobile
      ? "mobile"
      : isTablet
      ? "tablet"
      : isLargeDesktop
      ? "large-desktop"
      : "desktop",
  };
}

function ResponsiveLayout() {
  const { device, isMobile } = useBreakpoint();

  return (
    <div className={`layout-${device}`}>
      <h1>현재 디바이스: {device}</h1>
      {isMobile && <MobileMenu />}
      {!isMobile && <DesktopMenu />}
    </div>
  );
}
```

## 매개변수

- `query`: `string` - 미디어 쿼리 문자열 (예: "(min-width: 768px)")

## 반환값

- `matches`: `boolean` - 미디어 쿼리가 매칭되면 true, 아니면 false

## 주요 미디어 쿼리 예시

### 화면 크기
- `"(max-width: 640px)"` - 모바일
- `"(min-width: 641px) and (max-width: 1024px)"` - 태블릿
- `"(min-width: 1025px)"` - 데스크톱

### 디바이스 특성
- `"(orientation: portrait)"` - 세로 모드
- `"(orientation: landscape)"` - 가로 모드
- `"(prefers-color-scheme: dark)"` - 다크 모드 선호
- `"(prefers-reduced-motion: reduce)"` - 애니메이션 감소 선호

### 입력 방식
- `"(hover: hover)"` - 호버 가능 (마우스)
- `"(hover: none)"` - 호버 불가능 (터치)
- `"(pointer: coarse)"` - 정밀도가 낮은 포인터 (터치)
- `"(pointer: fine)"` - 정밀한 포인터 (마우스)

### 디스플레이
- `"(min-resolution: 2dppx)"` - 레티나 디스플레이

## 장점

- CSS 미디어 쿼리를 JavaScript에서 사용 가능
- 반응형 컴포넌트 로직 구현
- SSR 환경 고려 (window 체크)
- 자동 이벤트 리스너 정리
