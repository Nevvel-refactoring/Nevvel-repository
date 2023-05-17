import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AssetstoreBanner from "@/src/components/assetstore/AssetstoreBanner";
import AssetstoreAssetList from "@/src/components/assetstore/AssetstoreAssetList";

import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { tabletH } from "../../util/Mixin";

import { Modal } from "@/src/components/common/Modal";
import ImgUpload from "@/src/components/assetstore/ImgUpload";
import AudUpload from "@/src/components/assetstore/AudUpload";

import TagData from "@/src/components/assetstore/DummyTagData.json";
import { NewvelApi } from "@/src/api";
import TagAddModal from "@/src/components/assetstore/TagAddModal";

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { Props } from "next/dist/client/script";

import { BiImage } from "react-icons/bi";
import { AiOutlineSound } from "react-icons/ai";


type TagData = {
  id: number;
  tagName: string;
  useCount: number;
};

function assetstore({ content }: any) {
  // Modal Open trigger
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Modal Change Trigger
  const [modalChange, setModalChange] = useState(0);


  // 에셋 업로드 버튼 클릭
  const AssetUpload = () => {
    setModalOpen(true);
    setModalChange(0);
  };

  const CloseAssetUpload = () => {
    setModalOpen(false);
  };

  const UploadImg = () => {
    setModalChange(1);
  };
  const UploadAud = () => {
    setModalChange(2);
  };

  const [tagData, setTagData] = useState<TagData[]>([]);

  useEffect(() => {
    const getTagData = async () => {
      const res = await NewvelApi.tagsList();
      setTagData(res.data.content);
      // console.log(res)
    };
    getTagData();
  }, []);

  const TopTag = tagData.slice(0, 28);

  const [tagModalOpen, setTagModalOpen] = useState<boolean>(false)

  const AddTag = () => {
    setTagModalOpen(true);
    console.log('되는데')
  };

  // 이미지/사운드 버튼 스위치
  const [imgAudTrigger, setImgAudTrigger] = useState<string>("IMAGE")

  const SwitchtoAud = () => {
    setImgAudTrigger("AUDIO")
  }

  const SwitchtoImg = () => {
    setImgAudTrigger("IMAGE")
  }

  // 에셋 업로드 후 axios 트리거
  const [afterUpload, setAfterUpload] = useState<boolean>(false)

  return (
    <Wrapper>
      {content}
      <AssetstoreBanner />
      <SearchBtnDiv>
        <SearchBar>
          <SearchBarInput placeholder="에셋명을 입력하세요" />
          {/* 추후 키워드 검색 axios 연결해야함 */}
          <Link href="/assetstore/assetstore">
            <AiOutlineSearch />
          </Link>
        </SearchBar>
        <WriteBtn onClick={AssetUpload}>에셋 업로드</WriteBtn>
      </SearchBtnDiv>
      <TagRowDiv>
        <CardInfo2Div>
          <TagP>전체</TagP>
        </CardInfo2Div>
        {TopTag.map((tags) => {
          return (
            <CardInfo2Div key={tags.id}>
              <TagP>#{tags.tagName}</TagP>
            </CardInfo2Div>
          );
        })}
        <CardInfo2Div onClick={AddTag} >
          <TagP>+</TagP>
        </CardInfo2Div>
      </TagRowDiv>
      <SwitchDiv>
        {
          (imgAudTrigger === "IMAGE") ?
          <ImgAudSwitchDiv>
            <ClickImgSwitchBtn>
              <BiImage />
            </ClickImgSwitchBtn>
            <AudSwitchBtn onClick={SwitchtoAud}>
              <AiOutlineSound />
            </AudSwitchBtn>
          </ImgAudSwitchDiv>
          :
          <ImgAudSwitchDiv>
            <ImgSwitchBtn onClick={SwitchtoImg}>
              <BiImage />
            </ImgSwitchBtn>
            <ClickAudSwitchBtn>
              <AiOutlineSound />
            </ClickAudSwitchBtn>
          </ImgAudSwitchDiv>
        }
        <PopNewSwitchBtn>인기순</PopNewSwitchBtn>
        <p>|</p>
        <PopNewSwitchBtn>최신순</PopNewSwitchBtn>
      </SwitchDiv>
      <AssetstoreAssetList
        afterUpload={afterUpload}
        setAfterUpload={setAfterUpload}
      />

      {/* 여기부터 업로드 모달 */}
      {modalOpen ? (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="600"
          height="700"
          element={
            modalChange === 0 ? (
              <ModalDiv1>
                <p>에셋 업로드</p>
                <ModalUploadBtnDiv>
                  <ModalUploadBtn
                    onClick={UploadImg}
                    src="/UploadImgBtn.png"
                    alt="UploadImgBtn"
                  />
                  <ModalUploadBtn
                    onClick={UploadAud}
                    src="/UploadAudBtn.png"
                    alt="UploadAudBtn"
                  />
                </ModalUploadBtnDiv>
                <ModalCloseBtn onClick={CloseAssetUpload}>닫기</ModalCloseBtn>
              </ModalDiv1>
            ) : modalChange === 1 ? (
              <ImgUpload modalOpen={modalOpen} setModalOpen={setModalOpen} setAfterUpload={setAfterUpload} />
            ) : (
              <AudUpload modalOpen={modalOpen} setModalOpen={setModalOpen} setAfterUpload={setAfterUpload} />
            )
          }
        />
      ) : null}

      {/* 여기서부터 태그 모달 */}
      {
        tagModalOpen ? (
          <Modal
            modal={tagModalOpen}
            setModal={setTagModalOpen}
            width="800"
            height="400"
            element={
              <TagAddModal
                tagData={tagData}
              />
            }
          />
        ) : null
      }
      
    </Wrapper>
  );
}

// export const getStaticProps: GetServerSideProps<Props> = async(context: GetServerSidePropsContext) => {
//    // 클라이언트의 쿠키 가져오기
//    const cookie = context.req ? context.req.headers.cookie : "";

//   try {
//     const res = await axios.get("http://k8d1061.p.ssafy.io:8080/api/tags",{ headers: { cookie } });
//     return {
//       props: { content: res.data },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: { content: "에러남" },
//     };
//   }
// }

export default assetstore;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 1%;
  padding-left: 3%;
  padding-right: 3%;
`;


// 서치바 및 업로드 버튼

const SearchBtnDiv = styled.div`
  width: 87%;
  /* height: 100%; */
  padding-top: 1%;
  padding-left: 1%;
  padding-right: 1%;
  display: flex;
  justify-content: space-between;
`;

const SearchBar = styled.div`
  background-color: ${({ theme }) => theme.color.searchBar};
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 24rem;
  height: 3rem;

  ${tabletH} {
    width: 18rem;
  }
`;

const SearchBarInput = styled.input`
  background-color: ${({ theme }) => theme.color.searchBar};
  border: none;
  width: 23rem;
`;

const WriteBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 8rem;
  height: 3rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  /* margin-left: 2rem; */
  &:hover{
    background-color: #8385ff;
  }
`;


// 에셋 태그

const TagRowDiv = styled.div`
  width: 87%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 2rem;
  /* margin-bottom: 1rem; */
  height: 6rem;
  flex-wrap: wrap;
`;

// 에셋카드 재활용
const CardInfo2Div = styled.div`
  background-color: ${({ theme }) => theme.color.buttonText};
  color: #8385ff;
  width: auto;
  height: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0.05rem 0.05rem;
  border: 0.15rem solid #8385ff;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left:0.6rem;
  margin-right: 0.6rem;
  &:hover {
    cursor: pointer;
    background-color: #8385ff;
    color: white;
  }
`;

const ClickCardInfo2Div = styled.div`
  background-color: #8385ff;
  color: white;
  width: auto;
  height: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0.05rem 0.05rem;
  border: 0.15rem solid #8385ff;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left:0.6rem;
  margin-right: 0.6rem;
`

const TagP = styled.p`
  font-size: 0.9rem;
  margin-right: 0.6rem;
  margin-left: 0.6rem;
`;



// 스위치 영역

const SwitchDiv = styled.div`
  width: 87%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 2rem;
  font-size: 1.2rem;
  `

// 이미지/오디오 스위치
const ImgAudSwitchDiv = styled.div`
  width: 6.2rem;
  height: 3rem;
  border: 0.1rem solid #4D4D4D;
  border-radius: 0.5rem;
  display: flex;
`

const ImgSwitchBtn = styled.button`
  background-color : ${({ theme }) => theme.color.pointText};
  width: 3rem;
  height: 100%;
  font-size: 1rem;
`
const ClickImgSwitchBtn = styled.button`
  width: 3rem;
  height: 100%;
  border-right: 0.1rem solid #4D4D4D;
  background-color: #8385ff;
`
const AudSwitchBtn = styled.button`
  width: 3rem;
  height: 100%;
`
const ClickAudSwitchBtn = styled.button`
  width: 3rem;
  height: 100%;
  border-left: 0.1rem solid #4D4D4D;
  background-color: #8385ff;
`


// 인기/최신 스위치
const PopNewSwitchBtn = styled.button`
  color : ${({ theme }) => theme.color.button};
  width: 4rem;
  height: 2rem;
  font-size: 1.2rem;
  /* border: 0.1rem solid black; */
`


// 여기서부터 모달

const ModalDiv1 = styled.div`
  /* display: flex;
  align-content: center; */
  text-align: center;
  font-size: 3rem;
`;

const ModalUploadBtnDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalUploadBtn = styled.img`
  width: 12rem;
  height: 12rem;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 6rem;
  margin-bottom: 8rem;
  border-radius: 0.5rem;
  &:hover {
    box-shadow: 0.1rem 0.1rem 0.5rem;
  }
`;

const ModalCloseBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 12rem;
  height: 3rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;
