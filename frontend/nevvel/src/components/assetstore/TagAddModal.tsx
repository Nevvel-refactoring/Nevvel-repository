import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";

type TagData = {
  id: number;
  tagName: string;
  useCount: number;
};

type TagDataProp = {
  tagData : TagData[]
}

function TagAddModal(props : TagDataProp) {

  return(
    <Wrap>
      {
      props.tagData.map((tags) => {
        return (
          <CardInfo2Div key={tags.id}>
            <TagP>{tags.tagName}</TagP>
          </CardInfo2Div>
        );
      })
      }
    </Wrap>
  )
}

export default TagAddModal;

const Wrap = styled.div`
  width: auto;
  /* height: 20rem; */
  display: flex;
  /* align-items: center; */
  flex-wrap: wrap;
  border: 0.1rem solid black;
`


// 에셋카드 재활용
const CardInfo2Div = styled.div`
  background-color: ${({ theme }) => theme.color.buttonText};
  color: #8385ff;
  width: auto;
  height: 2.2rem;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem;
  border: 0.15rem solid #8385ff;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left:0.6rem;
  margin-right: 0.6rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #8385ff;
    color: white;
  }
`;

const TagP = styled.p`
  font-size: 1.2rem;
  margin-right: 0.6rem;
  margin-left: 0.6rem;
`;