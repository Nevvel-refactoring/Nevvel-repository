import React from "react";
import { EpisodeView } from "viewer";
import styled from "styled-components";
import ViewerTextBlock from "../ViewerTextBlock";
import { event } from "viewer";

type viwerMainProps = {
  tabNumber:number
  EpisodeData: EpisodeView;
  setEventCatch: React.Dispatch<React.SetStateAction<boolean>>;
};
function ViewerTabMain({ EpisodeData,tabNumber,setEventCatch }: viwerMainProps) {
  const contents = EpisodeData.contents;

  return (<>
    <Container>
      {contents.map((content, index) => (
       <ViewerTextBlock
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
{/* <ViewerTextBlock key={index}>{content.idx <= tabNumber ? <>{content.context}</> : null}</ViewerTextBlock> */}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  

  `
const TextBlock = styled.div`
  padding: 0.5rem;
`

export default ViewerTabMain;
