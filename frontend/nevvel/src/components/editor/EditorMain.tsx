import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditorMainList from "./Main/Text/EditorMainList";
import EditorMainInput from "./Main/Text/EditorMainInput";
import { episode,content } from "editor";
import { useAtomValue } from "jotai";
import { assetOpenAtom } from "@/src/store/EditorAssetStore";
import EditorMainAssetContainer from "@/src/components/editor/Main/Asset/EditorMainAssetContainer";

type EditorMainProps = {
  setEpisode:React.Dispatch<React.SetStateAction<episode>>;
  episode:episode;
}

function EditorMain({setEpisode,episode}:EditorMainProps) {
  const [contents, setContents] =useState<content[]>([]);
  const [currentText, setCurrentText] = useState("");
  const assetOpen = useAtomValue(assetOpenAtom)  
  useEffect(()=>{
    setEpisode({...episode,contents:contents})
    console.log("episode",episode)

  },[contents])
  

	return (<>
    <Wrapper assetOpen={assetOpen}>
      <EditorMainList
			contents={contents}
			setContents={setContents}
			/>
      <EditorMainInput
			currentText={currentText}
			setCurrentText={setCurrentText}
			contents={contents}
			setContents={setContents}
			/>
    </Wrapper>
        {assetOpen && <EditorMainAssetContainer 
        contents={contents}
        setContents={setContents} />}
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
export default EditorMain;
