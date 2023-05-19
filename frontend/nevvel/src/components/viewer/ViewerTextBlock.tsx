import React from "react";
import styled from "styled-components";
import { content } from "viewer";
import { event } from "viewer";
import { useAtom, atom } from "jotai";
import { difference } from "next/dist/build/utils";

type ViewerTextBlockProps = {
  viewerColor: string;
  content: content;
  tabNumber: number;
  setEventCatch: React.Dispatch<React.SetStateAction<boolean>>;
  interval: number;
};

function ViewerTextBlock({
  viewerColor,
  content,
  tabNumber,
  setEventCatch,
  interval,
}: ViewerTextBlockProps) {
  return (
    <>
      {content.idx <= tabNumber && (
        <TextBlock viewerColor={viewerColor} interval={interval}
        dangerouslySetInnerHTML={{ __html: content.context }}/>
      )}
    </>
  );
}

const TextBlock = styled.div<{ interval: number; viewerColor: string }>`
  z-index: 100;
  padding: ${(props) => props.interval * 0.5}rem;
  /* mix-blend-mode: ${(props) => props.viewerColor === "#1a1a1a" && "difference"}; */
  color:white;
  /* opacity: 0.8; */
  mix-blend-mode: difference;
  font-weight: 100;
`;
export default ViewerTextBlock;
