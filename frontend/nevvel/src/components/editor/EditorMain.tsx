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
  const assetOpen = useAtomValue(assetOpenAtom);

  const generateUniqueId = () => {
    // 현재 시간을 이용하여 고유한 ID 생성
    const timestamp = new Date().getTime();
    return `block_${timestamp}`;
  };

  useEffect(()=>{
    if (contents.length === 0) {
      const newBlock: content = {
        idx: generateUniqueId(), // Generate a new unique ID for the block
        context: [
          {
            id: "a",
            tag: "p",
            text: " ",
          },
        ],
        event: [],
      };
      setContents([...contents, newBlock]);
    };
  },[])

  useEffect(()=>{
    setEpisode({...episode,contents:contents})
  },[contents])


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