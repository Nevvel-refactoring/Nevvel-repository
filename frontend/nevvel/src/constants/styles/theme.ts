import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  color: {
    text1: "#000000",
    text2: "#ffffff",
    text3: "#666666",
    viewDark:"#1a1a1a",
    buttonText: "#ffffff",
    pointText: "5c5db3",
    navbar: "#ffffff",
    subNavbar: "#000000",
    background: "#fefefe",
    button: "#000000",
    point: "#8385ff",
    hover: "#c1c2ff",
    searchBar: "#dadaff",
    editor: "#dadaff",
    wrongButton: "#808080",
    opacityText3: "#66666640",
  },
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  color: {
    text1: "#e6e6e6",
    text2: "#000000",
    text3: "#999999",
    viewDark:"#1a1a1a",
    buttonText: "#000000",
    pointText: "5c5db3",
    navbar: "#000000",
    subNavbar: "#dadaff",
    background: "#1a1a1a",
    button: "#e6e6e6",
    point: "#696acc",
    hover: "#616180",
    searchBar: "#dadaff",
    editor: "#27284c",
    wrongButton: "#808080",
    opacityText3: "#99999940",
  },
};
