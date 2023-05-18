import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { episode, postEpisode } from "editor";

import { useRouter } from "next/router";
import { Modal } from "../common/Modal";
import EditorPreview from "./Head/EditorPreview";
import { AiFillCheckCircle } from "react-icons/ai";
import { useAtomValue, useAtom } from "jotai";
import { assetOpenAtom, nowTextBlockAtom,totalEventAtom,totalEventCheckAtom } from "@/src/store/EditorAssetStore";
import springApi from "@/src/api";
import { content } from "editor";
import { BiImageAdd } from "react-icons/bi";

import { AiOutlineSound } from "react-icons/ai";

import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import { mobile } from "@/src/util/Mixin";
type EditorHeadProps = {
  setEpisode: React.Dispatch<React.SetStateAction<episode>>;
  episode: episode;
};

function EditorHead({ episode, setEpisode }: EditorHeadProps) {
  const router = useRouter();
  const id = Number(router.query.id);
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
  const [toggle, setToggle] = useState(false);
  const [assetOpen, setAssetOpen] = useAtom(assetOpenAtom);
  const [nowTextBlock, setNowTextBlock] = useAtom(nowTextBlockAtom);
  const totalEventValue = useAtomValue(totalEventAtom)
  const totalEventCheckValue = useAtomValue(totalEventCheckAtom)
  useEffect(()=>{
    console.log(totalEventValue)
  },[totalEventCheckValue])

  useEffect(() => {
    if (toggle) {
      if (postModalOpen && postEpisode) {
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
    relocationHandler();
    setRelocation([]);
    if (episode.title == "") {
      alert("제목을 입력해주세요");
    } else if (episode.contents.length == 0) {
      alert("내용을 입력해주세요");
    } else {
      if (episode.statusType == "TEMPORARY") {
        setEpisode({ ...episode, statusType: "PUBLISHED" });
      }
      if(totalEventValue.event.length !==0){
        episode.contents.unshift(totalEventValue)
      }
      setPostModalOpen(true);
      setPostEpisode(episode);
    }
  };

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
      } else if (e == "cancel") {
        relocationHandler();
        setPostModalOpen(false);
        setSaveToast(true);
        setPointChange(0);
        setReservationDate({
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          date: new Date().getDate(),
          hours: new Date().getHours() + 1,
          minutes: "00",
        });
        episode.contents.shift()
        setToggle(false);
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
      console.log(postEpisode);
      console.log(error);
    }
    // setPostedEpisodeId(320);
  };

  const ReservationHandler = async () => {
    try {
      const res = await springApi.post("/episodes");
      if (res.status === 201) {
        console.log(res);
        setPostedEpisodeId(res.data);
      }
    } catch (error) {
      console.log(error);
      console.log(reservationEpisode);
    }
    // setPostedEpisodeId(320);
  };

  const puthandler = async () => {
    console.log(postEpisode);
    try {
      const res = await springApi.put(`/episodes/${eid}`, {
        coverId: id,
        statusType: "PUBLISHED",
        title: postEpisode?.title,
        point: postEpisode?.point,
        contents: postEpisode?.contents,
      });
      if (res) {
        console.log(res);
        router.push({
          pathname: "/viewer/[id]",
          query: { id: eid },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const relocationHandler = () => {
    if (
      episode.contents[episode.contents.length - 1]?.idx !=
      episode.contents.length
    ) {
      episode.contents.map((content, index) => {
        console.log(index);
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

  const previewHandler = () => {
    relocationHandler();
    setModalOpen(true);
  };

  const HandleChange = (e: string) => {
    if (e == "-" && pointChange > 0) {
      setPointChange(pointChange - 100);
    } else if (e == "+") setPointChange(pointChange + 100);
  };

  useEffect(() => {
    if (postEpisode) {
      setPostEpisode({ ...postEpisode, point: pointChange });
    }
  }, [pointChange]);

  // 날짜 예외 처리
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
    return () => {
      // if(reservationEpisode){
      //   setReservationEpisode(
      //     {...reservationEpisode,
      //       reservationTime:`${reservationDate.year}-${reservationDate.month}-${reservationDate.date}T${reservationDate.hours}:${reservationDate.minutes}:00`})
      // }
    };
  }, [reservationDate]);

  const TimeHandler = () => {
    if (reservationEpisode) {
      setReservationEpisode({
        ...reservationEpisode,
        reservationTime: `${reservationDate.year}-${reservationDate.month}-${reservationDate.date}T${reservationDate.hours}:${reservationDate.minutes}:00`,
      });
    }
  };

  useEffect(() => {
    if (reservationEpisode?.reservationTime !== "") {
      console.log("여기 오나");
      ReservationHandler();
    }
  }, [reservationEpisode]);

  // useEffect(()=>{
  //   console.log(reservationEpisode)
  // },[reservationEpisode])

  const DateChange = (e: string) => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    +1;
    let date = today.getDate();
    let hours = today.getHours();
    if (e == "year+") {
      setReservationDate({
        ...reservationDate,
        year: reservationDate.year + 1,
      });
    } else if (e == "year-" && reservationDate.year > year) {
      setReservationDate({
        ...reservationDate,
        year: reservationDate.year - 1,
      });
    }
    // 월은 12월 개념
    else if (e == "month+" && reservationDate.month < 12) {
      setReservationDate({
        ...reservationDate,
        month: reservationDate.month + 1,
      });
    } else if (e == "month-") {
      // 같은 년도 인 경우에는 날짜가 현재 날짜보다 커야함
      if (reservationDate.year == year && reservationDate.month > month) {
        setReservationDate({
          ...reservationDate,
          month: reservationDate.month - 1,
        });
      } else if (reservationDate.month > 1) {
        setReservationDate({
          ...reservationDate,
          month: reservationDate.month - 1,
        });
      }
      //
    } else if (e == "date+") {
      if (
        (reservationDate.month == 1 && reservationDate.date < 31) ||
        (reservationDate.month == 3 && reservationDate.date < 31) ||
        (reservationDate.month == 5 && reservationDate.date < 31) ||
        (reservationDate.month == 7 && reservationDate.date < 31) ||
        (reservationDate.month == 8 && reservationDate.date < 31) ||
        (reservationDate.month == 10 && reservationDate.date < 31) ||
        (reservationDate.month == 12 && reservationDate.date < 31)
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      } else if (
        (reservationDate.month == 4 && reservationDate.date > 30) ||
        (reservationDate.month == 6 && reservationDate.date > 30) ||
        (reservationDate.month == 9 && reservationDate.date > 30) ||
        (reservationDate.month == 11 && reservationDate.date > 30)
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      } else if (reservationDate.month == 2 && reservationDate.date < 28) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      } else if (
        // 윤년
        reservationDate.year % 4 == 0 &&
        reservationDate.year % 100 !== 0 &&
        reservationDate.month == 2 &&
        reservationDate.date > 29
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      } else if (
        // 윤년
        reservationDate.year % 400 == 0 &&
        reservationDate.year % 100 == 0 &&
        reservationDate.month == 2 &&
        reservationDate.date > 29
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      }
    } else if (e == "date-") {
      if (
        reservationDate.month == month &&
        reservationDate.date > date &&
        reservationDate.date > 1
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date - 1,
        });
      } else if (reservationDate.date > 1) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date - 1,
        });
      }
    } else if (e == "hours+" && reservationDate.hours < 23) {
      setReservationDate({
        ...reservationDate,
        hours: reservationDate.hours + 1,
      });
    } else if (e == "hours-") {
      if (reservationDate.date == date && reservationDate.hours > hours) {
        setReservationDate({
          ...reservationDate,
          hours: reservationDate.hours - 1,
        });
      } else if (reservationDate.hours >= 1) {
        setReservationDate({
          ...reservationDate,
          hours: reservationDate.hours - 1,
        });
      }
    } else if (e == "minutes+" || e == "minutes-") {
      if (reservationDate.minutes == "00") {
        setReservationDate({
          ...reservationDate,
          minutes: "30",
        });
      } else if (reservationDate.minutes == "30") {
        setReservationDate({
          ...reservationDate,
          minutes: "00",
        });
      }
    }
  };

  // useEffect(()=>{
  //   setReservationDate({...reservationDate,})
  // },[reservationDate])

  const AssetHandler = (e: number) => {
    if (e === 1) {
      setAssetOpen(1);
      setNowTextBlock(0);

    } else if(e === 2 ) {
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
      </InputWrapper>
      <TotalAssetButtonContainer>
        {totalEventValue&& totalEventValue.event.length !== 0?(<Color>{totalEventValue.event[0]?.type}{totalEventValue.event[1]?.type}</Color>):(null) }
      <AssetButton onClick={() => AssetHandler(1)}>
        <BiImageAdd className="image" size="24" />
      </AssetButton>
      <AssetButton onClick={() => AssetHandler(2)}>
        <AiOutlineSound className="sound" size="24" />
      </AssetButton>

      </TotalAssetButtonContainer>
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
              {!eid ? (
                <ModalContainer>
                  <ModalPostHeader>발행</ModalPostHeader>
                  <ModalPostForm>
                    <ModalListItem>
                      제목
                      <div>{postEpisode?.title}</div>
                    </ModalListItem>
                    <ModalListItem>
                      포인트
                      <div>{pointChange}point</div>
                      <BtnContainer>
                        <Btn onClick={() => HandleChange("-")}>
                          <BiCaretDown />
                        </Btn>
                        <Btn onClick={() => HandleChange("+")}>
                          <BiCaretUp />
                        </Btn>
                      </BtnContainer>
                    </ModalListItem>
                    <ModalListItem>
                      발행시간 설정
                      <ToggleBtnContainer onClick={() => setToggle(true)}>
                        <ToggleBtn
                          toggle={toggle}
                          className="reserve"
                        ></ToggleBtn>
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
                          <ModalListItemData>
                            <div>{reservationDate.year}년</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("year-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("year+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                            <div>{reservationDate.month}월</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("month-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("month+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                            <div>{reservationDate.date}일</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("date-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("date+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                            <div>{reservationDate.hours}시</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("hours-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("hours+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                            <div>{reservationDate.minutes}분</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("minutes-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("minutes+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                          </ModalListItemData>
                        </ModalListItem>
                        <BottomBtn>
                          <PostBtn className="first" onClick={TimeHandler}>
                            등록
                          </PostBtn>
                          <PostBtn
                            className="choice"
                            onClick={() => saveHandler("cancel")}
                          >
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
                          <PostBtn className="first" onClick={postHandler}>
                            등록
                          </PostBtn>
                          <PostBtn
                            className="choice"
                            onClick={() => saveHandler("cancel")}
                          >
                            취소
                          </PostBtn>
                        </BottomBtn>
                      </>
                    )}
                  </ModalPostForm>
                </ModalContainer>
              ) : (
                <ModalContainer>
                  현재 수정한 상태로 발행하시겠습니까 ?
                  <ModalPostForm>
                    <div>{reservationEpisode?.title}</div>
                    <button onClick={() => HandleChange("-")}>-</button>
                    <div>{pointChange}point</div>
                    <button onClick={() => HandleChange("+")}>+</button>
                    <button onClick={() => setToggle(!toggle)}>toggle</button>
                    {toggle ? (
                      <>
                        <ModalListItem>
                          예약날짜
                          <ModalListItemData>
                            <div>{reservationDate.year}년</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("year-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("year+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                            <div>{reservationDate.month}월</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("month-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("month+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                            <div>{reservationDate.date}일</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("date-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("date+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                            <div>{reservationDate.hours}시</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("hours-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("hours+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                            <div>{reservationDate.minutes}분</div>
                            <BtnContainer>
                              <Btn onClick={() => DateChange("minutes-")}>
                                <BiCaretDown />
                              </Btn>
                              <Btn onClick={() => DateChange("minutes+")}>
                                <BiCaretUp />
                              </Btn>
                            </BtnContainer>
                          </ModalListItemData>
                          <PostBtn onClick={TimeHandler}>등록</PostBtn>
                          <PostBtn onClick={() => saveHandler("cancel")}>
                            취소
                          </PostBtn>
                        </ModalListItem>
                      </>
                    ) : (
                      <>
                        <ModalListItem className="now">
                          등록을 누르시면 바로 발행 됩니다.
                        </ModalListItem>
                        <BottomBtn>
                          <PostBtn className="first" onClick={postHandler}>
                            등록
                          </PostBtn>
                          <PostBtn
                            className="choice"
                            onClick={() => saveHandler("cancel")}
                          >
                            취소
                          </PostBtn>
                        </BottomBtn>
                      </>
                    )}
                  </ModalPostForm>
                </ModalContainer>
              )}
            </Container>
          }
        />
      )}
    </Wrapper>
  );
}
const Color = styled.div`
  color:black;
`

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
  width: 100%;
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

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
`;
const BackGroundAssetContainer = styled.div`
  /* box-shadow: 0px 0px 3px gray; */
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  width: 30%;
  height: 2rem;
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

const ModalContainer = styled.div`
  padding: 2rem;
  padding-top: 1rem;
`;
const ModalPostForm = styled.div`
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  width: 100%;
  height: 65vh;
  justify-content: space-between;
`;

const ModalPostHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.opacityText3};
`;
const ModalListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &.now {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;
const ModalListItemData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Btn = styled.div`
  display: flex;
  text-align: center;
`;

const ToggleBtnText = styled.div``;

const ToggleBtn = styled.div<{ toggle: boolean }>`
  background-color: ${(props) =>
    props.toggle
      ? ({ theme }) => theme.color.hover
      : ({ theme }) => theme.color.background};
  &.reserve {
    background-color: ${(props) =>
      props.toggle
        ? ({ theme }) => theme.color.hover
        : ({ theme }) => theme.color.background};
  }
  &.now {
    background-color: ${(props) =>
      props.toggle
        ? ({ theme }) => theme.color.background
        : ({ theme }) => theme.color.hover};
  }
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  padding: 0.2rem;
  border: 1px solid gray;
  cursor: pointer;
`;
const ToggleBtnContainer = styled.div`
  width: 4.5rem;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const PostBtn = styled.button`
  /* border: 1px solid ${({ theme }) => theme.color.text1}; */
  box-shadow: 0px 0px 1px ${({ theme }) => theme.color.text1};
  width: 10rem;
  height: 2rem;
  border-radius: 10px;
  margin-left: 0.5rem;
  &.first {
    background-color: ${({ theme }) => theme.color.text1};
    color: ${({ theme }) => theme.color.text2};
  }
  &.choice {
    background-color: ${({ theme }) => theme.color.text2};
    color: ${({ theme }) => theme.color.text1};
  }
`;

const BottomBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TotalAssetButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 25%;
  margin-right: 30%;

`

export default EditorHead;
