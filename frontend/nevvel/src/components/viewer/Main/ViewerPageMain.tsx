import React, { useEffect, useRef } from "react";
import { EpisodeView } from "viewer";
import styled from "styled-components";
import { mobile } from "@/src/util/Mixin";
import ViewerPageTextBlock from "../ViewerPageTextBlock";

type viewerPageMainProps = {
  EpisodeData: EpisodeView;
  fontSize: number;
  whiteSpace: number;
  interval: number;
  fontStyle: string;

};

function ViewerPageMain({
  EpisodeData,
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
          <TextBlock interval={interval} key={index}>
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
      props.fontSize == 3 ? 12 : props.fontSize * 3.5}px;
  }
`;
const TextBlock = styled.div<{ interval: number }>`
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
