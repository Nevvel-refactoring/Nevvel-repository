import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import { Modal } from "../common/Modal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import AssetCard from "../common/AssetCard";
import imgdata from "../assetstore/DummyAssetData_Image.json";
import sounddata from "../assetstore/DummyAssetData_Audio.json";

interface AssetTag {
  id: number;
  name: string;
}

interface AssetUploader {
  id: number;
  nickname: string;
  profileImage: string;
}

interface Asset {
  id: number;
  title: string;
  type: string;
  thumbnail: string;
  url: string;
  price: number;
  downloadCount: number;
  tags: Array<AssetTag>;
  uploader: AssetUploader;
}

function AssetSwiper() {
  const [AssetData, setAssetData] = useState<Array<Asset>>([]);

  // axios로 데이터 get받아오기, 현재는 더미데이터
  useEffect(() => {
    // setAssetData(imgdata.content);
    setAssetData(imgdata.content);
  }, []);

  // 에셋 디테일 모달 오픈 트리거
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 에셋 디테일로 열리는 에셋의 key값
  const[openModalData, setOpenModalData] = useState<Asset>({
    id: 0,
    title: "",
    type: "",
    thumbnail : "",
    url: "",
    price : 0,
    downloadCount : 0,
    tags: [{
      id : 0,
      name : "",
    }],
    uploader : {
      id : 0,
      nickname : "",
      profileImage : "",
    }
  })

  return (
    <Wrapper>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          500:{
            slidesPerView: 2
          },
          750:{
            slidesPerView: 3
          },
          1000:{
            slidesPerView: 4
          },
          1250:{
            slidesPerView: 5
          },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {AssetData.map((AssetData, index: number) => {
          return (
            <SwiperSlide>
              <AssetCard
                AssetData={AssetData}
                key={index}
                id={AssetData.id}
                title={AssetData.title}
                type={AssetData.type}
                thumbnail={AssetData.thumbnail}
                url={AssetData.url}
                tags={AssetData.tags}

                setModalOpen={setModalOpen}
                setOpenModalData={setOpenModalData}
                price={AssetData.price}
                uploader={AssetData.uploader}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* 여기부터 모달 */}
      {modalOpen ? (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="800"
          height="700"
          element={
            <p>{openModalData.title}</p>
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
  width: 100%;
  height: 45%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 10%;
  padding-right: 12%;
`;
