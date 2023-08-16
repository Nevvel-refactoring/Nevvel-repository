import React, { useState, useEffect, useRef, memo } from "react";
import styled from "styled-components";
import EditorMainMenu from "./EditorMainMenu";
import { bigMobile, mobile } from "@/src/util/Mixin";
import { content } from "editor";
import ContentEditable from "react-contenteditable";
import dynamic from "next/dynamic";

type EditorMainListItemProps = {
  index: number;
  content: content;
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  setDeleteBlock: React.Dispatch<React.SetStateAction<string>>;
};

const EditorMainAssetBtn = dynamic(()=>
import("../Asset/EditorMainAssetBtn"));

function EditorMainListItem({
  content,
  contents,
  setContents,
  index,
  setDeleteBlock
}: EditorMainListItemProps) {
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();
  const idx = content.idx;
  const fIndex = contents.findIndex((el) => el.idx === idx);
  const focusRef = useRef<HTMLDivElement>(null);
  const [createBlock, setCreateBlock] = useState(false);
  const [deleteFocus, setDeleteFocus] =useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [style, setStyle] = useState(false);
  const [menuBlock, setMenuBlock] = useState(false);
  const [text, setText] = useState(content.context);
  const [point, setPoint] = useState("");
  const [start, setStart] =useState(0)
  useEffect(()=>{
    console.log(text,"부분")
  },[text])


  useEffect(() => {
    // 텍스트에 style 적용한 경우
    let context= content.context;
    const styleText = context.substring(0,start) + text + context.substring(start+point.length,context.length)
    console.log(styleText)
    setContents(contents.map((el) => {
      if (el.idx === idx) {
        return { ...el, context: styleText };
      }
      return el;
    }));
    return (()=>{
    })
  }, [style]);


  useEffect(()=>{
    if(focusRef.current){
      focusRef.current.focus();
      console.log(focusRef.current)
      if(deleteFocus){
        setDeleteFocus(false)
      }
    }
  },[focusRef,deleteFocus])

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
  
  const handleChange = (e: any) => {
    setContents((prevContent) =>
      prevContent.map((el) =>
        el.idx === idx ? { ...el, context: e.target.value } : el
      )
    );
  };
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
        setDeleteFocus(true)

      }
    }
  };

  const handleContextMenu = (event: any) => {
    event.preventDefault();
    setTooltipPos({ x: event.clientX, y: event.clientY });
    setMenuBlock(true);
  };

  // // block삭제
  // const RemoveHandler = (content: content) => {
  //   setContents(contents.filter((el) => el.idx !== idx));
  // };

  return (
    <BlockContainer>
      <EditorMainAssetBtn content={content} />
      <TextBlock onMouseLeave={() => setMenuBlock(false)}>
      {menuBlock ? (
        <EditorMainMenu
          x={tooltipPos.x}
          y={tooltipPos.y}
          setText={setText}
          style={style}
          setStyle={setStyle}
          setPoint={setPoint}
          setStart ={setStart}
          context={content.context}
        />
      ) : null}
        <TextContainer>
          <ContentEditable
            className="textblock"
            innerRef={focusRef}
            tagName={content.tag}
            html={content.context}
            disabled={false}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onContextMenu={handleContextMenu}
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

const TextContainer = styled.div`
  width: 100%;
  .textblock {
    width: 100%;
  }
`;

export default memo(EditorMainListItem);
