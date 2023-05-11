import React, { useEffect } from "react";
import { EpisodeView } from "viewer";
import styled from "styled-components";
import ViewerTextBlock from "../ViewerTextBlock";
import { event } from "viewer";
import { mobile } from "@/src/util/Mixin";

type viwerMainProps = {
  tabNumber: number;
  fontSize:number;
  whiteSpace: number;
  interval: number;
  fontStyle: string;
  EpisodeData: EpisodeView;
  setEventCatch: React.Dispatch<React.SetStateAction<boolean>>;
};
function ViewerTabMain({
  EpisodeData,
  tabNumber,
  fontSize,
  fontStyle,
  whiteSpace,
  interval,
  setEventCatch,
}: viwerMainProps) {
  const contents = EpisodeData.contents;
  useEffect(() => {
    console.log(fontStyle);
  }, [fontStyle]);
 


  return (
    <>
      <Container
      fontSize={fontSize}
        fontStyle={fontStyle}
        whiteSpace={whiteSpace}

      >
        {contents.map((content, index) => (
          <ViewerTextBlock
            interval={interval}
            key={index}
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
  fontSize:number;
}>`
  display: flex;
  flex-direction: column;
  font-family: ${(props) => `${props.fontStyle}`};
  padding:${(props)=>(props.whiteSpace)*3}%;
  font-size:${(props)=>(props.fontSize)*4}px;
  ${mobile}{
    font-size:${(props)=>props.fontSize == 3 ? (12):(props.fontSize*3.5)}px;
  }

`;



export default ViewerTabMain;
