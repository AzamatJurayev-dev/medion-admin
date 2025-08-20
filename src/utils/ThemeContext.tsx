import { createContext, useContext, useState, useEffect } from "react";
import AppThemeWrapper from "./ConfigProvider";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  currentTheme: ThemeType;
  changeCurrentTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: "light",
  changeCurrentTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem("theme") as ThemeType) || "light";
  });

  const changeCurrentTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.colorScheme = theme;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
      <AppThemeWrapper>{children}</AppThemeWrapper>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeProvider = () => useContext(ThemeContext);
