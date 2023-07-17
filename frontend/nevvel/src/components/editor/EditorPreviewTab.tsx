import React, { useEffect, useState, useRef } from "react";
import { episode } from "editor";
import styled from "styled-components";
import EditorPreviewTextBlock from "./EditorPreviewTextBlock";
import { event } from "viewer";
import { bigMobile, mobile, tabletH } from "@/src/util/Mixin";
import { useAtomValue } from "jotai";
import { ImageAssetAtom } from "@/src/store/EditorAssetStore";
import { AudioAssetAtom } from "@/src/store/EditorAssetStore";

type EditorPreviewTabProps = {
  tabNumber: number;
  fontSize: number;
  whiteSpace: number;
  interval: number;
  fontStyle: string;
  EpisodeData: episode;
};
function EditorPreviewTab({
  EpisodeData,
  tabNumber,
  fontSize,
  fontStyle,
  whiteSpace,
  interval,
}: EditorPreviewTabProps) {
  const contents = EpisodeData.contents;
  const [imageEvent, setImageEvent] = useState<string | undefined>("");
  const [audioEvent, setAudioEvent] = useState<string | undefined>("");
  const [audioEventCatch, setAudioEventCatch] = useState(false);
  const [eventCatch, setEventCatch] = useState(false); // tab mode 일때 이벤트 있는 경우 사용
  const IMAGE = useAtomValue(ImageAssetAtom);
  const AUDIO = useAtomValue(AudioAssetAtom);
  const audioRef = useRef<any>(null);
  useEffect(() => {
    // console.log(fontStyle);
  }, [fontStyle]);

  useEffect(() => {
    if (EpisodeData) {
      if (
        EpisodeData &&
        EpisodeData.contents[tabNumber - 1]?.event &&
        typeof EpisodeData.contents[tabNumber - 1].event[Symbol.iterator] ===
          "function"
      ) {
        const events = EpisodeData.contents[tabNumber - 1]?.event;
        for (const event of events) {
          if (event.type === "IMAGE") {
            // console.log("이미지당");
            setEventCatch(true);
            setImageEvent(IMAGE.find((el) => el.id === event.assetId)?.url);
          }
          if (event.type === "AUDIO") {
            // console.log("소리당");
            setAudioEventCatch(true);
            setAudioEvent(AUDIO.find((el) => el.id === event.assetId)?.url);
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
        // console.log(content);
      }
    }
  }, [audioEventCatch]);

  return (
    <>
      <Container
        fontSize={fontSize}
        fontStyle={fontStyle}
        whiteSpace={whiteSpace}
      >
        {eventCatch ? (
          <ImgContainer>
            <Img src={imageEvent} alt="Logo" />
          </ImgContainer>
        ) : null}
        {contents.map((content, index) => (
          <EditorPreviewTextBlock
            interval={interval}
            key={index}
            idx={index}
            content={content}
            tabNumber={tabNumber}
            setEventCatch={setEventCatch}
          />
        ))}
        {audioEventCatch && <audio ref={audioRef} src={`${audioEvent}`} />}
      </Container>
    </>
  );
}
{
  /* <ViewerTextBlock key={index}>{content.idx <= tabNumber ? <>{content.context}</> : null}</ViewerTextBlock> */
}

const Container = styled.div<{
  fontStyle: string;
  whiteSpace: number;
  fontSize: number;
}>`
  display: flex;
  flex-direction: column;
  font-family: ${(props) => `${props.fontStyle}`};
  padding: ${(props) => props.whiteSpace * 3}%;
  font-size: ${(props) => props.fontSize * 4}px;
  ${mobile} {
    font-size: ${(props) =>
      props.fontSize == 3 ? 12 : props.fontSize * 3.5}px;
  }
`;

const ImgContainer = styled.div`
  width: 40vw;
  height: 50vh;
  ::-webkit-scrollbar {
    display: none; 
  }
  position: fixed;
`;
const Img = styled.img`
  object-fit: cover;
  position: fixed;
  opacity: 0.7;
  left: 30%;
  z-index: 1;
  width: 40%;
  height: 500px;
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

export default EditorPreviewTab;
