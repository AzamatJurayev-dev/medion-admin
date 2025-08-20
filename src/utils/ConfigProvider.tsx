import { ConfigProvider, theme as antdTheme } from "antd";
import { useThemeProvider } from "./ThemeContext";

export default function AppThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentTheme } = useThemeProvider();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token:
          currentTheme === "dark"
            ? {
                colorBgContainer: "#111827",
                colorText: "#e5e7eb",
                colorPrimary: "#8470ff",
              }
            : {
                colorBgContainer: "#ffffff",
                colorText: "#374151",
                colorPrimary: "#5d47de",
              },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
