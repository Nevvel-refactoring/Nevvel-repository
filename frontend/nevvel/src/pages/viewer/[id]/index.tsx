import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { numAtom } from "@/src/store/ViewerScroll";
import { useRouter } from "next/dist/client/router";
import { useParams } from "next/navigation";
import { GetStaticPaths, GetStaticProps } from "next";

import springApi from "@/src/api";
import { AiFillSetting } from "react-icons/ai";

import { bigMobile, mobile, tabletH } from "@/src/util/Mixin";
import { episodeViewer,newEpisodeViewer } from "viewer";

import ViewHeader from "../../../components/viewer/ViewHeader";
import ViewerTabMain from "../../../components/viewer/Main/ViewerTabMain";
import ViewerPageMain from "@/src/components/viewer/Main/ViewerPageMain";
import ViewerMobileBottom from "@/src/components/viewer/ViewerMobileBottom";
import Dummy_Episode from "../../../components/viewer/DummyEpisodeData.json";

import eyes from "@/src/assets/img/eyes.png";
import SettingBox from "@/src/components/viewer/SettingBox";
import { themeAtom } from "@/src/store/Theme";

function viewer() {
  const router = useRouter();
  const id = router.query.id;
  const [headerToggle, setHeaderToggle] = useState(true); // header on/off
  const [tabNumber, setTabNumber] = useState(1); // tab mode 일 때 사용
  const [eventCatch, setEventCatch] = useState(false); // tab mode 일때 이벤트 있는 경우 사용
  const [settingBox, setSettingBox] = useState(false); // 설정 box 보여 줄 때 사용
  const [writeMode, setWriteMode] = useState(false); // tab or page 모드 설정 토글
  const [audioEventCatch, setAudioEventCatch] = useState(false); // 오디오 재생
  const [fontStyle, setFontStyle] = useState(""); //font_style 변경 ""은 기본 pretendard
  const [fontSize, setFontSize] = useState(3);
  const [whiteSpace, setWhiteSpace] = useState(1);
  const [interval, setInterval] = useState(1);
  const audioRef = useRef<any>(null);
  const scrollRef = useRef<any>();
  const scrollElement = scrollRef.current as HTMLDivElement;
  const [currentScroll, setCurrentScroll] = useState(0);
  const nowTextBlock = useAtomValue(numAtom);
  const [EpisodeData, setEpisodeData] = useState<episodeViewer>();
  const [imageEvent, setImageEvent] = useState<string>("");
  const [audioEvent, setAudioEvent] = useState<string>("");
  const [viewerColor, setViewerColor] = useState<string>("");
  const [headerEpisodeData, setHeaderEpisodeData] = useState<newEpisodeViewer>()
  const [totalImage, setTotalImage] = useState<string>("")
  const [totalAudio, setTotalAudio] =useState<string>("")
  const [backgroundPlay, setBackgroundPlay] =useState(false);
  useEffect(() => {
    console.log(viewerColor);
  }, [viewerColor]);

  // 소설 받아오기 페이지
  const getViewerData = async (Id: number) => {
    try {
      const res = await springApi.get(`/episodes/${Id}`);
      if (res) {
        console.log(res);
        setEpisodeData(res.data);
        setHeaderEpisodeData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      const Id = Number(id);
      console.log("router", Id);
      getViewerData(Id);
      // } else {
      //   setEpisodeData(Dummy_Episode);
    }
    // setEpisodeData(Dummy_Episode); // merge 하기 전에 주석처리! 위에꺼는 해제
  }, [id]);

  useEffect(() => {
    console.log(EpisodeData);
  }, [EpisodeData]);

  useEffect(() => {
    // console 찍었을때 content 젤 마지막 index 값이 나오고 현재 스크롤 마지막 값이 나옴..
    if (EpisodeData) {
      if (nowTextBlock !== EpisodeData.contents.length) {
        if(EpisodeData.contents[nowTextBlock].idx ==0){
          if( EpisodeData.contents[0].event.length ===1 &&EpisodeData.contents[0].event[0].type ==="IMAGE"){
            setTotalImage(EpisodeData.contents[0].event[0].assetUrl)
          }else if(EpisodeData.contents[0].event.length ===1 &&EpisodeData.contents[0].event[0].type ==="AUDIO"){
            setTotalAudio(EpisodeData.contents[0].event[0].assetUrl)
              }else if(EpisodeData.contents[0].event.length ===2){
            setTotalImage(EpisodeData.contents[0].event[0].assetUrl)
            setTotalAudio(EpisodeData.contents[0].event[1].assetUrl)
          }
        }else{
          if (EpisodeData.contents[nowTextBlock].event.length !== 0) {
            const events = EpisodeData.contents[nowTextBlock].event;
            for (const event of events) {
              if (event.type === "IMAGE") {
                // console.log("이미지당");
                setEventCatch(true);
                setImageEvent(event.assetUrl);
              }
              if (event.type === "AUDIO") {
                // console.log("소리당");
                setAudioEventCatch(true);
                setAudioEvent(event.assetUrl);
              }
            }
          }
        }
      }
    }
    return () => {
      if (eventCatch) {
        setEventCatch(false);
      }
      if (audioEventCatch) {
        setAudioEventCatch(false);
      }
    };
    console.log(nowTextBlock);
  }, [nowTextBlock]);

  useEffect(() => {
    if (scrollElement) {
      scrollElement.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [tabNumber]);

  useEffect(()=>{
    console.log(ImageEvent)
  },[ImageEvent])

  useEffect(()=>{
    if(totalAudio!==""){
      setBackgroundPlay(true)
    }else{
      setBackgroundPlay(false)
    }
  },[totalAudio])

  useEffect(() => {
    // tab.ver
    if (EpisodeData) {
      if(EpisodeData.contents[0].idx === 0){
        if( EpisodeData.contents[0].event.length ===1 &&EpisodeData.contents[0].event[0].type ==="IMAGE"){
          setTotalImage(EpisodeData.contents[0].event[0].assetUrl)
        }else if(EpisodeData.contents[0].event.length ===1 &&EpisodeData.contents[0].event[0].type ==="AUDIO"){
          setTotalAudio(EpisodeData.contents[0].event[0].assetUrl)
            }else if(EpisodeData.contents[0].event.length ===2){
          setTotalImage(EpisodeData.contents[0].event[0].assetUrl)
          setTotalAudio(EpisodeData.contents[0].event[1].assetUrl)
        }
      } else{
        if (EpisodeData.contents[tabNumber].event.length !== 0) {
          const events = EpisodeData.contents[tabNumber].event;
          for (const event of events) {
            if (event.type === "IMAGE") {
              console.log("이미지당");
              setEventCatch(true);
              setImageEvent(event.assetUrl);
            }
            if (event.type === "AUDIO") {
              console.log("소리당");
              setAudioEventCatch(true);
              setAudioEvent(event.assetUrl);
            }
          }
        }
      }
      }
    return () => {
      if (eventCatch) {
        setEventCatch(false);
      }
      if (audioEventCatch) {
        setAudioEventCatch(false);
      }
    };
  }, [tabNumber]);

  useEffect(() => {
    if (audioEventCatch) {
      audioRef.current.play();
    }
  }, [audioEventCatch]);

  useEffect(() => {
    if (EpisodeData) {
      const contents = EpisodeData.contents;
      for (const content of contents) {
        console.log(content);
      }
    }
  }, [audioEventCatch]);

  useEffect(() => {
    // 읽는 모드 변경 했을 때 에셋 나와 있으면 안되니까 감지하는 로직

    if (audioEventCatch) {
      setAudioEventCatch(false);
    }
    if (eventCatch) {
      setEventCatch(false);
    }
  }, [writeMode]);

  const clickhandler = (e: string) => {
    console.log(e);
    if (e === "head") {
      setHeaderToggle(true);
    } else if (e === "block") {
      setHeaderToggle(false);
      // 비동기 처리 아직 못했음
    }
  };

  const countHandler = () => {
    if (EpisodeData) {
      const contentLength = EpisodeData.contents.length;
      console.log(contentLength, "contentLength");
      if (tabNumber <= contentLength - 1) {
        setTabNumber(tabNumber + 1);
      } else if (tabNumber === contentLength) {
        console.log("마지막 입니다. ");
      }
      console.log(tabNumber);
    }
  };

  const ClickHandler = () => {
    setHeaderToggle(false);
    setSettingBox(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (EpisodeData) {
        const contentLength = EpisodeData.contents.length;
        console.log(contentLength, "contentLength");
        if (tabNumber <= contentLength - 1) {
          setTabNumber(tabNumber + 1);
        } else if (tabNumber === contentLength) {
          console.log("마지막 입니다. ");
        }
        console.log(tabNumber);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tabNumber]);

  return (
    <>
      {EpisodeData && (
        <ViewerWrapper viewerColor={viewerColor}>
          <HeaderContainer onClick={() => clickhandler("head")}>
            {headerToggle && EpisodeData ? (
              <ViewHeader setTotalImage={setTotalImage} setTotalAudio={setTotalImage} id={id} EpisodeData={EpisodeData} headerEpisodeData={headerEpisodeData}/>
            ) : null}
          </HeaderContainer>
          {backgroundPlay===true && <AudioContainer>
            <AudioPlayer viewerColor={viewerColor} src={`${totalAudio}`} controls loop  />
            BGM
            </AudioContainer>
            }
          <MainWrapper totalImage={totalImage}
                writeMode={writeMode} onClick={ClickHandler}>
            {eventCatch ? <Img src={imageEvent} alt="Logo" /> : null}
            {writeMode ? (
              <MainContainer totalImage={totalImage} writeMode={writeMode}>
                <ViewerPageMain
                  viewerColor={viewerColor}
                  EpisodeData={EpisodeData}
                  fontSize={fontSize}
                  fontStyle={fontStyle}
                  whiteSpace={whiteSpace}
                  interval={interval}
                />
              </MainContainer>
            ) : (
              <MainContainer
              totalImage={totalImage}
                writeMode={writeMode}
                ref={scrollRef}
                onClick={countHandler}
              >
                  <ViewerTabMain
                    viewerColor={viewerColor}
                    fontSize={fontSize}
                    fontStyle={fontStyle}
                    whiteSpace={whiteSpace}
                    interval={interval}
                    EpisodeData={EpisodeData}
                    tabNumber={tabNumber}
                    setEventCatch={setEventCatch}
                  />
              </MainContainer>
            )}
          </MainWrapper>
          <SettingBtn onClick={() => setSettingBox(!settingBox)}>
            <AiFillSetting size="28" />
          </SettingBtn>
          {settingBox ? (
            <>
              <SettingBox
                fontSize={fontSize}
                whiteSpace={whiteSpace}
                interval={interval}
                setFontStyle={setFontStyle}
                setWriteMode={setWriteMode}
                setInterval={setInterval}
                setWhiteSpace={setWhiteSpace}
                setFontSize={setFontSize}
                setViewerColor={setViewerColor}
                viewerColor={viewerColor}
              />
            </>
          ) : null}
          {audioEventCatch && <audio ref={audioRef} src={`${audioEvent}`} />}
          
          <BottomContainer onClick={() => clickhandler("head")}>
            {headerToggle && EpisodeData ? (
              <ViewerMobileBottom
                id={id}
                EpisodeData={EpisodeData}
                setSettingBox={setSettingBox}
                settingBox={settingBox}
                headerEpisodeData={headerEpisodeData}
                setTotalImage={setTotalImage} setTotalAudio={setTotalImage}
              />
            ) : null}
          </BottomContainer>
        </ViewerWrapper>
      )}
    </>
  );
}

const Img = styled.img`
  object-fit: cover;
  position: fixed;
  opacity: 0.7;
  left: 30%;
  z-index: 1;
  width: 40%;
  height: 100%;
  ${tabletH} {
    left: 20%;
    width: 60%;
    height: 70%;
  }
  ${bigMobile} {
    left: 0;
    width: 100%;
    height: 70%;
  }
  ${mobile} {
    left: 0;
    width: 100%;
    height: 70%;
  }
`;

const ViewerWrapper = styled.div<{ viewerColor: string }>`
  background-color: ${(props) => props.viewerColor};
  display: flex;
  flex-direction: column;
  height: 100vh;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${(props) => (props.viewerColor == "#1a1a1a" ? "#fefefe" : "#1a1a1a")};
  ${mobile} {
    font-size: 16px;
  }
  /* font-family: "Malgun Gothic"; */
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15vh;
`;

const BottomContainer = styled.div`
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15vh;
  ${tabletH} {
    visibility: visible;
  }
`;

const MainWrapper = styled.div<{ writeMode: boolean, totalImage:string }>`
  height: 80vh;
  ${bigMobile}{
    background-image: url(${(props)=>props.totalImage});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const MainContainer = styled.div<{ writeMode: boolean, totalImage:string }>`
  height: ${(props) => (props.writeMode ? 50 : 70)}vh;
  margin-left: 30%;
  margin-right: 30%;
  overflow-y: scroll;
  background-image: url(${(props)=>props.totalImage});
  background-size: cover;
  ::-webkit-scrollbar {
    display: none;
  }
  ${tabletH} {
    margin-left: 20%;
    margin-right: 20%;
  }
  ${bigMobile}{
    margin-left: 5%;
    margin-right: 5%;
    background-image:none;
  }

  ${mobile} {
    margin-left: 5%;
    margin-right: 5%;
    background-image:none;

  }
  /* border: 1px solid black; */
`;

const ImageEvent = styled.div`
  /* position: relative; */
  position: fixed;
  opacity: 0.7;
  left: 40%;
  top: 35%;
  z-index: 10;
  width: 600px;
  height: 600px;
  ${tabletH} {
    top: 40%;
    left: 20%;
    width: 500px;
    height: 500px;
  }
  ${mobile} {
    left: 10%;
    width: 300px;
    height: 300px;
  }
`;
const SettingBtn = styled.button`
  position: fixed;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  box-shadow: 0rem 0rem 0.5rem ${({ theme }) => theme.color.text1};
  top: 80%;
  left: 90%;
  color: ${({ theme }) => theme.color.text1};
  ${tabletH} {
    display: none;
  }
  ${mobile} {
    left: 80%;
    display: none;
  }
`;

const AudioPlayer = styled.audio<{ viewerColor: string }>`
  /* 기본적인 스타일링 */
  background-color: ${(props) => props.viewerColor};
  width: 12rem;
  margin-bottom: 10px;
  margin-left: 1rem;
  margin-right: 1rem;
  color:${(props) => props.viewerColor};

  /* 컨트롤러 스타일링 */
  &::-webkit-media-controls-panel {
    display: flex;
    background-color: ${(props) => props.viewerColor};
  }

  /* 재생 및 정지 버튼 스타일링 */
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-pause-button {
    background-color: #fff;
    color: #333;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    cursor: pointer;
    outline: none;
  }

  /* 타임라인 스타일링 */
  &::-webkit-media-controls-timeline {
    /* flex: 1;
    height: 4px;
    background-color: #ccc;
    border-radius: 2px;
    overflow: hidden; */
  }

  /* 타임라인 재생 상태 스타일링 */
  &::-webkit-media-controls-current-time-display::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: transparent;
  }

  /* 타임라인 채우기 스타일링 */
  &::-webkit-media-controls-timeline::-webkit-media-controls-timeline-container {
    background-color: transparent;
    height: 1%;
  }

  /* 볼륨 슬라이더 숨김 */
  &::-webkit-media-controls-volume-slider {
    display: none;
  }
`;

const AudioContainer = styled.div`
  display: inline-flex;
  flex-direction: row-reverse;
  width: 100%;
  align-items: center;

`



export default viewer;
