import React from "react";
import styled from "styled-components";
import { episode } from "editor";

type EditorHeadProps ={
  setEpisode:React.Dispatch<React.SetStateAction<episode>>
  episode:episode
}

function EditorHead({episode, setEpisode}:EditorHeadProps) {
  const Titlehandler = (e:any) => {
    setEpisode({
      ...episode,
      [e.target.name]:e.target.value
    })
  }

  return (
    <Wrapper>
      <ButtonWrapper>
        <NovelButtonContainer>
          <NovelButton>소설선택</NovelButton>
        </NovelButtonContainer>
        <WriteButtonContainer>
          <WriteButton>미리보기</WriteButton>
          <WriteButton>임시저장</WriteButton>
          <WriteButton>발행하기</WriteButton>
        </WriteButtonContainer>
      </ButtonWrapper>
      <InputWrapper>
        <TitleInput 
          value={episode.title}
          onChange={Titlehandler}
          name="title"
         placeholder="에피소드 명을 입력하세요" />
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
 padding-top: 3rem;
 padding-bottom: 2rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NovelButtonContainer = styled.div``;
const NovelButton = styled.button`
  color: ${({ theme }) => theme.color.text1};
  border: 2px solid ${({ theme }) => theme.color.button};
  margin: 1px;
  border-radius: 10px;
  height: 2.75rem;
  width: 5rem;
`;
const WriteButtonContainer = styled.div``;

const WriteButton = styled.button`
  color: ${({ theme }) => theme.color.text1};
  border: 2px solid ${({ theme }) => theme.color.point};
  margin: 1px;
  border-radius: 10px;
  height: 2.75rem;
  width:5rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  height: 32px;
  font-size: 24px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid gray;
  padding-left: 1rem;
  background-color: ${({ theme })=>theme.color.background};
 
  ::placeholder{
    font-size: 28px;
  }
`;
const TagInput = styled.input`
  margin-bottom: 10px;
  border:none;
  padding-left: 1rem;
  background-color: ${({ theme })=>theme.color.background};
`;

export default EditorHead;
