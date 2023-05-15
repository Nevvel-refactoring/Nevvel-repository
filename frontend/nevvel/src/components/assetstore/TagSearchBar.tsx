import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DummyTagData from './DummyTagData.json'
import { NewvelApi } from "@/src/api";

type TagData = {
  id: number;
  tagName: string;
  useCount: number;
};

type TagInputWidthProps = {
  TagInputWidth?: string;
}

type ImageUploadProps = {
  selectTag: string[];
  AddTag: (newSelectTag:string) => void;
  TagInputWidth? : string;
}

function TagSearchBar(props:ImageUploadProps){

  // axios로 태그 데이터 받아오기
  // useEffect(() => {
  //   const getTagList = async () => {
  //     const res = await NewvelApi.tagsList;
  //   }
  //   getTagList()
  // },[])

  // axios후 태그 리스트 만들기
  const [tagLIst, setTagLIst] = useState<string[]>([])

  useEffect(() => {
    const getTagData = async () => {
      const res = await NewvelApi.tagsList();
      const TagObjtoList = await (res.data.content).map((obj:TagData) => (obj.tagName))
      setTagLIst(TagObjtoList);
      // console.log(res)
    };
    getTagData();
  }, []);


  
  // useEffect(() => {
  //   // console.log(DummyTagData.content.length)
  //   for (let i = 0; i < DummyTagData.content.length; i++) {
  //     // const newTag = DummyTagData.content[i]["tagName"]
  //     setTagLIst(tagLIst => [...tagLIst, DummyTagData.content[i]["tagName"]])
  //   }
  // },[])

  // 검색어 받기
  const [keyword, setKeyword] = useState<string>("")

  const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value.trim())
  }

  // 검색어 입력시, 태그 데이터와 비교해서 resultTagList에 저장
  const [resultTagList, setResultTagList] = useState<string[]>([])

  useEffect(() => {
    setResultTagList(
      tagLIst.filter(tag => {
        if (tag.includes(keyword)) {
          return tag.includes(keyword)
        }
        return false
      })
    )
  },[keyword])

  
  // 자동완성 결과 클릭 시, 저장
  const handleAdd = (result:string) => {
    if (!props.selectTag.includes(result.trim())) {
      props.AddTag(result.trim())
    }
    setKeyword("")
  }

  // 자동완성에 없는 경우 엔터 치면 새로운 태그 생성
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter'){
      if (keyword) {
        props.AddTag(keyword.trim())
      }
    }
    setKeyword("")
  }


  return(
    <AssetInfoInputDiv
      TagInputWidth={props.TagInputWidth}
    >
      <AssetInfoInput1
        TagInputWidth={props.TagInputWidth}
        placeholder="에셋 태그를 입력해주세요."
        onChange={onChangeKeyword}
        onKeyDown={handleKeyDown}
        maxLength={4}
       />
       {
        keyword?
        <ResultDiv
        TagInputWidth={props.TagInputWidth}
        >
            <ResultUl>
              {
                resultTagList.map((result, index) => (
                  <ResultLi
                    TagInputWidth={props.TagInputWidth}
                    onClick={() => handleAdd(result)}>
                    <p>{result}</p>
                  </ResultLi>
                ))
              }
            </ResultUl>
        </ResultDiv>
        :
        null
       }
    </AssetInfoInputDiv>
  )
}

export default TagSearchBar

const AssetInfoInputDiv = styled.div<TagInputWidthProps>`
  width: ${props => `${props.TagInputWidth}`};
  height: 2.5rem;
  z-index: 999;
`

const AssetInfoInput1 = styled.input<TagInputWidthProps>`
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.button};
  width: ${props => `${props.TagInputWidth}`};
  height: 2.5rem;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.6rem;
  :focus{
    border: 0.15rem solid #4D4D4D;
    box-shadow: 0.1rem 0.1rem 0.6rem;
  }
`

const ResultDiv = styled.div<TagInputWidthProps>`
  width: ${props => `${props.TagInputWidth}`};
  background-color: ${({ theme }) => theme.color.background};
  height: auto;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.6rem;
  background-color: white;
`

const ResultUl = styled.ul<TagInputWidthProps>`
  background-color: ${({ theme }) => theme.color.background};
  border: none;
  border-radius: 0.4rem;
  margin: 0rem;
  padding: 0.25rem;
`

const ResultLi = styled.li<TagInputWidthProps>`
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.button};
  width: ${props => `${props.TagInputWidth}`};
  height: 2rem;
  font-size: 1.5rem;
  &:hover{
    cursor: pointer;
  }
`