import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiBold, BiItalic } from "react-icons/bi";
import EditorMainMenuColor from "./EditorMainMenuColor";

type EditorMainMenuProps = {
  setText: React.Dispatch<React.SetStateAction<string>>;
  x: number;
  y: number;
  style:boolean;
  setStyle: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditorMainMenu({ setText, x, y, style, setStyle }: EditorMainMenuProps) {
  const positionY = y;
  const [colorDrop, setColorDrop] = useState(false);

  const handleSelectionStyle = (type: string) => {
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const formattedText = `<${type}>${selectedText}</${type}>`;
      console.log(formattedText)
      setText(formattedText)
      range.deleteContents();
      range.insertNode(
        document.createRange().createContextualFragment(formattedText)
      );
      const textElement = document.getElementById("text");
      if (textElement) {
        setText(textElement!.innerHTML);
      }
      setStyle(!style)
    }
  };

  const handleSelectionHeading = (size: number) => {
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const formattedText = `<span style="font-size: ${size}px">${selectedText}</span>`;
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
    <MenuContainer style={{ top: positionY, left: x }}>
      <TextStyleContainer>
        <MenuButton onClick={() => handleSelectionStyle("b")}>
          <BiBold size={16} />
        </MenuButton>
        <MenuButton onClick={() => handleSelectionStyle("i")}>
          <BiItalic size={16} />
        </MenuButton>
      </TextStyleContainer>
      <TextHeadingContainer>
        <MenuButton onClick={() => handleSelectionHeading(32)}>H1</MenuButton>
        <MenuButton onClick={() => handleSelectionHeading(28)}>H2</MenuButton>
        <MenuButton onClick={() => handleSelectionHeading(24)}>H3</MenuButton>
      </TextHeadingContainer>
      <TextColorContainer>
        <MenuButton onClick={() => setColorDrop(!colorDrop)}>color</MenuButton>
        {colorDrop ? (
          <MenuColorContainer>
            <EditorMainMenuColor setText={setText} />
          </MenuColorContainer>
        ) : null}
      </TextColorContainer>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  position: absolute;
  display: inline-flex;

  background-color: ${({ theme }) => theme.color.background};
  box-shadow: 0px 0px 5px gray;
  width: 15rem;
  height: 1.5rem;
  border-radius: 5px;
  align-items: center;
`;
const MenuButton = styled.button`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const TextStyleContainer = styled.div`
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  width: 45px;
`;
const TextHeadingContainer = styled.div`
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  width: 80px;
`;

const TextColorContainer = styled.div`
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  width: 30px;
`;

const MenuColorContainer = styled.div`
  margin-left: 50px;
  margin-top:  20px;
`;
export default EditorMainMenu;
