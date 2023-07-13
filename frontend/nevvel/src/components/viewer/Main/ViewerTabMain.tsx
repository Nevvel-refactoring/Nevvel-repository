import React, { useEffect } from "react";
import { episodeViewer, content } from "viewer";
import styled from "styled-components";
import ViewerTextBlock from "../ViewerTextBlock";
import { event } from "viewer";
import { bigMobile, mobile } from "@/src/util/Mixin";

type viwerMainProps = {
  viewerColor:string;
  tabNumber: number;
  fontSize: number;
  whiteSpace: number;
  interval: number;
  fontStyle: string;
  EpisodeData: episodeViewer;
  setEventCatch: React.Dispatch<React.SetStateAction<boolean>>;
};
function ViewerTabMain({
  viewerColor,
  EpisodeData,
  tabNumber,
  fontSize,
  fontStyle,
  whiteSpace,
  interval,
  setEventCatch,
}: viwerMainProps) {
  useEffect(() => {
    // console.log(fontStyle);
  }, [fontStyle]);

  return (
    <>
      <Container
        fontSize={fontSize}
        fontStyle={fontStyle}
        whiteSpace={whiteSpace}
      >
        {EpisodeData.contents.map((content, index) => (
          <ViewerTextBlock
          viewerColor={viewerColor}
            interval={interval}
            key={index}
            idx={index}
            content={content}
            tabNumber={tabNumber}
            setEventCatch={setEventCatch}
          />
        ))}
      </Container>
    </>
  );
}
{
  /* <ViewerTextBlock key={index}>{content.idx <= tabNumber ? <>{content.context}</> : null}</ViewerTextBlock> */
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
  ${bigMobile} {
    font-size: ${(props) =>
       props.fontSize == 3 ? 16 : props.fontSize * 5.5}px;
  }
  /* color: white; */
  /* opacity: 0.8; */
  /* mix-blend-mode: difference; */
  font-weight: 100;
`;

export default ViewerTabMain;
