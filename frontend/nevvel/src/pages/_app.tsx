import { atom, Provider, useAtom } from "jotai";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../constants/styles/theme";
import { GlobalStyle } from "../constants/styles/globalStyle";
import Layout from "../components/layout/Layout";
import type { AppProps } from "next/app";

const themeAtom = atom<"light" | "dark">("light");

function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
  };

  return (
    <Provider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <button onClick={toggleTheme}>
          {theme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
        </button>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
