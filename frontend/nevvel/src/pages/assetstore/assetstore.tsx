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

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { Props } from "next/dist/client/script";


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
      <RowDiv>
        <CardInfo2Div>
          <TagP>전체</TagP>
        </CardInfo2Div>
        {TopTag.map((tags) => {
          return (
            <CardInfo2Div key={tags.id}>
              <TagP>{tags.tagName}</TagP>
            </CardInfo2Div>
          );
        })}
        <CardInfo2Div>
          <TagP>+</TagP>
        </CardInfo2Div>
      </RowDiv>

      <AssetstoreAssetList />

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
              <ImgUpload modalOpen={modalOpen} setModalOpen={setModalOpen} />
            ) : (
              <AudUpload modalOpen={modalOpen} setModalOpen={setModalOpen} />
            )
          }
        />
      ) : null}

      {/* 여기서부터 태그 모달 */}
      
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
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 1%;
  padding-left: 3%;
  padding-right: 3%;
`;

const SearchBtnDiv = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 1%;
  padding-left: 1%;
  padding-right: 1%;
  display: flex;
  justify-content: flex-end;
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
  height: 4rem;

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
  width: 10rem;
  height: 4rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  margin-left: 2rem;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 2rem;
  margin-bottom: 1rem;
  height: 8rem;
  flex-wrap: wrap;
`;

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
