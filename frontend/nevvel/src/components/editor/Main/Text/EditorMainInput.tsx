import { tabletH } from "@/src/util/Mixin";
import React, { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";

interface content {
  idx: number;
  context: string;
  event: event[];
}

interface event {
  assetId: number;
  type: string;
}

type EditorMainInputProps = {
  currentText: string;
  setCurrentText: Dispatch<SetStateAction<string>>;
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
};

function EditorMainInput({
  currentText,
  setCurrentText,
  contents,
  setContents,
}: EditorMainInputProps) {
  const nextId = useRef(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key == "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();

        const newBlock: content = {
          idx: nextId.current,
          context: currentText,
          event: [],
        };
        setContents([...contents, newBlock]);
        nextId.current++;
        setCurrentText("");
      }
    }
  };

  const handleClick = () => {
    const newBlock: content = {
      idx: nextId.current,
      context: currentText,
      event: [],
    };
    setContents([...contents, newBlock]);
    nextId.current++;
    setCurrentText("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    }
  };

  // < ;quot 파싱하기
  return (
    <InputWrapper>
      <BlockInput
        ref={textareaRef}
        value={currentText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {/* <SubmitButton onClick={handleClick}>제출</SubmitButton> */}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  /* border: 1px solid ${({ theme }) => theme.color.text1}; */
  width: 100%;
  display: flex;
  height: 5rem;
  /* padding-left:1rem; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BlockInput = styled.textarea`
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.color.editor};
  width: 92%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  padding-bottom: 0;

  height: auto;
  min-height: 3rem;
  resize: none;
  margin-left: 2%;

  ${tabletH} {
    width: 84%;
    margin-left: 3%;
  }
`;

const SubmitButton = styled.button`
  width: 4rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.point};
  height: 3rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.color.text2};
`;

export default EditorMainInput;
