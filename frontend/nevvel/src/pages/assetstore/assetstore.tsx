import React from "react";
import { useState } from "react";
import styled from "styled-components";
import AssetstoreBanner from "@/src/components/assetstore/AssetstoreBanner";
import AssetstoreAssetList from "@/src/components/assetstore/AssetstoreAssetList";

import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { tabletH } from "../../util/Mixin";

import { Modal } from "@/src/components/common/Modal";
import ImgUpload from "@/src/components/assetstore/ImgUpload";
import AudUpload from "@/src/components/assetstore/AudUpload";



function assetstore() {
  // Modal Open trigger
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Modal Change Trigger
  const [modalChange, setModalChange] = useState(0);

  // 에셋 업로드 버튼 클릭
  const AssetUpload = () => {
    setModalOpen(true);
    setModalChange(0)
  };

  const CloseAssetUpload = () => {
    setModalOpen(false)
  }

  const UploadImg = () => {
    setModalChange(1)
  }
  const UploadAud = () => {
    setModalChange(2)
  }

  return (
    <Wrapper>
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
      <AssetstoreAssetList />
      
      {/* 여기부터 모달 */}
      {modalOpen ? (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="600"
          height="700"
          element={
            (
              modalChange === 0?
            <ModalDiv1>
              <p>에셋 업로드</p>
              <ModalUploadBtnDiv>
                <ModalUploadBtn onClick={UploadImg} src="/UploadImgBtn.png" alt="UploadImgBtn" />
                <ModalUploadBtn onClick={UploadAud} src="/UploadAudBtn.png" alt="UploadAudBtn" />
              </ModalUploadBtnDiv>
              <ModalCloseBtn onClick={CloseAssetUpload}>닫기</ModalCloseBtn>
            </ModalDiv1>:
            (
              modalChange === 1?
              <ImgUpload modalOpen={modalOpen} setModalOpen={setModalOpen} />:
              <AudUpload modalOpen={modalOpen} setModalOpen={setModalOpen} />
            )
            )
          }
        />
      ) : null}
    </Wrapper>
  );
}

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
`
