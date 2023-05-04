import React from "react";
import styled from "styled-components";
import { content } from "editor";
import { event } from "viewer";
import { useAtom, atom } from "jotai";

type ViewerTextBlockProps = {
  content: content;
  tabNumber: number;
  setEventCatch: React.Dispatch<React.SetStateAction<boolean>>;
};

function ViewerTextBlock({
  content,
  tabNumber,
  setEventCatch,
}: ViewerTextBlockProps) {

  return (
    <>{content.idx <= tabNumber && <TextBlock>{content.context}</TextBlock>}</>
  );
}

const TextBlock = styled.div`
  z-index: 100;
  padding: 0.5rem;
`;
export default ViewerTextBlock;
