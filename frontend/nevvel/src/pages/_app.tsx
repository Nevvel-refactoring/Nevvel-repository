import { atom, Provider, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../constants/styles/theme";
import { GlobalStyle } from "../constants/styles/globalStyle";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import type { AppProps } from "next/app";
import DarkModeToggle from "../components/common/DarkModeToggle";
// import { NextPageContext } from "next/types";

// export const themeAtom = atom<"light" | "dark">("light");

function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // useEffect(() => {
  //   if (
  //     window.matchMedia &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // }, [setTheme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
  };

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

// export async function getServerSiedProps() {
//   async ({ req }: NextPageContext) => {
//     const cookie = req?.headers.cookie;
//     console.log(cookie)
//   };
// }

export default App;
