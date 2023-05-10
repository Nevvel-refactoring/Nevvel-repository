import React,{useState} from "react";
import EditorHead from "@/src/components/editor/EditorHead";
import EditorMain from "@/src/components/editor/EditorMain";
import styled from "styled-components";
import { episode } from "editor";


import { mobile } from "@/src/util/Mixin";

function index() {
  const [episode, setEpisode] =useState<episode>({
    coverId:1,
    statusType:"PUBLISHED",
    point:0,
    title:"",
    contents:[]
  })


  return (<Wrapper>
    <EditorWrapper >
      <EditorHead 
      episode={episode}
      setEpisode={setEpisode}/>
      <EditorMain 
      setEpisode={setEpisode}
      episode={episode}/>
    </EditorWrapper>

  </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  color:white;
  flex-direction: row;
  ${mobile}{
    flex-direction: column;
  }
`

const EditorWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 91vh;
 

`;

export default index;
