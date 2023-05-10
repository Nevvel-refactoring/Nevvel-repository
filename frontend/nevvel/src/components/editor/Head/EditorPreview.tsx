import React, { useState, useEffect } from "react";
import ViewerTabMain from "../../viewer/Main/ViewerTabMain";
import { episode } from "editor";
import styled from "styled-components";

type EditorPreviewProps = {
  postEpisode: episode;
};

function EditorPreview({ postEpisode }: EditorPreviewProps) {
  const [tabNumber, setTabNumber] = useState(0); // tab mode 일 때 사용
  const [eventCatch, setEventCatch] = useState(false); // tab mode 일때 이벤트 있는 경우 사용
  console.log("여기");
  console.log(postEpisode, "postEpisode");

  useEffect(() => {
    if (postEpisode.contents) {
      if (
        postEpisode.contents[tabNumber]?.event &&
        postEpisode.contents[tabNumber]?.event.length !== 0
      ) {
        const events = postEpisode.contents[tabNumber]?.event;
        for (const event of events) {
          if (event.type === "IMAGE") {
            console.log("이미지당");
            setEventCatch(true);
          } else {
            console.log("소리당");
          }
        }
      }
    }
    return () => {
      if (eventCatch) {
        setEventCatch(false);
      }
    };
  }, [tabNumber]);

  const countHandler = () => {
    const contentLength = postEpisode.contents.length;
    console.log();
    console.log("이거 댐?");
    if (tabNumber <= contentLength - 1) {
      setTabNumber(tabNumber + 1);
    } else if (tabNumber === contentLength - 1) {
      console.log("마지막 입니다. ");
    }
    console.log(tabNumber);
  };

  return (
    <PreviewWrapper onClick={countHandler}>
      <PreviewHeader>미리보기</PreviewHeader>
      <PreviewMain>
        {postEpisode.contents.length !== 0 ? (
          <ViewerTabMain
            EpisodeData={postEpisode}
            tabNumber={tabNumber}
            setEventCatch={setEventCatch}
          />
        ) : (<>미리보기 할 내용이 존재하지 않습니다.</>)}
      </PreviewMain>
    </PreviewWrapper>
  );
}

const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const PreviewHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.text1};
`;

const PreviewMain = styled.div`
  width: 100%;
  height: 70vh;
`;
export default EditorPreview;
