import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DummyTagData from './DummyTagData.json'


type ImageUploadProps = {
  selectTag: string[];
  AddTag: (newSelectTag:string) => void;
}

function TagSearchBar(props:ImageUploadProps){

  // axios로 태그 데이터 받아오기

  // axios후 태그 리스트 만들기
  const [tagLIst, setTagLIst] = useState<string[]>(DummyTagData.content.map((tag) => tag.tagName))
  
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


  return(
    <AssetInfoInputDiv>
      <AssetInfoInput1
        placeholder="에셋 태그를 입력하고 선택해주세요."
        onChange={onChangeKeyword}
       />
       {
        keyword?
        <ResultDiv>
            <ResultUl>
              {
                resultTagList.map((result, index) => (
                  <ResultLi onClick={() => handleAdd(result)}>
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

const AssetInfoInputDiv = styled.div`
  width: 15rem;
  height: 2.5rem;
  z-index: 999;
`

const AssetInfoInput1 = styled.input`
  width: 15rem;
  height: 2.5rem;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.6rem;
`

const ResultDiv = styled.div`
  width: 15rem;
  height: auto;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.6rem;
  background-color: white;
`

const ResultUl = styled.ul`
  margin: 0rem;
  padding: 0.25rem;
`

const ResultLi = styled.li`
  width: 15rem;
  height: 2rem;
  font-size: 1.5rem;
  &:hover{
    cursor: pointer;
  }
`