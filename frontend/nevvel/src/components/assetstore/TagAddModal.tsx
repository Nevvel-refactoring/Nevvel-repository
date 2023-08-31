import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";

import TagSearchBar from "./TagSearchBar";
import { TagData } from "asset";


type TagDataProp = {
  tagData : TagData[]
  setTagModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddedTag: React.Dispatch<React.SetStateAction<string>>;
}

function TagAddModal(props : TagDataProp) {

  // 저장된 태그 외 입력하는 태그도 추가할지 결정하는 트리거
  const AddTagTrigger = false

  const [selectTag, setSelectTag] = useState<string[]>(["&tags="])

  const AddTag = (newSelectTag:string) => {
    // 이미 있는건지 체크 후
    setSelectTag([...selectTag, newSelectTag])
  }

  // 태그 삭제
  const DelTag = (index : number) => {
    setSelectTag(selectTag.filter((_, i) => i !== index))
  }

  const SubmitAddTag = () => {
    props.setAddedTag(`${selectTag.join(',')}`)
    props.setTagModalOpen(false)
  }

  const CloseAddTagModal = () => {
    props.setTagModalOpen(false)
  }

  return(
    <Wrap>
      <RowDiv Width={100} Height={5} Justify={"center"} Padding={1.5} FontSize={1.8}>
        <p>원하는 에셋 태그 필터를 검색하고 추가해보세요</p>
      </RowDiv>
      <RowDiv Width={100} Height={3} Justify={"center"} Padding={0.1} FontSize={0}>
        <TagSearchBar
          selectTag={selectTag}
          AddTag={AddTag}
          TagInputWidth={"30rem"}
          AddTagTrigger={AddTagTrigger}
        />
      </RowDiv>
      <RowDiv Width={80} Height={12} Justify={"start"} Padding={1} FontSize={0}>
        {
          selectTag.map((tags, index) => (
            <CardInfo2Div onClick={() => DelTag(index)}>
              <TagP>{tags}</TagP>
            </CardInfo2Div>
          ))
        }
      </RowDiv>
      <RowDiv Width={100} Height={4} Justify={"end"} Padding={0.75} FontSize={0}>
        <ModalSubmitBtn onClick={SubmitAddTag}>추가</ModalSubmitBtn>
        <ModalCloseBtn onClick={CloseAddTagModal}>닫기</ModalCloseBtn>
      </RowDiv>
    </Wrap>
  )
}

export default TagAddModal;

const Wrap = styled.div`
  width: 48rem;
  height: 24rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* flex-wrap: wrap; */
  /* border: 0.1rem solid black; */
`

const RowDiv = styled.div<{Width : number, Height : number, Justify:string, Padding : number,  FontSize:number}>`
  width: ${(props) => props.Width}%;
  height: ${(props) => props.Height}rem;
  display: flex;
  justify-content: ${(props) => props.Justify};
  padding-top: ${(props) => props.Padding}rem;
  font-size: ${(props) => props.FontSize}rem;
  flex-wrap: wrap;
  /* border: 0.1rem dotted black; */
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
  /* margin-top: 0.1rem; */
  /* margin-bottom: 0.1rem; */
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

const ModalCloseBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 7.5rem;
  height: 2.5rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin-left: 0.5rem;
  margin-right: 1rem;
`
const ModalSubmitBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 7.5rem;
  height: 2.5rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin-right: 0.5rem;
  &:hover{
    background-color: #8385FF;
    border: 0.1rem solid #8385FF;
  }
`