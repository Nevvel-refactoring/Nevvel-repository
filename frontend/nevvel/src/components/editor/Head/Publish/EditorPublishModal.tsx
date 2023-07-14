import React, { useState, useEffect } from "react";
import { episode, postEpisode, date } from "editor";
import {
  ModalContainer,
  ModalPostHeader,
  ModalPostForm,
  ModalListItem,
  ToggleBtnContainer,
  ToggleBtn,
  ToggleBtnText,
  BottomBtn,
  PostBtn,
} from "../../styles/Editor.styled";
import springApi from "@/src/api";

import EditorPublishPoint from "./EditorPublishPoint";
import EditorPublishDate from "./EditorPublishDate";
import { useRouter } from "next/router";

type EditorPublishModalProps = {
  postEpisode: episode | undefined;
  reservationEpisode: postEpisode | undefined;
  setReservationEpisode: React.Dispatch<
    React.SetStateAction<postEpisode | undefined>
  >;
  pointChange: number;
  setPointChange: React.Dispatch<React.SetStateAction<number>>;
  reservationDate: date;
  setReservationDate: React.Dispatch<React.SetStateAction<date>>;
  setPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditorPublishModal({
  postEpisode,
  reservationEpisode,
  setReservationEpisode,
  pointChange,
  setPointChange,
  reservationDate,
  setReservationDate,
  setPostModalOpen,
}: EditorPublishModalProps) {
  const router = useRouter();
  const id = Number(router.query.id);
  const eid = Number(router.query.eid);
  const [toggle, setToggle] = useState(false);
  const [postedEpisodeId, setPostedEpisodeId] = useState<number>();

  useEffect(() => {
    if (toggle) {
      if (postEpisode) {
        setReservationEpisode({
          coverId: postEpisode.coverId,
          statusType: "PUBLISHED",
          point: pointChange,
          title: postEpisode.title,
          contents: postEpisode.contents,
          reservation: true,
          reservationTime: "",
        });
      }
    }
  }, [toggle]);

  // 발행 되었을 때 router를 통해서 뷰어로 이동하는 useEffect
  useEffect(() => {
    if (postedEpisodeId) {
      router.push({
        pathname: "/viewer/[id]",
        query: { id: postedEpisodeId },
      });
    }
  }, [postedEpisodeId]);

  // 임시저장 상태였다가 발행 할려고 할 때 사용 된 useEffect.. useEffect 굳이 안써도 될듯
  useEffect(() => {
    if (postEpisode?.statusType == "TEMPORARY") {
      postHandler();
    }
  }, [postEpisode]);

  // 예약 시간 지정 함수
  const TimeHandler = () => {
    if (reservationEpisode) {
      setReservationEpisode({
        ...reservationEpisode,
        reservationTime: `${reservationDate.year}-${reservationDate.month}-${reservationDate.date}T${reservationDate.hours}:${reservationDate.minutes}:00`,
      });
    }
  };

  // 등록하기 눌렀을 때 실행되는 함수
  const postHandler = async () => {
    try {
      const res = await springApi.post("/episodes", postEpisode);
      if (res.status === 201) {
        setPostedEpisodeId(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 에피소드 수정 함수
  const puthandler = async () => {
    try {
      const res = await springApi.put(`/episodes/${eid}`, {
        coverId: id,
        statusType: "PUBLISHED",
        title: postEpisode?.title,
        point: postEpisode?.point,
        contents: postEpisode?.contents,
      });
      if (res) {
        router.push({
          pathname: "/viewer/[id]",
          query: { id: eid },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => {
    setPostModalOpen(false);
    setPointChange(0);
    setReservationDate({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      hours: new Date().getHours() + 1,
      minutes: "00",
    });
    setToggle(false);
  };

  return (
    <ModalContainer>
      {!eid ? (
        <ModalPostHeader>발행</ModalPostHeader>
      ) : (
        <ModalPostHeader>현재 수정한 상태로 발행하시겠습니까 ?</ModalPostHeader>
      )}
      <ModalPostForm>
        <ModalListItem>
          제목
          <div>{postEpisode?.title}</div>
        </ModalListItem>
        <ModalListItem>
          포인트
          <EditorPublishPoint
            pointChange={pointChange}
            setPointChange={setPointChange}
          />
        </ModalListItem>
        <ModalListItem>
          발행시간 설정
          <ToggleBtnContainer onClick={() => setToggle(true)}>
            <ToggleBtn toggle={toggle} className="reserve"></ToggleBtn>
            <ToggleBtnText>예약발행</ToggleBtnText>
          </ToggleBtnContainer>
          <ToggleBtnContainer onClick={() => setToggle(false)}>
            <ToggleBtn toggle={toggle} className="now"></ToggleBtn>
            <ToggleBtnText>바로발행</ToggleBtnText>
          </ToggleBtnContainer>
        </ModalListItem>

        {toggle ? (
          <>
            <ModalListItem>
              예약날짜
              <EditorPublishDate
                reservationDate={reservationDate}
                setReservationDate={setReservationDate}
              />
            </ModalListItem>
            <BottomBtn>
              <PostBtn className="first" onClick={TimeHandler}>
                등록
              </PostBtn>
              <PostBtn className="choice" onClick={cancelHandler}>
                취소
              </PostBtn>
            </BottomBtn>
          </>
        ) : (
          <>
            {!eid ? (
              <>
                <ModalListItem className="now">
                  등록을 누르시면 바로 발행 됩니다.
                </ModalListItem>
                <BottomBtn>
                  <PostBtn className="first" onClick={postHandler}>
                    등록
                  </PostBtn>
                  <PostBtn className="choice" onClick={cancelHandler}>
                    취소
                  </PostBtn>
                </BottomBtn>
              </>
            ) : (
              <>
                <ModalListItem className="now">
                  등록을 누르시면 바로 발행 됩니다.
                </ModalListItem>
                <BottomBtn>
                  <PostBtn className="first" onClick={puthandler}>
                    등록
                  </PostBtn>
                  <PostBtn className="choice" onClick={cancelHandler}>
                    취소
                  </PostBtn>
                </BottomBtn>
              </>
            )}
          </>
        )}
      </ModalPostForm>
    </ModalContainer>
  );
}

export default EditorPublishModal;
