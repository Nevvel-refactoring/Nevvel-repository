import React, { useState, useEffect, useRef } from "react";
import EditorHead from "@/src/components/editor/EditorHead";
import EditorMain from "@/src/components/editor/EditorMain";
import styled from "styled-components";
import { episode } from "editor";
import { useRouter } from "next/router";
import { mobile } from "@/src/util/Mixin";
import springApi from "@/src/api";
import { ImageAssetAtom, AudioAssetAtom } from "@/src/store/EditorAssetStore";
import DummyAssetData_audio from "@/src/components/assetstore/DummyAssetData_Audio.json";
import DummyAssetData_image from "@/src/components/assetstore/DummyAssetData_Image.json";
import { useAtom } from "jotai";
import { cover } from "series";
import { userInfoAtom, loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";

function index() {
  const router = useRouter();
  const id = router.query.id;
  const [episode, setEpisode] = useState<episode>({
    coverId: Number(id),
    title: "",
    statusType: "PUBLISHED",
    point: 0,
    contents: [],
  });
  const [coverData, setCoverData] = useState<cover>();
  const scrollRef = useRef<any>();
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
  }, [episode]);

  const [assetImageData, setAssetImageData] = useAtom(ImageAssetAtom);
  const [assetAudioData, setAssetAudioData] = useAtom(AudioAssetAtom);
  const userInfo = useAtomValue(userInfoAtom);
  const loginStatus = useAtomValue(loginAtom);

  // // cover 정보 받아오기
  // const getSeriesData = async (id: number) => {
  //   const res = await springApi.get(`/covers/${id}`);
  //   if (res) {
  //     console.log(res.data);
  //     setCoverData(res.data);
  //     setEpisode({
  //       coverId: Number(id),
  //       title: "",
  //       statusType: "PUBLISHED",
  //       point: 0,
  //       contents: [],
  //     });
  //   }
  // };

  useEffect(() => {
    // if (coverData) {
    //   if (coverData.writer.id !== userInfo?.id) {
    //     router.push(
    //       {
    //         pathname: "/404",
    //       },
    //       `/editor/${id}`
    //     );
    //   }
    // }
  }, [coverData]);

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
    console.log(id, "id1");
    getAssetImgData();
    getAssetAudioData();
    // setAssetData(DummyAssetData_image.content)
  }, []);

  // useEffect(() => {
  //   if (id) {
  //     getSeriesData(Number(id));
  //   }
  // }, [id]);

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
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  color: white;
  flex-direction: row;
  ${mobile} {
    flex-direction: column;
  }

  margin: 0;
  padding: 0;
`;
const EditorHeadWrapper = styled.div``;

const EditorWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export default index;
