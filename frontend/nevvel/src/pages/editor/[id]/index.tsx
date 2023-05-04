import React,{useState} from "react";
import EditorHead from "@/src/components/editor/EditorHead";
import EditorMain from "@/src/components/editor/EditorMain";
import styled from "styled-components";
import { episode } from "editor";
function index() {
  const [episode, setEpisode] =useState<episode>({
    coverId:1,
    statusType:"PUBLISHED",
    point:0,
    title:"",
    contents:[]
  })

  return (
    <Wrapper>
      <EditorHead 
      episode={episode}
      setEpisode={setEpisode}/>
      <EditorMain 
      setEpisode={setEpisode}
      episode={episode}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 91vh;
  padding-left: 10%;
  padding-right: 10%;

`;

export default index;
