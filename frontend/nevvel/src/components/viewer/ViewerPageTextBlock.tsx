import React, { useState,useEffect, useRef } from "react";
import useIntersectionObsever from "@/src/util/hooks/useIntersectionObserver";
import styled from "styled-components";
import { content } from "editor";
import { useAtom} from "jotai";
import { numAtom } from "@/src/store/ViewerScroll";

type ViewerPageTextBlock ={
    content:content;
    idx:number;
}

function ViewerPageTextBlock({content,idx}:ViewerPageTextBlock) {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObsever(ref);
  const [noWNum, setNowNum] =useAtom(numAtom)

  useEffect(()=>{
    return(()=>{
        setNowNum(idx)
    })
  },[isInViewport])

  return (
    <>
      <Text
        ref={ref}
        className={isInViewport ? "animation" : ""}
        dangerouslySetInnerHTML={{ __html: content.context }}
      />
    </>
  );
}

const Text = styled.div`
  &.animation {
    animation-name: opacity;
    animation-duration: 1000ms;
    line-height: 1.6;

    @keyframes opacity {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`

export default ViewerPageTextBlock;
