import React, { useEffect, useState,memo} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import styled from "styled-components";
import {content} from "editor";
import { nowTextBlockAtom } from "@/src/store/EditorAssetStore";
import { useAtom } from "jotai";

type EditorMainListItemTextProps = {
  id:string;
  idx:string;
  text: string;
  setTextId: React.Dispatch<React.SetStateAction<string>>;
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  setEnterClick: React.Dispatch<React.SetStateAction<boolean>>;
  contents: content[];
  setNowContent: React.Dispatch<React.SetStateAction<content>>
  nowContent: content;
};
function EditorMainListItemText({ id,idx,text,setTextId,setEnterClick,setContents,contents,setNowContent,nowContent
 }: EditorMainListItemTextProps) {
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();
  const [CreateBlock, setCreateBlock] =useState(false)
  const [nowTextBlock, setNowTextBlock] = useAtom(nowTextBlockAtom);
  const [blockText, setBlockText] = useState("");

  // useEffect(() => {
  //   // `nowContent`의 복사본을 만들어서 업데이트합니다.
  //   if(nowContent){
  //     setNowContent((prevContent) => ({
  //       ...prevContent,
  //       context: prevContent.context.map((el) =>
  //         el.id === id ? { ...el, text: blockText } : el
  //       ),
  //     }));
  //   }
  // }, [blockText]);
  useEffect(()=>{
    //useMemo 사용하기
    setTextId(id);
    console.log(idx,"idx")
    console.log(blockText,"blockText")
  },[blockText])

  const handleChange = (e: any) => {
    setBlockText(e.target.value); // Use innerText to get the content
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        setEnterClick(true)
        setNowTextBlock(idx)
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

export default memo(EditorMainListItemText);
