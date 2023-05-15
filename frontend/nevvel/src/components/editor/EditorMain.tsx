import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditorMainList from "./Main/Text/EditorMainList";
import { episode,content } from "editor";
import { useAtom,useAtomValue } from "jotai";
import { assetOpenAtom } from "@/src/store/EditorAssetStore";
import EditorMainAssetContainer from "@/src/components/editor/Main/Asset/EditorMainAssetContainer";
import { ImageAssetAtom,AudioAssetAtom } from "@/src/store/EditorAssetStore";
import springApi from "@/src/api";
import DummyAssetData_image from "@/src/components/assetstore/DummyAssetData_Image.json";
import DummyAssetData_audio from "@/src/components/assetstore/DummyAssetData_Audio.json";

type EditorMainProps = {
  setEpisode:React.Dispatch<React.SetStateAction<episode>>;
  episode:episode;
}

function EditorMain({setEpisode,episode}:EditorMainProps) {
  const [contents, setContents] =useState<content[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [assetImageData, setAssetImageData] = useAtom(ImageAssetAtom);
  const [assetAudioData, setAssetAudioData] = useAtom(AudioAssetAtom);
  const assetOpen = useAtomValue(assetOpenAtom) 
  
  // 이미지 get 요청 
  const getAssetImgData = async () => {
    try{
      const res = await springApi.get(
        "assets/purchased-on?assettype=IMAGE&page=1&size=10&sort=createdDateTime"
      );
      if (res) {
        console.log(res);
        setAssetImageData(res.data.content);
    }}catch(error){
      console.log(error)
      setAssetImageData(DummyAssetData_image.content)
    }
  };
  // 오디오 get 요청 
  const getAssetAudioData = async () => {
    try{
      const res = await springApi.get(
        "assets/purchased-on?assettype=AUDIO&page=1&size=10&sort=createdDateTime"
      );
      if (res) {
        console.log(res);
        setAssetAudioData(res.data.content);
      }
    }catch(error){
      console.log(error)
      setAssetAudioData(DummyAssetData_audio.content)
    }
  };


  useEffect(() => {
    getAssetImgData();
    getAssetAudioData();
    // setAssetData(DummyAssetData_image.content)
  }, []);


  useEffect(()=>{
    setEpisode({...episode,contents:contents})
    // console.log("episode",episode)
  },[contents])

  useEffect(()=>{
    if (episode.contents.length !== 0){
      setContents(episode.contents)
    }
  },[])
  

    return (<>
    <Wrapper assetOpen={assetOpen}>
      <EditorMainList
      episode={episode}
            contents={contents}
            setContents={setContents}
      currentText={currentText}
            setCurrentText={setCurrentText}
            />
    </Wrapper>
    <NumColor>
        {assetOpen && <EditorMainAssetContainer 
        contents={contents}
        setContents={setContents} />}
    </NumColor>
  </>
  );
}

const Wrapper = styled.div<{assetOpen:number}>`
background-color: ${({ theme })=> theme.color.background};
  /* border: 2px solid ${({ theme }) => theme.color.hover}; */
  border-radius: 10px;
  padding-left:${(props)=>(props.assetOpen ?(30):(20))}%;
  padding-right: ${(props)=>(props.assetOpen ?(15):(20))}%;
`;
const NumColor = styled.div`
position: fixed;
  color: ${({ theme})=>theme.color.background};

`
export default EditorMain;