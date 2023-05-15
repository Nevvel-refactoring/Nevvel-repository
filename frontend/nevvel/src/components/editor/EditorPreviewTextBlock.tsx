import React from "react";
import styled from "styled-components";
import { content } from "editor";
import { event } from "viewer";
import { useAtom, atom } from "jotai";

type ViewerTextBlockProps = {
  content: content;
  tabNumber: number;
  setEventCatch: React.Dispatch<React.SetStateAction<boolean>>;
  interval:number;
  
};

function EditorPreviewTextBlock({
  content,
  tabNumber,
  setEventCatch,
  interval
}: ViewerTextBlockProps) {

  return (
    <>{content.idx <= tabNumber && <TextBlock interval={interval}>{content.context}</TextBlock>}</>
  );
}

const TextBlock = styled.div<{interval:number}>`
  z-index: 100;
  padding:${(props)=>(props.interval)*0.5}rem;
`;
export default EditorPreviewTextBlock;
