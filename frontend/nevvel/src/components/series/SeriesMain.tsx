import React, { useState } from "react";
import styled from "styled-components";
import SeriesMainList from "./SeriesMainList";
import { cover } from "series";

type SeriesMainProps = {
  SeriesData: cover;
};

function SeriesMain({ SeriesData }: SeriesMainProps) {
  const [isLatest, setIsLatest] = useState<boolean>(true);

  return (
    <MainContainer>
      <MainHeader>
        <BtnContainer>
          <SortBtn
            className="firstStory"
            isLatest={!isLatest}
            onClick={() => {
              setIsLatest(false);
            }}
          >
            1화부터
          </SortBtn>
          <SortBtn
            className="newStory"
            isLatest={isLatest}
            onClick={() => {
              setIsLatest(true);
            }}
          >
            최신부터
          </SortBtn>
        </BtnContainer>
        <StoryDiv>
          <p>{SeriesData.episodes.length}개의 스토리</p>
        </StoryDiv>
      </MainHeader>
      <SeriesMainList Info={SeriesData} isLatest={isLatest} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15vh;
`;
const MainHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.opacityText3};
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 14px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const SortBtn = styled.button<{ isLatest: boolean }>`
  color: ${({ theme }) => theme.color.text1};
  &.firstStory {
    margin-right: 0.5rem;
  }
  &.newStory {
    border-left: 1px solid ${({ theme }) => theme.color.text1};
    padding-left: 0.5rem;
  }
  font-weight: ${({ isLatest }) => {
    if (isLatest) {
      return "900";
    }
  }};
`;

const StoryDiv = styled.div`
  p {
    font-size: smaller;
  }
  vertical-align: bottom;
`;

export default SeriesMain;
