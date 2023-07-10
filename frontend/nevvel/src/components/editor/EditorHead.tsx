import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { episode, postEpisode } from "editor";

import { useRouter } from "next/router";
import { Modal } from "../common/Modal";
import EditorPreview from "./Head/EditorPreview";

import { AiFillCheckCircle } from "react-icons/ai";
import { useAtomValue, useAtom } from "jotai";
import * as A from "@/src/store/EditorAssetStore";
import springApi from "@/src/api";
import { content } from "editor";
import { BiImageAdd } from "react-icons/bi";

import { AiOutlineSound } from "react-icons/ai";
import { mobile } from "@/src/util/Mixin";
import EditorPublishModal from "./Head/Publish/EditorPublishModal";
type EditorHeadProps = {
  setEpisode: React.Dispatch<React.SetStateAction<episode>>;
  episode: episode;
};

function EditorHead({ episode, setEpisode }: EditorHeadProps) {
  const router = useRouter();
  const eid = Number(router.query.eid);
  const title = router.query.title;
  const [postEpisode, setPostEpisode] = useState<episode>();
  const [modalOpen, setModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postedEpisodeId, setPostedEpisodeId] = useState<number>();
  const [reLocation, setRelocation] = useState<content[]>([]);
  const [reservationEpisode, setReservationEpisode] = useState<postEpisode>();
  const [pointChange, setPointChange] = useState<number>(0);
  const [reservationDate, setReservationDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hours: new Date().getHours() + 1,
    minutes: "00",
  });

  const [imageUrl, setImageUrl] = useState<number>();
  const [AudioUrl, setAudioUrl] = useState<number>();

  const [assetOpen, setAssetOpen] = useAtom(A.assetOpenAtom);
  const [nowTextBlock, setNowTextBlock] = useAtom(A.nowTextBlockAtom);
  const [totalEvent, setTotalEvent] = useAtom(A.totalEventAtom);
  const ImageAssetValue = useAtomValue(A.ImageAssetAtom);
  const AudioAssetValue = useAtomValue(A.AudioAssetAtom);

  // 임시 저장 시 알람
  // 임시 저장 성공 했을 때 알람 띄우는 걸로 변경하기
  useEffect(() => {
    if (saveToast) {
      setPostEpisode(episode);
      setTimeout(() => setSaveToast(false), 2000);
    }
  }, [saveToast]);

  //////////////////////////// 함수 //////////////////////////////////////

  // any 바꾸기, 에피소드 제목 바꾸는 함수
  const Titlehandler = (e: any) => {
    setEpisode({
      ...episode,
      [e.target.name]: e.target.value,
    });
  };

  // 발행하기 모달함수
  const PublishHandler = () => {
    relocationHandler(); // 재배치 함수 아마 json 구조 바꾸면서 삭제 될 예정
    setRelocation([]);
    if (episode.title == "") {
      alert("제목을 입력해주세요");
    } else if (episode.contents.length == 0) {
      alert("내용을 입력해주세요");
    } else {
      if (episode.statusType == "TEMPORARY") {
        setEpisode({ ...episode, statusType: "PUBLISHED" });
      }
      if (totalEvent.event.length !== 0) {
        episode.contents.unshift(totalEvent);
      }
      setPostModalOpen(true);
      setPostEpisode(episode);
    }
  };

  // 저장 함수  - 발행함수랑 저장 함수에 같은 로직이 있으니까 코드 길이를 줄이기 위해 합쳐 보는 걸로
  const saveHandler = (e: string) => {
    if (episode.title == "") {
      alert("제목을 입력해주세요");
    } else if (episode.contents.length == 0) {
      alert("내용을 입력해주세요");
    } else {
      if (e == "save") {
        relocationHandler();
        // 임시 저장을 클릭 했다면
        setSaveToast(true);
      }
      setEpisode({ ...episode, statusType: "TEMPORARY" });
    }
  };

  // 발행 예약하기 함수
  const ReservationHandler = async () => {
    try {
      const res = await springApi.post("/episodes");
      if (res.status === 201) {
        setPostedEpisodeId(res.data);
      }
    } catch (error) {
    }
  };

  // 배열 재배치 함수
  const relocationHandler = () => {
    if (
      episode.contents[episode.contents.length - 1]?.idx !=
      episode.contents.length
    ) {
      episode.contents.map((content, index) => {
        reLocation.push({
          idx: index + 1,
          context: content.context,
          event: content.event,
        });
      });
      setEpisode({ ...episode, contents: reLocation });
      setRelocation([]);
    }
  };

  // 미리보기 모달 함수
  const previewHandler = () => {
    relocationHandler();
    setModalOpen(true);
  };

  ////////////////////////// 발행하기 모달 ////////////////////////////////

  useEffect(() => {
    if (postEpisode) {
      setPostEpisode({ ...postEpisode, point: pointChange });
    }
  }, [pointChange]);

  // 날짜 예외 처리 useEffect
  useEffect(() => {
    if (
      (reservationDate.month == 4 && reservationDate.date == 31) ||
      (reservationDate.month == 6 && reservationDate.date == 31) ||
      (reservationDate.month == 9 && reservationDate.date == 31) ||
      (reservationDate.month == 11 && reservationDate.date == 31)
    ) {
      setReservationDate({
        ...reservationDate,
        date: 30,
      });
    }
    return () => {};
  }, [reservationDate]);

  useEffect(() => {
    if (reservationEpisode?.reservationTime !== "") {
      ReservationHandler();
    }
  }, [reservationEpisode]);

  const AssetHandler = (e: number) => {
    if (e === 1) {
      setAssetOpen(1);
      setNowTextBlock(0);
    } else if (e === 2) {
      setAssetOpen(2);
      setNowTextBlock(0);
    }
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <WriteButtonContainer>
          <WriteButton onClick={previewHandler}>미리보기</WriteButton>
          {!eid && (
            <WriteButton onClick={() => saveHandler("save")}>
              임시저장
            </WriteButton>
          )}
          <WriteButton onClick={PublishHandler}>발행하기</WriteButton>
        </WriteButtonContainer>
      </ButtonWrapper>
      <InputWrapper assetOpen={assetOpen}>
        <SeriesTitle>{title}</SeriesTitle>
        <TitleInput
          value={episode.title}
          onChange={Titlehandler}
          name="title"
          placeholder="에피소드 명을 입력하세요"
        />
        <TotalAssetButtonContainer>
          {totalEvent.event.length == 0 ||
          (totalEvent.event.length == 1 &&
            totalEvent.event[0].type === "AUDIO") ? (
            <AssetButton onClick={() => AssetHandler(1)}>
              <BiImageAdd className="image" size="24" />
            </AssetButton>
          ) : (
            <>
              {imageUrl && (
                <Img src={ImageAssetValue[imageUrl]?.thumbnail} alt="썸네일" />
              )}
            </>
          )}
          {totalEvent.event.length == 0 ||
          (totalEvent.event.length == 1 &&
            totalEvent.event[0].type === "IMAGE") ? (
            <AssetButton onClick={() => AssetHandler(2)}>
              <AiOutlineSound className="sound" size="24" />
            </AssetButton>
          ) : (
            <>
              {AudioUrl && (
                <Img src={AudioAssetValue[AudioUrl]?.thumbnail} alt="썸네일" />
              )}
            </>
          )}
        </TotalAssetButtonContainer>
      </InputWrapper>
      {modalOpen && (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="750"
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
      {postModalOpen && (
        <Modal
          modal={postModalOpen}
          setModal={setPostModalOpen}
          width="600"
          height="600"
          element={
            <Container>
              <EditorPublishModal
                postEpisode={postEpisode}
                reservationEpisode={reservationEpisode}
                setReservationEpisode={setReservationEpisode}
                pointChange={pointChange}
                setPointChange={setPointChange}
                reservationDate={reservationDate}
                setReservationDate={setReservationDate}
                setPostModalOpen={setPostModalOpen}
              />
            </Container>
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
  flex-direction: row;
  width: 100%;
  justify-content: center;
  text-align: center;
  align-items: flex-start;
  align-items: center;
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
  width: 100%;
  ::placeholder {
    font-size: 1rem;
  }
  ${mobile} {
    ::placeholder {
      font-size: 12px;
    }
  }
`;


const AssetButton = styled.button`
  width: 3.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 0.3rem;
  border: 2px solid ${({ theme }) => theme.color.hover};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.hover};
  :hover {
    color: ${({ theme }) => theme.color.point};
    border: 2px solid ${({ theme }) => theme.color.point};
  }
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
const Container = styled.div`
  font-size: 16px;
  width: 600px;
  height: 600px;
`;

const TotalAssetButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 5rem;
`;
const Img = styled.img`
  width: 3.5rem;
  height: 2.5rem;
  margin-left: 0.3rem;
  border-radius: 10px;
`;
export default EditorHead;
