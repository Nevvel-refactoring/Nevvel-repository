import React, { useEffect, useRef } from "react";
import { episodeViewer } from "viewer";
import styled from "styled-components";
import { mobile } from "@/src/util/Mixin";
import ViewerPageTextBlock from "../ViewerPageTextBlock";

type viewerPageMainProps = {
  viewerColor:string
  EpisodeData: episodeViewer;
  fontSize: number;
  whiteSpace: number;
  interval: number;
  fontStyle: string;

};

function ViewerPageMain({
  EpisodeData,
  viewerColor,
  fontSize,
  fontStyle,
  interval,
  whiteSpace,
}: viewerPageMainProps) {
  const contents = EpisodeData.contents;


  return (
    <>
      <Container
        fontSize={fontSize}
        fontStyle={fontStyle}
        whiteSpace={whiteSpace}
      >
        {contents.map((content, index) => (
          <TextBlock viewerColor={viewerColor} interval={interval} key={index}>
            <ViewerPageTextBlock 
            content={content}
            />
          </TextBlock>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div<{
  fontStyle: string;
  whiteSpace: number;
  fontSize: number;
}>`
  display: flex;
  flex-direction: column;
  font-family: ${(props) => `${props.fontStyle}`};
  padding: ${(props) => props.whiteSpace * 3}%;
  font-size: ${(props) => props.fontSize * 4}px;
  ${mobile} {
    font-size: ${(props) =>
      props.fontSize == 3 ? 16 : props.fontSize * 5.5}px;
  }
`;
const TextBlock = styled.div<{ interval: number, viewerColor:string }>`
  z-index: 100;
  padding: ${(props) => props.interval * 0.5}rem;
  
`;
const Text = styled.div`
  &.animation {
    animation-name: opacity;
    animation-duration: 1000ms;

    @keyframes opacity {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`

export default ViewerPageMain;
