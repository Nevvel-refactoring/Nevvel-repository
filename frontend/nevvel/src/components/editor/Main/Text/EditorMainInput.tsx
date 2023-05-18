import { bigMobile, tabletH } from "@/src/util/Mixin";
import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { episode, content, event } from "editor";

type EditorMainInputProps = {
  episode: episode;
  currentText: string;
  setCurrentText: Dispatch<SetStateAction<string>>;
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
};

function EditorMainInput({
  episode,
  currentText,
  setCurrentText,
  contents,
  setContents,
}: EditorMainInputProps) {
  const router = useRouter();
  const eid = router.query.eid;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    console.log("nextId", nextId);
  }, [nextId]);

  useEffect(() => {
    setNextId(episode.contents.length + 1);
  }, [episode]);

  useEffect(() => {
    console.log(nextId);
  }, [nextId]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key == "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();

        const newBlock: content = {
          idx: nextId,
          context: currentText,
          event: [],
        };
        setContents([...contents, newBlock]);
        setNextId(nextId + 1);
        setCurrentText("");
      }
    }
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
      <LeftSpace />
      <RightSpace />
      <BlockInput
        ref={textareaRef}
        value={currentText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <RightSpace />
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
  padding: 1rem;
  padding-left: 2rem;
`;

const LeftSpace = styled.div`
  width: 10rem;
`;
const RightSpace = styled.div`
  width: 2rem;
`;

const BlockInput = styled.textarea`
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.color.editor};
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  padding-bottom: 0;
  height: auto;
  min-height: 3rem;
  resize: none;
  align-items: center;
  ${bigMobile}{
  
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
