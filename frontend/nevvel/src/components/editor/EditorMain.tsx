import React, { useState } from "react";
import styled from "styled-components";
import EditorMainList from "./Main/Text/EditorMainList";
import EditorMainInput from "./Main/Text/EditorMainInput";

interface Episode {
  coverId: number;
  statusType: string;
  point:number;
  contents:content[];
}

interface content {
  idx: number;
  context: string; 
  event:event[]
}

interface event {
  assetId: number;
  type:string
}


function EditorMain() {
  const [episode, setEpisode] =useState<Episode[]>([])
  const [contents, setContents] =useState<content[]>([]);
  const [currentText, setCurrentText] = useState("");
  


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
