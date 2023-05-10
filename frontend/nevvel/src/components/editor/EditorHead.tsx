import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { episode } from "editor";
import { useRouter } from "next/router";
import { Modal } from "../common/Modal";
import EditorPreview from "./Head/EditorPreview";
import { AiFillCheckCircle } from "react-icons/ai";
import { useAtomValue } from "jotai";
import { assetOpenAtom } from "@/src/store/EditorAssetStore";

type EditorHeadProps = {
  setEpisode: React.Dispatch<React.SetStateAction<episode>>;
  episode: episode;
};

function EditorHead({ episode, setEpisode }: EditorHeadProps) {
  const router = useRouter();
  const [postEpisode, setPostEpisode] = useState<episode>();
  const [modalOpen, setModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const assetOpen = useAtomValue(assetOpenAtom)  
  useEffect(() => {
    console.log(episode);
  }, [episode]);

  useEffect(() => {
    if (saveToast) {
      setTimeout(() => setSaveToast(false), 2000);
    }
  }, [saveToast]);

  const Titlehandler = (e: any) => {
    setEpisode({
      ...episode,
      [e.target.name]: e.target.value,
    });
  };

  const PublishHandler = () => {
    setPostEpisode(episode);
    if (postEpisode) {
      router.push({
        pathname: "/viewer/[id]",
        query: { id: 1 },
      });
    }
  };

  const saveHandler = () => {
    // 임시저장 axios 연결하면 제대로 해보기..
    setSaveToast(true);
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <WriteButtonContainer>
          <WriteButton onClick={() => setModalOpen(true)}>미리보기</WriteButton>
          <WriteButton onClick={saveHandler}>임시저장</WriteButton>
          <WriteButton onClick={PublishHandler}>발행하기</WriteButton>
        </WriteButtonContainer>
      </ButtonWrapper>
      <InputWrapper assetOpen={assetOpen}>
        <TitleInput
          value={episode.title}
          onChange={Titlehandler}
          name="title"
          placeholder="에피소드 명을 입력하세요"
        />
      <BackGroundAssetContainer>전체 에셋</BackGroundAssetContainer>
      </InputWrapper>
      {modalOpen && (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="1200"
          height="600"
          element={
            <div>
              <EditorPreview postEpisode={episode} />
            </div>
          }
        />
      )}
      {saveToast && (
        <ToastContainer assetOpen={assetOpen}>
          <AiFillCheckCircle />
          임시저장 되었습니다.
        </ToastContainer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WriteButtonContainer = styled.div``;

const WriteButton = styled.button`
  color: ${({ theme }) => theme.color.point};
  /* border: 3px solid ${({ theme }) => theme.color.point}; */
  margin: 1px;
  border-radius: 10px;
  height: 2.75rem;
  width: 5rem;
  font-weight: 700;
`;
const InputWrapper = styled.div<{assetOpen:number}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-left:${(props)=>(props.assetOpen ?(30):(20))}%;
  padding-right: ${(props)=>(props.assetOpen ?(15):(20))}%;
`;

const TitleInput = styled.input`
  height: 2rem;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  /* background-color: ${({ theme }) => theme.color.hover}; */
  padding: 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 16px;
    /* box-shadow: 0px 0px 3px gray; */
  width: 70%;
  ::placeholder {
    font-size: 1.5rem;
  }
`;
const BackGroundAssetContainer = styled.div`
 /* box-shadow: 0px 0px 3px gray; */
 padding: 1rem;
 margin-bottom: 1rem;
 border-radius: 10px;
 width: 30%;
 height: 2rem;
`

const ToastContainer = styled.div<{assetOpen:number}>`
  margin-top: 1rem;
  position: fixed;
  background-color: ${({ theme }) => theme.color.point};
  width: 10rem;
  height: 2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 0.5rem gray;
  border-radius: 0.5rem;
  transition: 0.1s ease-in;
  animation: slidein--bottom 0.5s;
  left: ${(props)=>(props.assetOpen ?(30):(20))}vw;

  @keyframes slidein--bottom {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default EditorHead;
