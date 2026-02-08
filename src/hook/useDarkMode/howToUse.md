# useDarkMode

다크모드를 관리하는 훅입니다. localStorage에 테마를 저장하고, 시스템 설정을 감지하며, HTML 클래스를 자동으로 관리합니다.

## 사용 방법

### 기본 사용법

```tsx
import { useDarkMode } from "./useDarkMode";

function App() {
  const { theme, isDarkMode, toggleTheme, setTheme } = useDarkMode();

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={toggleTheme}>
        {isDarkMode ? "라이트 모드" : "다크 모드"}
      </button>
    </div>
  );
}
```

## 예시 1: DarkModeToggle 컴포넌트와 함께 사용

```tsx
import { useDarkMode } from "./useDarkMode";
import { DarkModeToggle } from "../../component/DarkModeToggle/DarkModeToggle";

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <header>
        <h1>My App</h1>
        <DarkModeToggle variant="switch" />
      </header>
      <main>
        {/* 컨텐츠 */}
      </main>
    </div>
  );
}
```

## 예시 2: 테마 선택기

```tsx
import { useDarkMode } from "./useDarkMode";

function ThemeSelector() {
  const { theme, setTheme } = useDarkMode();

  return (
    <div>
      <label>
        <input
          type="radio"
          value="light"
          checked={theme === "light"}
          onChange={() => setTheme("light")}
        />
        라이트 모드
      </label>
      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === "dark"}
          onChange={() => setTheme("dark")}
        />
        다크 모드
      </label>
    </div>
  );
}
```

## 예시 3: Context로 전역 관리

```tsx
import { createContext, useContext, type ReactNode } from "react";
import { useDarkMode } from "./useDarkMode";

interface ThemeContextValue {
  theme: "light" | "dark";
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const darkMode = useDarkMode();

  return (
    <ThemeContext.Provider value={darkMode}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// 사용
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <header>
      <button onClick={toggleTheme}>
        {isDarkMode ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
```

## 예시 4: CSS 변수와 함께 사용

```tsx
import { useEffect } from "react";
import { useDarkMode } from "./useDarkMode";

function App() {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--bg-color", "#1a1a1a");
      root.style.setProperty("--text-color", "#ffffff");
      root.style.setProperty("--border-color", "#444");
    } else {
      root.style.setProperty("--bg-color", "#ffffff");
      root.style.setProperty("--text-color", "#000000");
      root.style.setProperty("--border-color", "#ddd");
    }
  }, [isDarkMode]);

  return <div>{/* 컨텐츠 */}</div>;
}
```

## CSS 스타일링

다크모드 스타일은 `.dark` 클래스를 사용합니다:

```css
/* 라이트 모드 (기본) */
body {
  background-color: #ffffff;
  color: #000000;
}

/* 다크 모드 */
.dark body {
  background-color: #1a1a1a;
  color: #ffffff;
}

.dark .card {
  background-color: #2a2a2a;
  border-color: #444;
}
```

## Tailwind CSS와 함께 사용

```tsx
// tailwind.config.js
module.exports = {
  darkMode: 'class', // class 전략 사용
  // ...
}

// 컴포넌트
function Card() {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
      카드 내용
    </div>
  );
}
```

## 매개변수

- `defaultTheme`: `"light" | "dark"` (선택사항) - 기본 테마
  - 지정하지 않으면: localStorage → 시스템 설정 → "light" 순으로 결정

## 반환값

- `theme`: `"light" | "dark"` - 현재 테마
- `isDarkMode`: `boolean` - 다크모드 여부
- `toggleTheme`: `() => void` - 테마 토글
- `setTheme`: `(theme: "light" | "dark") => void` - 테마 설정

## 동작 원리

1. **초기화**: localStorage → defaultTheme → 시스템 설정 → "light" 순으로 테마 결정
2. **HTML 클래스**: `<html class="dark">` 자동 추가/제거
3. **localStorage 저장**: 테마 변경 시 자동으로 저장
4. **SSR 대응**: window 체크로 서버 사이드 렌더링 환경 고려

## 시스템 설정 감지

훅은 `prefers-color-scheme: dark` 미디어 쿼리를 자동으로 감지합니다.
사용자가 명시적으로 테마를 선택하지 않았을 때만 시스템 설정을 따릅니다.

## 장점

- localStorage 자동 저장
- 시스템 설정 자동 감지
- HTML 클래스 자동 관리
- SSR 환경 고려
- 타입 안전성
