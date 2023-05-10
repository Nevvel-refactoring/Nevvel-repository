import React from "react";
import { EpisodeView } from "viewer";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineHome } from "react-icons/ai";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { mobile, tabletH } from "@/src/util/Mixin";

type ViewHeaderProps = {
  EpisodeData: EpisodeView;
};

function ViewHeader({ EpisodeData }: ViewHeaderProps) {
  const router = useRouter();

  const clickHandler = () => {
    router.push({
      pathname:'/series/[id]',
      query:{id:1}
    })
  }
  return (
    <>
      <HeaderTopContainer>
        <AiFillCaretLeft  size={24}/>
          <EpisodeTitleContainer>
            <EpisodeHome>
              <AiOutlineHome onClick={clickHandler} size={24} />
            </EpisodeHome>
            <EpisodeTitle>{EpisodeData.title}</EpisodeTitle>
          </EpisodeTitleContainer>
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
  ${mobile}{
    width: auto;
  }
`;

const ProgressBar = styled.div``;
const EpisodeTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
const EpisodeTitle = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  ${tabletH}{
    width: 80%;
  }
  ${mobile}{
    width: 50%;
  }
`
const EpisodeHome = styled.button`
  margin-right: 1rem;
  color: ${({ theme })=> theme.color.text1};
`;

export default ViewHeader;
