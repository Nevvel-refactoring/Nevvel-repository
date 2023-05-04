import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

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

  return (
    <Wrapper>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {AssetData.map((AssetData, index: number) => {
          return (
            <SwiperSlide key={index}>
              <AssetCard
                key={index}
                id={AssetData.id}
                title={AssetData.title}
                type={AssetData.type}
                thumbnail={AssetData.thumbnail}
                url={AssetData.url}
                tags={AssetData.tags}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
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
  padding-left: 7%;
  padding-right: 7%;
`;
