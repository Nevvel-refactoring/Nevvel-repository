import { Provider } from "jotai";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../constants/styles/theme";
import { GlobalStyle } from "../constants/styles/globalStyle";
import "../assets/fonts/font.css";
import Layout from "../components/layout/Layout";
import type { AppProps } from "next/app";
import DarkModeToggle from "../components/common/DarkModeToggle";

function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <Provider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <DarkModeToggle setTheme={setTheme} theme={theme} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
