import React,{useState,useEffect,useRef} from "react";
import EditorHead from "@/src/components/editor/EditorHead";
import EditorMain from "@/src/components/editor/EditorMain";
import styled from "styled-components";
import { episode } from "editor";
import { useRouter } from "next/router";


import { mobile } from "@/src/util/Mixin";

function index() {
  const router = useRouter();
  const id = router.query.id
  const [episode, setEpisode] =useState<episode>({
    coverId:Number(id),
    title:"",
    statusType:"PUBLISHED",
    point:0,
    contents:[]
  })
  const scrollRef = useRef<any>();
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
  }, [episode]);



  
  return (<Wrapper>
    <EditorWrapper  ref={scrollRef} >
      <EditorHeadWrapper>
      <EditorHead 
      episode={episode}
      setEpisode={setEpisode}/>
      </EditorHeadWrapper>
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
const EditorHeadWrapper = styled.div`
`

const EditorWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
 
 

`;

export default index;
