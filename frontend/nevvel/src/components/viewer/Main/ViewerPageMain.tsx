import React from "react";
import { EpisodeView } from "viewer";
import styled from "styled-components";

type viewerPageMainProps = {
  EpisodeData: EpisodeView;
};

function ViewerPageMain({ EpisodeData }: viewerPageMainProps) {
  const contents = EpisodeData.contents;
  
  return (
    <>
      <Container>
        {contents.map((content, index)=>(
            <div key={index}>
                {content.context}
            </div>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ViewerPageMain;
