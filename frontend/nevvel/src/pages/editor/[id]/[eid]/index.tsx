import React, { useState, useEffect, useRef } from "react";
import EditorHead from "@/src/components/editor/EditorHead";
import EditorMain from "@/src/components/editor/EditorMain";
import styled from "styled-components";
import { episode } from "editor";
import Dummy_Episode from "../../../../components/viewer/DummyEpisodeData.json";
import { useRouter } from "next/dist/client/router";
import { mobile } from "@/src/util/Mixin";
import springApi from "@/src/api";
import { putEditorAtom } from "@/src/store/EditorAssetStore";
import DummyAssetData_audio from "@/src/components/assetstore/DummyAssetData_Audio.json";
import DummyAssetData_image from "@/src/components/assetstore/DummyAssetData_Image.json";
import { ImageAssetAtom, AudioAssetAtom } from "@/src/store/EditorAssetStore";
import { useAtom } from "jotai";

function index() {
  const router = useRouter();
  const eid = router.query.eid;
  const id = router.query.id;
  const [episode, setEpisode] = useState<episode>({
    coverId: 0,
    statusType: "PUBLISHED",
    point: 0,
    title: "",
    contents: [],
  });
  const scrollRef = useRef<any>();
  const [assetImageData, setAssetImageData] = useAtom(ImageAssetAtom);
  const [assetAudioData, setAssetAudioData] = useAtom(AudioAssetAtom);

  // 이미지 get 요청
  const getAssetImgData = async () => {
    try {
      const res = await springApi.get(
        "assets/purchased-on?assettype=IMAGE&page=1&size=10&sort=createdDateTime"
      );
      if (res) {
        console.log(res);
        setAssetImageData(res.data.content);
      }
    } catch (error) {
      console.log(error);
      setAssetImageData(DummyAssetData_image.content);
    }
  };
  // 오디오 get 요청
  const getAssetAudioData = async () => {
    try {
      const res = await springApi.get(
        "assets/purchased-on?assettype=AUDIO&page=1&size=10&sort=createdDateTime"
      );
      if (res) {
        console.log(res);
        setAssetAudioData(res.data.content);
      }
    } catch (error) {
      console.log(error);
      setAssetAudioData(DummyAssetData_audio.content);
    }
  };

  useEffect(() => {
    getAssetImgData();
    getAssetAudioData();
    // setAssetData(DummyAssetData_image.content)
  }, []);

  const getViewerData = async (EID: number) => {
    try{
      const res = await springApi.get(`/episodes/${EID}`);
      if (res) {
        console.log(res);
        setEpisode(res.data);
      }
    }catch(error){
      setEpisode(Dummy_Episode)
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
