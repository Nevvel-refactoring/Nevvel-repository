import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    
    html,
    body {
    font-family: Pretendard;
    padding: 0;
    margin: 0px auto;
    -webkit-text-size-adjust: none;
    font-family: Pretendard;
    }
    a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    }
    b {
        font-weight: 800;
    }
    i {
        font-style: italic;
    }
    *,
    *:before,
    *:after {
    font-family: Pretendard;
    box-sizing: border-box;
    }
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #ced4da;
        &:hover {
            background-color: #adb5bd;
        }
    }
    
    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
    }
`;
