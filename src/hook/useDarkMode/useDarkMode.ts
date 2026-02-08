import { useEffect, useState } from "react";

type Theme = "light" | "dark";

interface UseDarkModeReturn {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * 다크모드를 관리하는 훅
 * @param defaultTheme - 기본 테마 (기본값: 시스템 설정 또는 'light')
 * @returns theme, isDarkMode, toggleTheme, setTheme
 */
export function useDarkMode(defaultTheme?: Theme): UseDarkModeReturn {
  const [theme, setThemeState] = useState<Theme>(() => {
    // localStorage에서 저장된 테마 확인
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme) return savedTheme;

      // 기본 테마가 지정되어 있으면 사용
      if (defaultTheme) return defaultTheme;

      // 시스템 설정 확인
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }

    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // localStorage에 저장
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return {
    theme,
    isDarkMode: theme === "dark",
    toggleTheme,
    setTheme,
  };
}
