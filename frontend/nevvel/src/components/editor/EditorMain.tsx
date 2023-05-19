import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditorMainList from "./Main/Text/EditorMainList";
import { episode,content } from "editor";
import { useAtom,useAtomValue } from "jotai";
import { assetOpenAtom } from "@/src/store/EditorAssetStore";
import EditorMainAssetContainer from "@/src/components/editor/Main/Asset/EditorMainAssetContainer";
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
  const assetOpen = useAtomValue(assetOpenAtom) 
  
  useEffect(()=>{
    if (episode.contents.length !== 0){
      setContents(episode.contents)
    }
  },[episode])

  useEffect(()=>{
    setEpisode({...episode,contents:contents})
    // console.log("episode 들오오냐 메인에",episode)
  },[contents])

  // useEffect(()=>{
  //   if (episode.contents.length !== 0){
  //     setContents(episode.contents)
  //   }
  //   console.log("최초 에피소드",episode)
  // },[])
  

    return (<>
    <Wrapper assetOpen={assetOpen}>
      <EditorMainList
            episode={episode}
            setEpisode={setEpisode}
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
  padding-left:${(props)=>(props.assetOpen ?(20):(10))}%;
  padding-right: ${(props)=>(props.assetOpen ?(10):(20))}%;
`;
const NumColor = styled.div`
position: fixed;
  color: ${({ theme})=>theme.color.background};

`
export default EditorMain;