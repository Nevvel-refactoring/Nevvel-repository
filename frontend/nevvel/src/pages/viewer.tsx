import React from "react";
import ViewerHead from "../components/viewer/ViewerHead";
import ViewerMain from "../components/viewer/ViewerMain";
import styled from "styled-components";
import { episode,content } from "editor";
import { useRouter } from "next/router";
import { atom } from "jotai";

function viewer() {
    const router = useRouter()
    const { episode }:any=router.query
    const postEpisode = JSON.parse(episode)
    console.log(postEpisode)
    const array:[] = []

    const clickhandler = () => {
        const contents = postEpisode.contents
        const new_block:content=contents.shift()

    }

    return (
    <ViewerWrapper onClick={clickhandler}>
      <ViewerHead 
    PostEpisode={postEpisode}
      />
      <ViewerMain
      array={array}
      PostEpisode={postEpisode}
      />
    </ViewerWrapper>
  );
}

const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20%;
  margin-right: 20%;
`;
export default viewer;
