import React, { useEffect, useState} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import styled from "styled-components";
import {content, context} from "editor";

type EditorMainListItemTextProps = {
  id:string;
  text: string;
  setTextId: React.Dispatch<React.SetStateAction<string>>;
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  setEnterClick: React.Dispatch<React.SetStateAction<boolean>>;
  contents: content[];
  context: context;
  blockText:string;
  setBlockText:React.Dispatch<React.SetStateAction<string>>;
};
function EditorMainListItemText({ id,text,setTextId,context,blockText,setEnterClick,setBlockText,setContents,contents }: EditorMainListItemTextProps) {
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();
  const [CreateBlock, setCreateBlock] =useState(false)

  useEffect(()=>{
    //useMemo 사용하기
    setTextId(id);
  },[blockText])

  const handleChange = (e: any) => {
    setBlockText(e.target.value); // Use innerText to get the content
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        setEnterClick(true)
      }
    }
  };



  return (
    <TextContainer>
      <ContentEditable
        className="textblock"
        tagName="pre"
        html={blockText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="등록 할 내용을 입력해주세요"
      />
    </TextContainer>
  );
}

const TextContainer = styled.div`
  width: 100%;
  .textblock {
    width: 100%;
  }
`;

export default EditorMainListItemText;
