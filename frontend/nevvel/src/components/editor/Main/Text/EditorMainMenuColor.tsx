import React from "react";
import styled from "styled-components";

type EditorMainMenuColorProps = {
  setText: React.Dispatch<React.SetStateAction<string>>;
};

function EditorMainMenuColor({ setText }: EditorMainMenuColorProps) {
  const handleSelectionColor = (color: string) => {
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const formattedText = `<span style="color:${color}">${selectedText}</span>`;
      setText(formattedText)
      range.deleteContents();
      range.insertNode(
        document.createRange().createContextualFragment(formattedText)
      );
      const textElement = document.getElementById("text");
      if (textElement) {
        setText(textElement!.innerHTML);
      }
    }
  };

  return (
    <ColorMenuList>
      <button onClick={() => handleSelectionColor("red")}>red</button>
      <button onClick={() => handleSelectionColor("orange")}>orange</button>
      <button onClick={() => handleSelectionColor("yellow")}>yellow</button>
      <button onClick={() => handleSelectionColor("green")}>green</button>
      <button onClick={() => handleSelectionColor("blue")}>blue</button>
      <button onClick={() => handleSelectionColor("indigo")}>indigo</button>
      <button onClick={() => handleSelectionColor("purple")}>purple</button>
    </ColorMenuList>
  );
}

const ColorMenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 10px gray;
  background-color: ${({ theme }) => theme.color.background};
  width: 5rem;
  height: 10rem;
`;
export default EditorMainMenuColor;
