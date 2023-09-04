import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import AssetCard from "../common/AssetCard";
import { Asset } from "asset"

import { Modal } from "../common/Modal";
import AssetDetailModal from "../assetstore/AssetDetailModal";



interface AssetSwiperProps {
  content: Asset[];
  setAxiosReloaer: React.Dispatch<React.SetStateAction<boolean>>;
}

function AssetSwiper(props: AssetSwiperProps) {
  // 에셋 10개 받아오기
  const assetSwiperData = props.content.slice(0, 10);

  // 에셋 디테일 모달 오픈 트리거
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 에셋 디테일로 열리는 에셋의 key값
  const [openModalData, setOpenModalData] = useState<Asset>({
    id: 0,
    title: "",
    type: "",
    thumbnail: "",
    url: "",
    price: 0,
    downloadCount: 0,
    isAvailable: false,
    tags: [
      {
        id: 0,
        tagName: "",
        useCount: 0,
      },
    ],
    uploader: {
      id: 0,
      nickname: "",
      profileImage: "",
    },
  });

  // 모달의 모달이 어떻게 나올지 결정해주는 인자
  const [modalStarter, setModalStarter] = useState<boolean>(true);

  return (
    <Wrapper>
      <Container>
        <button>이전</button>
        {assetSwiperData.map((AssetData) => {
          return (
           <Card>
              <AssetCard
                AssetData={AssetData}
                id={AssetData.id}
                title={AssetData.title}
                type={AssetData.type}
                thumbnail={AssetData.thumbnail}
                url={AssetData.url}
                tags={AssetData.tags}
                setModalOpen={setModalOpen}
                setOpenModalData={setOpenModalData}
                // price={AssetData.price}
                // uploader={AssetData.uploader}
              />
            </Card>
          );
        })}
        <button>이후</button>
      </Container>
      {/* 여기부터 모달 */}
      {modalOpen ? (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="800"
          height="710"
          element={
            <AssetDetailModal
              openModalData={openModalData}
              setModalOpen={setModalOpen}
              modalStarter={modalStarter}
              setAxiosReloaer={props.setAxiosReloaer}
            />
          }
        />
      ) : null}
    </Wrapper>
  );
}

export default AssetSwiper;


const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* flex-direction: column; */
  width: 100vw;
  height: 45%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 10%;
  padding-right: 12%;
`;

const Container = styled.div`
  width: 100%;
  height:500px ;
  display: flex;
  overflow:hidden;  
`
const Card = styled.div`
  
`