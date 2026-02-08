# DarkModeToggle

다크모드 토글 컴포넌트입니다. 스위치, 버튼, 아이콘 3가지 스타일을 지원하며 useDarkMode 훅을 내부적으로 사용합니다.

## 사용 방법

### 기본 사용법 (스위치)

```tsx
import { DarkModeToggle } from "./DarkModeToggle";

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <DarkModeToggle />
    </header>
  );
}
```

## 예시 1: 버튼 스타일

```tsx
import { DarkModeToggle } from "./DarkModeToggle";

function Settings() {
  return (
    <div>
      <h2>설정</h2>
      <DarkModeToggle variant="button" />
    </div>
  );
}
```

## 예시 2: 아이콘 스타일

```tsx
import { DarkModeToggle } from "./DarkModeToggle";

function Navigation() {
  return (
    <nav>
      <a href="/">홈</a>
      <a href="/about">소개</a>
      <DarkModeToggle variant="icon" />
    </nav>
  );
}
```

## 예시 3: 모든 스타일 비교

```tsx
import { DarkModeToggle } from "./DarkModeToggle";

function DarkModeDemo() {
  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <div>
        <p>스위치</p>
        <DarkModeToggle variant="switch" />
      </div>

      <div>
        <p>버튼</p>
        <DarkModeToggle variant="button" />
      </div>

      <div>
        <p>아이콘</p>
        <DarkModeToggle variant="icon" />
      </div>
    </div>
  );
}
```

## 예시 4: 네비게이션 바에 통합

```tsx
import { DarkModeToggle } from "./DarkModeToggle";

function NavBar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      borderBottom: "1px solid #ddd",
    }}>
      <div>
        <a href="/">로고</a>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <a href="/">홈</a>
        <a href="/about">소개</a>
        <a href="/contact">연락처</a>
        <DarkModeToggle variant="icon" />
      </div>
    </nav>
  );
}
```

## 예시 5: 설정 페이지

```tsx
import { DarkModeToggle } from "./DarkModeToggle";
import { useDarkMode } from "../../hook/useDarkMode/useDarkMode";

function SettingsPage() {
  const { theme } = useDarkMode();

  return (
    <div>
      <h2>설정</h2>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #ddd",
      }}>
        <div>
          <h3>다크 모드</h3>
          <p>현재 테마: {theme === "dark" ? "다크" : "라이트"}</p>
        </div>
        <DarkModeToggle variant="switch" />
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #ddd",
      }}>
        <div>
          <h3>알림</h3>
          <p>알림 설정을 관리합니다</p>
        </div>
        <input type="checkbox" />
      </div>
    </div>
  );
}
```

## 예시 6: Dropdown과 함께 사용

```tsx
import { DarkModeToggle } from "./DarkModeToggle";
import { Dropdown } from "../Dropdown/Dropdown";

function UserMenu() {
  const menuItems = [
    { label: "프로필", value: "profile" },
    { label: "설정", value: "settings" },
    { label: "로그아웃", value: "logout" },
  ];

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <DarkModeToggle variant="icon" />
      <Dropdown
        trigger={<button>계정</button>}
        items={menuItems}
        onSelect={(value) => console.log(value)}
      />
    </div>
  );
}
```

## 예시 7: 모바일 사이드바

```tsx
import { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { DarkModeToggle } from "./DarkModeToggle";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>메뉴</button>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <nav>
          <h2>메뉴</h2>
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/about">소개</a></li>
            <li><a href="/contact">연락처</a></li>
          </ul>

          <hr />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0",
          }}>
            <span>다크 모드</span>
            <DarkModeToggle variant="switch" />
          </div>
        </nav>
      </Sidebar>
    </div>
  );
}
```

## 예시 8: 커스텀 스타일링

```tsx
import { DarkModeToggle } from "./DarkModeToggle";

function CustomStyledToggle() {
  return (
    <DarkModeToggle
      variant="button"
      className="custom-dark-mode-toggle"
    />
  );
}

// CSS
/*
.custom-dark-mode-toggle.button {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
*/
```

## Props

- `className`: `string` (선택사항) - 추가 CSS 클래스
- `variant`: `"switch" | "button" | "icon"` (선택사항, 기본값: "switch") - 표시 스타일

## Variant 종류

### switch (기본값)
- iOS 스타일 토글 스위치
- 크기: 52 x 28px
- 사용 사례: 설정 페이지, 옵션 목록

### button
- 텍스트가 있는 버튼
- "☀️ 라이트" / "🌙 다크" 표시
- 사용 사례: 명확한 액션이 필요한 경우

### icon
- 아이콘만 표시하는 원형 버튼
- 크기: 40 x 40px
- 사용 사례: 네비게이션 바, 헤더

## 내부 동작

이 컴포넌트는 내부적으로 `useDarkMode` 훅을 사용합니다:
```tsx
const { isDarkMode, toggleTheme } = useDarkMode();
```

따라서:
- localStorage에 자동 저장
- HTML에 `dark` 클래스 자동 추가/제거
- 시스템 설정 자동 감지

## 접근성

- `aria-label`: 모든 variant에 적절한 레이블 제공
- 키보드 접근 가능
- 포커스 스타일 제공 (switch variant)

## 다크모드 지원

컴포넌트 자체도 `.dark` 클래스에 반응하여 스타일이 변경됩니다.

## 장점

- 3가지 스타일 선택 가능
- useDarkMode 훅 자동 통합
- 접근성 고려
- 커스터마이징 가능
- 간단한 사용법

## 외부 useDarkMode 훅 사용

DarkModeToggle 외부에서도 같은 테마 상태를 공유할 수 있습니다:

```tsx
import { useDarkMode } from "../../hook/useDarkMode/useDarkMode";
import { DarkModeToggle } from "./DarkModeToggle";

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div>
      <p>현재 모드: {isDarkMode ? "다크" : "라이트"}</p>
      <DarkModeToggle />
    </div>
  );
}
```
