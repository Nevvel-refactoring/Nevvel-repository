import React, { Dispatch, SetStateAction,useRef } from "react";
import styled from "styled-components";

interface content {
  idx: number;
  context: string;
  event:event[]
}

interface event {
  assetId: number;
  type:string
}

type EditorMainInputProps = {
  currentText: string;
  setCurrentText: Dispatch<SetStateAction<string>>;
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
}


function EditorMainInput({
  currentText,
  setCurrentText,
  contents,
  setContents,
}: EditorMainInputProps) {

  const nextId = useRef(1);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();

      const newBlock: content = {
        idx: nextId.current,
        context: currentText,
        event:[]
      };
      setContents([...contents, newBlock]);
      nextId.current++;
      setCurrentText("");
    }
  };

  const handleClick = () => {
    const newBlock: content = {
      idx: nextId.current,
      context: currentText,
      event:[]
    };
    setContents([...contents, newBlock]);
    nextId.current++;
    setCurrentText("");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(event.target.value);
  };

  // < ;quot 파싱하기 
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
  /* border: 1px solid ${({ theme }) => theme.color.text1}; */
  width: 100%;
  display: flex;
  height: 5rem;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const BlockInput = styled.input`
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.color.background};
  width: 90% ;
  height: 3rem;
  border: none;
  border-radius: 10px;
  padding-left: 1rem;
  box-shadow: 0px 0px 2px gray;
  
`;

const SubmitButton = styled.button`
  width:4rem;
  border-radius: 10px;
  background-color: ${({ theme })=> theme.color.point};
  height: 3rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: ${({ theme })=> theme.color.text2};
`

export default EditorMainInput;
