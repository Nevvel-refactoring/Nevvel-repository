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

import NovelCard from "../common/NovelCard";
import noveldata from "./DummyNovelData.json";

interface Novel {
  content: {
    id: number;
    title: string;
    status: string;
    thumbnail: string;
    genre: string;
    writter: {
      id: number;
      nickname: string;
    };
    isUploaded: boolean;
    isNew: boolean;
  }[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

function NovelSwiper() {
  const [novelData, setNovelData] = useState<Novel | undefined>(undefined);

  // axios로 데이터 get받아오기, 현재는 더미데이터
  useEffect(() => {
    setNovelData(noveldata);
    // console.log(novelData)
  }, [novelData]);

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
        {novelData?.content.map((novel, index: number) => {
          return (
            <SwiperSlide key={index}>
              <NovelCard
                key={index}
                id={novel.id}
                title={novel.title}
                thumbnail={novel.thumbnail}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Wrapper>
  );
}

export default NovelSwiper;

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
