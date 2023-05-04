import { atom, Provider, useAtom } from "jotai";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../constants/styles/theme";
import { GlobalStyle } from "../constants/styles/globalStyle";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import type { AppProps } from "next/app";
import { MdDarkMode, MdLightMode } from "react-icons/md";

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
        <DarkModeBtn onClick={toggleTheme}>
          {theme === "light" ? <MdLightMode size="28"/> : <MdDarkMode size="28" />}
        </DarkModeBtn>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

const DarkModeBtn = styled.button`
  position: fixed;
  left: 90%;
  top: 89%;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  box-shadow: 0rem 0rem 0.5rem ${({ theme }) => theme.color.text1};
  color:${({ theme }) => theme.color.text1};
`;
export default App;
