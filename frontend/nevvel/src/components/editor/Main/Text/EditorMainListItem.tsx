import React, { useState, useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
import EditorMainMenu from "./EditorMainMenu";
import { bigMobile, mobile } from "@/src/util/Mixin";
import { content } from "editor";
import { atom, useAtom, useAtomValue } from "jotai";
import EditorMainAssetBtn from "../Asset/EditorMainAssetBtn";
import ContentEditable from "react-contenteditable";

type EditorMainListItemProps = {
  index: number;
  content: content;
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  setDeleteBlock: React.Dispatch<React.SetStateAction<string>>;
};

function EditorMainListItem({
  content,
  contents,
  setContents,
  index,
  setDeleteBlock
}: EditorMainListItemProps) {
  const [createBlock, setCreateBlock] = useState(false);
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();
  const idx = content.idx;
  const fIndex = contents.findIndex((el) => el.idx === idx);
  const [focusBlock, setFocusBlock] = useState(fIndex);
  const focusRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: any) => {
    setContents((prevContent) =>
      prevContent.map((el) =>
        el.idx === idx ? { ...el, context: e.target.value } : el
      )
    );
  };

  useEffect(()=>{
    if(focusRef.current){
      focusRef.current.focus();
      console.log(focusRef.current)
    }
  },[focusRef])

  useEffect(() => {
    if (createBlock) {
      const copiedContents = [...contents];
      const newBlock: content = {
        idx: uuid,
        tag: "p",
        context: "",
        event: [],
      };
      copiedContents.splice(fIndex + 1, 0, newBlock);
      setContents(copiedContents);
    }
    setCreateBlock(false);
  }, [createBlock]);

  useEffect(() => {
    console.log(contents);
  }, [contents]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "Enter") {
      console.log(event)
      if (!event.shiftKey) {
        event.preventDefault();
        setCreateBlock(true);
      }
    }
    if (event.key === "Backspace" && index !== 0) {
      if (content.context.trim() === "") {
        setDeleteBlock(idx)
      }
    }
  };

  // block삭제
  const RemoveHandler = (content: content) => {
    setContents(contents.filter((el) => el.idx !== idx));
  };

  return (
    <BlockContainer>
      <EditorMainAssetBtn content={content} />
      <TextBlock>
        <TextContainer>
          <ContentEditable
            className="textblock"
            innerRef={focusRef}
            tagName={content.tag}
            html={content.context}
            disabled={false}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="등록 할 내용을 입력해주세요"
          />
        </TextContainer>
      </TextBlock>
    </BlockContainer>
  );
}

const BlockContainer = styled.div`
  color: ${({ theme }) => theme.color.text1};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  ${bigMobile} {
    flex-direction: column;
  }
`;

const TextBlock = styled.div`
  width: 85%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.editor};
  padding: 1rem;
  height: auto;

  display: flex;
  align-items: center;
  white-space: normal;
`;

const RemoveButton = styled.button`
  display: flex;
  width: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.color.hover};
  :hover {
    ${({ theme }) => theme.color.point};
  }
`;

const TextContainer = styled.div`
  width: 100%;
  .textblock {
    width: 100%;
  }
`;

export default memo(EditorMainListItem);
