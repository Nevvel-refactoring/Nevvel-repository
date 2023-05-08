import React from "react";
import { EpisodeView } from "viewer";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineHome } from "react-icons/ai";
import styled from "styled-components";
type ViewHeaderProps = {
  EpisodeData: EpisodeView;
};

function ViewHeader({ EpisodeData }: ViewHeaderProps) {
  return (
    <>
      <HeaderTopContainer>
        <AiFillCaretLeft  size={24}/>
        <EpisodeTitle>
          <EpisodeTitle>
            <EpisodeHome>
              <AiOutlineHome size={24} />
            </EpisodeHome>
            <>{EpisodeData.title}</>
          </EpisodeTitle>
        </EpisodeTitle>
        <AiFillCaretRight size={24} />
      </HeaderTopContainer>
      <ProgressBar />
    </>
  );
}
const HeaderTopContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`;

const ProgressBar = styled.div``;
const EpisodeTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center
`;
const EpisodeHome = styled.button`
  margin-right: 1rem;
  color: ${({ theme })=> theme.color.text1};
`;

export default ViewHeader;
