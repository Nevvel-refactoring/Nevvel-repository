import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { episode } from "editor";
import { useRouter } from "next/router";
import { Modal } from "../common/Modal";

type EditorHeadProps = {
  setEpisode: React.Dispatch<React.SetStateAction<episode>>;
  episode: episode;
};

function EditorHead({ episode, setEpisode }: EditorHeadProps) {
  const router = useRouter();
  const [postEpisode, setPostEpisode] = useState<episode>();

  useEffect(()=>{
    console.log(episode)
  },[episode])

  const Titlehandler = (e: any) => {
    setEpisode({
      ...episode,
      [e.target.name]: e.target.value,
    });
  };

  const PublishHandler =() => {
    setPostEpisode(episode)
    if (postEpisode){
      router.push({
        pathname: "/viewer/[id]",
        query:{id:1}
      });
    }
  }

  return (
    <Wrapper>
      <ButtonWrapper>
        <WriteButtonContainer>
          <WriteButton>미리보기</WriteButton>
          <WriteButton>임시저장</WriteButton>
          <WriteButton onClick={PublishHandler}>발행하기</WriteButton>
        </WriteButtonContainer>
      </ButtonWrapper>
      <InputWrapper>
        <TitleInput
          value={episode.title}
          onChange={Titlehandler}
          name="title"
          placeholder="에피소드 명을 입력하세요"
        />
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
  justify-content: flex-end;
`;

const WriteButtonContainer = styled.div``;

const WriteButton = styled.button`
  color: ${({ theme }) => theme.color.text1};
  border: 2px solid ${({ theme }) => theme.color.point};
  margin: 1px;
  border-radius: 10px;
  height: 2.75rem;
  width: 5rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  height: 2rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid gray;
  padding-left: 1rem;
  background-color: ${({ theme }) => theme.color.background};

  ::placeholder {
    font-size: 1.75rem;
  }
`;

export default EditorHead;
