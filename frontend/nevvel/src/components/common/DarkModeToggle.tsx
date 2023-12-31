import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAtom } from "jotai";
import { themeAtom } from "@/src/store/Theme";
import { mobile } from "@/src/util/Mixin";
import { useRouter } from "next/router";

type DarkModeToggleProps = {
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
  theme: "light" | "dark";
};

function DarkModeToggle({ setTheme, theme }: DarkModeToggleProps) {
  const [changeTheme, setChangeTheme] = useAtom(themeAtom);
  const router = useRouter();
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    setChangeTheme(theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (
      router.pathname === "/viewer/[id]" 
    ) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [router]);

  return (
    <div>
      {hidden ? (
        <DarkModeBtn onClick={toggleTheme}>
          {theme === "light" ? (
            <MdLightMode size="28" />
          ) : (
            <MdDarkMode size="28" />
          )}
        </DarkModeBtn>
      ) : null}
    </div>
  );
}
const DarkModeBtn = styled.button`
  background-color: ${({ theme }) => theme.color.background};
  position: fixed;
  left: 90%;
  top: 89%;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  box-shadow: 0rem 0rem 0.5rem ${({ theme }) => theme.color.text1};
  color: ${({ theme }) => theme.color.text1};
  z-index: 50;
  ${mobile} {
    left: 80%;
  }
`;

export default DarkModeToggle;
