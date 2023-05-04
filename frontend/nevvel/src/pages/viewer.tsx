import React, { useEffect, useState } from "react";
import ViewHeader from "../components/viewer/ViewHeader";
import ViewerMain from "../components/viewer/ViewerMain";
import styled from "styled-components";
import { useRouter } from "next/router";
import { atom } from "jotai";
import EpisodeData from "../components/viewer/DummyEpisodeData.json";
import AssetData from "../components/assetstore/DummyAssetData_Image.json";
import { AiFillSetting } from "react-icons/ai";
import { event } from "viewer";
import Image from "next/image";
import my_dog from "../assets/img/my_dog.png";

function viewer() {
  // const router = useRouter()
  // const { episode }:any=router.query
  // const postEpisode = JSON.parse(episode)
  // console.log(postEpisode)
  const [tabNumber, setTabNumber] = useState(0);
  const [headerToggle, setHeaderToggle] = useState(true);
  const [modeToggle, setModeToggle] = useState(false);
  const [eventCatch, setEventCatch] = useState(false);

  useEffect(() => {
    if (EpisodeData.contents[tabNumber].event.length !== 0) {
      const events = EpisodeData.contents[tabNumber].event;
      for (const event of events) {
        if (event.type === "IMAGE") {
          console.log("이미지당");
          setEventCatch(true);
        } else {
          console.log("소리당");
        }
      }
    }
    return () => {
      if (eventCatch) {
        setEventCatch(false);
      }
    };
  }, [tabNumber]);

  const clickhandler = (e: string) => {
    console.log(e);
    if (e === "head") {
      setHeaderToggle(!headerToggle);
    } else if (e === "block") {
      setHeaderToggle(false);
      // 비동기 처리 아직 못했음
    }
  };

  return (
    <ViewerWrapper>
      <HeaderContainer onClick={() => clickhandler("head")}>
        {headerToggle ? <ViewHeader EpisodeData={EpisodeData} /> : null}
      </HeaderContainer>
      <MainWrapper>
        {eventCatch ? (
          <ImageEvent>
            <Image src={my_dog} alt="Logo" width={600} height={200} />
          </ImageEvent>
        ) : null}
        <MainContainer onClick={() => setTabNumber(tabNumber + 1)}>
          {tabNumber === 0 ? (
            <div>{EpisodeData.title}</div>
          ) : (
            <ViewerMain
              EpisodeData={EpisodeData}
              tabNumber={tabNumber}
              setEventCatch={setEventCatch}
            />
          )}
        </MainContainer>
      </MainWrapper>
      <SettingBtn>
        <AiFillSetting size="28" />
      </SettingBtn>
    </ViewerWrapper>
  );
}

const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  margin-left: 20%;
  margin-right: 20%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  /* border: 1px solid black; */
`;

const ImageEvent = styled.div`
  /* position: relative; */
  position: fixed;
  left: 45%;
  bottom: 50%;
  z-index: 10;
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
`;
export default viewer;
