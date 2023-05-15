import React, { useState, useEffect, useRef } from "react";
import EditorHead from "@/src/components/editor/EditorHead";
import EditorMain from "@/src/components/editor/EditorMain";
import styled from "styled-components";
import { episode } from "editor";
import Dummy_Episode from "../../../../components/viewer/DummyEpisodeData.json";
import { useRouter } from "next/dist/client/router";
import { mobile } from "@/src/util/Mixin";
import springApi from "@/src/api";

function index() {
  const router = useRouter();
  const eid = router.query.eid;
  const id =router.query.id
  const [episode, setEpisode] = useState<episode>(Dummy_Episode);
  const scrollRef = useRef<any>();

  const getViewerData = async (EID: number) => {
    const res = await springApi.get(`/episodes/${EID}`);
    if (res) {
      console.log(res);
      setEpisode(res.data);
    }
  };

  useEffect(() => {
    console.log(eid);
    if (eid) {
      const EID = Number(eid);
      console.log("router", EID);
      getViewerData(EID);
    // } else {
    //   setEpisodeData(Dummy_Episode);
    }
    // setEpisodeData(Dummy_Episode); // merge 하기 전에 주석처리! 위에꺼는 해제
  }, []);





  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
  }, [episode]);
  return (
    <Wrapper>
      <EditorWrapper ref={scrollRef}>
        <EditorHeadWrapper>
          <EditorHead episode={episode} setEpisode={setEpisode} />
        </EditorHeadWrapper>
        <EditorMain setEpisode={setEpisode} episode={episode} />
      </EditorWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  color: white;
  flex-direction: row;
  ${mobile} {
    flex-direction: column;
  }
`;
const EditorHeadWrapper = styled.div``;

const EditorWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
`;

export default index;