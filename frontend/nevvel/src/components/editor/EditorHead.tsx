import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { episode } from "editor";
import { useRouter } from "next/router";
import { Modal } from "../common/Modal";
import EditorPreview from "./Head/EditorPreview";
import { AiFillCheckCircle } from "react-icons/ai";
import { useAtomValue } from "jotai";
import { assetOpenAtom } from "@/src/store/EditorAssetStore";
import springApi from "@/src/api";

type EditorHeadProps = {
  setEpisode: React.Dispatch<React.SetStateAction<episode>>;
  episode: episode;
};

function EditorHead({ episode, setEpisode }: EditorHeadProps) {
  const router = useRouter();
  const eid = router.query.eid;
  const [postEpisode, setPostEpisode] = useState<episode>();
  const [modalOpen, setModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const assetOpen = useAtomValue(assetOpenAtom);
  const [postedEpisodeId, setPostedEpisodeId] = useState<number>();

  useEffect(() => {
    console.log(episode);
  }, [episode]);

  useEffect(() => {
    if (saveToast) {
      setTimeout(() => setSaveToast(false), 2000);
    }
  }, [saveToast]);
  useEffect(() => {
    if (postedEpisodeId) {
      router.push({
        pathname: "/viewer/[id]",
        query: { id: postedEpisodeId },
      });
    }
  }, [postedEpisodeId]);

  useEffect(() => {
    if (saveToast) {
      setPostEpisode(episode);
      console.log(saveToast);
    }
  }, [saveToast]);

  useEffect(() => {
    console.log(postEpisode);
    if (postEpisode?.statusType == "TEMPORARY") {
      postHandler();
    }
  }, [postEpisode]);

  const Titlehandler = (e: any) => {
    setEpisode({
      ...episode,
      [e.target.name]: e.target.value,
    });
  };

  const PublishHandler = () => {
    if (episode.title == "") {
      alert("제목을 입력해주세요");
    } else if (episode.contents.length == 0) {
      alert("내용을 입력해주세요");
    } else {
      if (episode.statusType == "TEMPORARY") {
        setEpisode({ ...episode, statusType: "PUBLISHED" });
      }
      setPostEpisode(episode);
      setPostModalOpen(true);
    }
  };

  const saveHandler = (e: string) => {
    // 임시저장 axios 연결하면 제대로 해보기..
    if (episode.title == "") {
      alert("제목을 입력해주세요");
    } else if (episode.contents.length == 0) {
      alert("내용을 입력해주세요");
    } else {
      if (e == "save") {
        // 임시 저장을 클릭 했다면
        setSaveToast(true);
      } else if (e == "cancel") {
        setPostModalOpen(false);
        setSaveToast(true);
      }
      setEpisode({ ...episode, statusType: "TEMPORARY" });
    }
  };

  const postHandler = async () => {
    try {
      const res = await springApi.post("/episodes", postEpisode);
      if (res.status === 201) {
        console.log(res);
        setPostedEpisodeId(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    // setPostedEpisodeId(320);
  };

  const puthandler = async () => {
   console.log(postEpisode)
     try {
    const res = await springApi.put(`/episodes/${eid}`,{coverId: 296,
    statusType: "PUBLISHED",
    title: "쥰하자",
    point: 0,
    contents: [
        {
            idx: 1,
            context: "하이준",
            event: []
        },   
    ]
});
      if (res) {
        console.log(res);
        router.push({
          pathname:'/viewer/[id]',
          query:{id:eid}
        })
     }
  }
   catch(error){
     console.log(error)
   }
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <WriteButtonContainer>
          <WriteButton onClick={() => setModalOpen(true)}>미리보기</WriteButton>
          {!eid && (
            <WriteButton onClick={() => saveHandler("save")}>
              임시저장
            </WriteButton>
          )}
         <WriteButton onClick={PublishHandler}>발행하기</WriteButton>
        </WriteButtonContainer>
      </ButtonWrapper>
      <InputWrapper assetOpen={assetOpen}>
        <SeriesTitle>여기다 시리즈 제목 넣으면 됩니다.</SeriesTitle>
        <TitleInput
          value={episode.title}
          onChange={Titlehandler}
          name="title"
          placeholder="에피소드 명을 입력하세요"
        />
        {/* <BackGroundAssetContainer>전체 에셋</BackGroundAssetContainer> */}
      </InputWrapper>
      {modalOpen && (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="600"
          height="800"
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
      {postModalOpen && (
        <Modal
          modal={postModalOpen}
          setModal={setPostModalOpen}
          width="1200"
          height="600"
          element={
            <div>
              {!eid && <>발행하시겠습니까?
              <button onClick={postHandler}>네</button>
              <button onClick={() => saveHandler("cancel")}>아니요</button>
              </>}
              {eid && <>현재 수정한 상태로 발행하시겠습니까
              ?
              <button onClick={puthandler}>네</button>
              <button onClick={() => saveHandler("cancel")}>아니요</button>
              </>}
            </div>
          }
        />
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
const InputWrapper = styled.div<{ assetOpen: number }>`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  text-align: center;
  align-items: flex-start;
  margin-left: 1.5rem;
  padding-left: ${(props) => (props.assetOpen ? 30 : 20)}%;
  padding-right: ${(props) => (props.assetOpen ? 15 : 20)}%;
`;
const SeriesTitle = styled.div`
  color: ${({ theme }) => theme.color.point};
  padding-left: 1.5rem;
  font-size: 12px;
`;

const TitleInput = styled.input`
  height: 2rem;
  font-size: 1.5rem;
  padding-left: 1rem;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
  padding: 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1.5rem;
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
`;

const ToastContainer = styled.div<{ assetOpen: number }>`
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
  left: ${(props) => (props.assetOpen ? 30 : 20)}vw;

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
