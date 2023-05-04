import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditorMainList from "./Main/Text/EditorMainList";
import EditorMainInput from "./Main/Text/EditorMainInput";
import { episode,content } from "editor";

type EditorMainProps = {
  setEpisode:React.Dispatch<React.SetStateAction<episode>>;
  episode:episode;
}

function EditorMain({setEpisode,episode}:EditorMainProps) {
  const [contents, setContents] =useState<content[]>([]);
  const [currentText, setCurrentText] = useState("");
  
  useEffect(()=>{
    setEpisode({...episode,contents:contents})
    console.log("episode",episode)

  },[contents])
  

	return (
    <Wrapper>
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
  );
}

const Wrapper = styled.div`
background-color: ${({ theme })=> theme.color.background};
  /* border: 2px solid ${({ theme }) => theme.color.hover}; */
  border-radius: 10px;
`;
export default EditorMain;
