import { useState } from "react";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import { ThemeProvider } from "styled-components";
import "../assets/fonts/font.css";

import { lightTheme, darkTheme } from "../constants/styles/theme";
import { GlobalStyle } from "../constants/styles/globalStyle";

import Layout from "../components/layout/Layout";
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
