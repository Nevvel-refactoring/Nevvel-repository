import React, { useEffect, useState, useRef } from "react";
import ViewHeader from "../../../components/viewer/ViewHeader";
import ViewerTabMain from "../../../components/viewer/Main/ViewerTabMain";
import ViewerPageMain from "@/src/components/viewer/Main/ViewerPageMain";
import styled from "styled-components";
import EpisodeData from "../../../components/viewer/DummyEpisodeData.json";
import { AiFillSetting } from "react-icons/ai";
import Image from "next/image";
import eyes from "@/src/assets/img/eyes.png";
import SettingBox from "@/src/components/viewer/SettingBox";
import DummyAssetData_audio from "@/src/components/assetstore/DummyAssetData_Audio.json";
import { mobile, tabletH } from "@/src/util/Mixin";

function index() {
  const [headerToggle, setHeaderToggle] = useState(true); // header on/off
  const [tabNumber, setTabNumber] = useState(0); // tab mode 일 때 사용
  const [eventCatch, setEventCatch] = useState(false); // tab mode 일때 이벤트 있는 경우 사용
  const [settingBox, setSettingBox] = useState(false); // 설정 box 보여 줄 때 사용
  const [writeMode, setWriteMode] = useState(false); // tab or page 모드 설정 토글
  const [audioEventCatch, setAudioEventCatch] = useState(false);
  // 오디오 재생
  const audioRef = useRef<any>(null);
  const scrollRef = useRef<any>();
  useEffect(() => {
    if (EpisodeData.contents[tabNumber].event.length !== 0) {
      const events = EpisodeData.contents[tabNumber].event;
      for (const event of events) {
        if (event.type === "IMAGE") {
          console.log("이미지당");
          setEventCatch(true);
        }
        if (event.type === "AUDIO") {
          console.log("소리당");
          setAudioEventCatch(true);
        }
      }
    }
    scrollRef.current.scrollTop = scrollRef.current?.scrollHeight 
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
    const contents = EpisodeData.contents;
    for (const content of contents) {
      console.log(content);
    }
  }, [audioEventCatch]);

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
    const contentLength = EpisodeData.contents.length;
    if (tabNumber < contentLength - 1) {
      setTabNumber(tabNumber + 1);
    } else if (tabNumber === contentLength - 1) {
      console.log("마지막 입니다. ");
    }
    console.log(tabNumber);
  };

  return (
    <ViewerWrapper>
      <HeaderContainer onClick={() => clickhandler("head")}>
        {headerToggle ? <ViewHeader EpisodeData={EpisodeData} /> : null}
      </HeaderContainer>

      <MainWrapper onClick={() => setHeaderToggle(false)}>
        {eventCatch ? (
          <ImageEvent>
            <Image src={eyes} alt="Logo" fill />
          </ImageEvent>
        ) : null}
        {writeMode ? (
          <MainContainer>
            <ViewerPageMain EpisodeData={EpisodeData} />
          </MainContainer>
        ) : (
          <MainContainer ref={scrollRef} onClick={countHandler}>
            {tabNumber === 0 ? (
              <div>{EpisodeData.title}</div>
            ) : (
              <ViewerTabMain
                EpisodeData={EpisodeData}
                tabNumber={tabNumber}
                setEventCatch={setEventCatch}
              />
            )}
          </MainContainer>
        )}
      </MainWrapper>
      <SettingBtn onClick={() => setSettingBox(!settingBox)}>
        <AiFillSetting size="28" />
      </SettingBtn>
      {settingBox ? (
        <>
          <SettingBox setWriteMode={setWriteMode} />
        </>
      ) : null}
      {audioEventCatch && (
        <audio ref={audioRef} src={`${DummyAssetData_audio.content[1].url}`} />
      )}
    </ViewerWrapper>
  );
}

const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${mobile} {
    font-size: 12px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15vh;
`;
const MainWrapper = styled.div``;

const MainContainer = styled.div`
  height: 70vh;
  margin-left: 30%;
  margin-right: 30%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  ${mobile} {
    margin-left: 10%;
  margin-right: 10%;  
  }
  ${tabletH}{
    margin-left: 20%;
  margin-right: 20%;  
  }
  /* border: 1px solid black; */
`;

const ImageEvent = styled.div`
  /* position: relative; */
  position: fixed;
  opacity: 0.7;
  left: 15%;
  z-index: 10;
  width: 70%;
  height:70%;
  ${tabletH}{
  left: 15%;
  width:80%;
    height:80%;
  }
  ${mobile}{
    left:18%;
    width:60%;
    height:60%;
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
  ${mobile}{
    left:80%;

  }
`;
 
export default index;
