import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditorMainList from "./Main/Text/EditorMainList";
import { episode,content } from "editor";
import {useAtomValue } from "jotai";
import { assetOpenAtom } from "@/src/store/EditorAssetStore";

import dynamic from "next/dynamic";

type EditorMainProps = {
  setEpisode:React.Dispatch<React.SetStateAction<episode>>;
  episode:episode;
}

const EditorMainAssetContainer = dynamic(()=>
import("@/src/components/editor/Main/Asset/EditorMainAssetContainer"));


function EditorMain({setEpisode,episode}:EditorMainProps) {
  const [contents, setContents] =useState<content[]>([]);
  const assetOpen = useAtomValue(assetOpenAtom);

  const generateUniqueId = () => {
    // 현재 시간을 이용하여 고유한 ID 생성
    const timestamp = new Date().getTime();
    return `block_${timestamp}`;
  };

  useEffect(()=>{
    // useState에 최초값 넣어주게 되면 그대로 복사 되는 현상 발생함 ㅠㅠ
    if (contents.length === 0) {
      const newBlock: content = {
        idx: generateUniqueId(), // Generate a new unique ID for the block
        tag:"p",
        context:"",
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
            contents={contents}
            setContents={setContents}
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