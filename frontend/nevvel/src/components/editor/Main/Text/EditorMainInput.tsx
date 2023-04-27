import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface TextBlock {
  id: number;
  text: string;
  image: string;
  sound: string;
}

type EditorMainInputProps = {
  currentText: string;
  setCurrentText: Dispatch<SetStateAction<string>>;
  textBlocks: TextBlock[];
  setTextBlocks: React.Dispatch<React.SetStateAction<TextBlock[]>>;
};



function EditorMainInput({
  currentText,
  setCurrentText,
  textBlocks,
  setTextBlocks,
}: EditorMainInputProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();

      const newBlock: TextBlock = {
        id: Date.now(),
        text: currentText,
        image: "",
        sound: "",
      };
      setTextBlocks([...textBlocks, newBlock]);
      setCurrentText("");
    }
  };

  const handleClick = () => {
    const newBlock: TextBlock = {
      id: Date.now(),
      text: currentText,
      image: "",
      sound: "",
    };
    setTextBlocks([...textBlocks, newBlock]);
    setCurrentText("");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(event.target.value);
  };

  return (
    <InputWrapper>
      <BlockInput
        value={currentText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SubmitButton onClick={handleClick}>제출</SubmitButton>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.text1};
  width: 100%;
  display: flex;
  height: 5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BlockInput = styled.input`
  background-color: ${({ theme }) => theme.color.editor};
  width: 90% ;
  height: 3rem;
  border: none;
  border-radius: 10px;
  
`;

const SubmitButton = styled.button`
  width: 10%;
`

export default EditorMainInput;
