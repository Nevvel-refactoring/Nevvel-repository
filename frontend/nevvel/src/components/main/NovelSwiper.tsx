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

import NovelCard from "../common/NovelCard";

import { useRouter } from "next/router";
import springApi from "@/src/api";

interface Novel {
  content: {
    id: number;
    title: string;
    status: string;
    thumbnail: string;
    genre: string;
    writer: {
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
  const router = useRouter();
  const [novelData, setNovelData] = useState<Novel | undefined>(undefined);

  // 소설 목록 받아오기
  useEffect(() => {
    const getNovelData = async () => {
      const res = await springApi.get("/covers");
      setNovelData(res.data);
    };
    getNovelData();
  }, []);

  // 그 중 10개 받아오기
  const novelSwiperData = novelData?.content.slice(0, 10);

  const clickHandler = () => {
    router.push({
      pathname: "series/[id]",
      query: { id: 1 },
      // 나중에 novel.id로 수정하시면 될 것 같습니다!
    });
  };

  // swiper height 설정
  const swiperStyle = {
    height: "25rem",
  };

  return (
    <Wrapper>
      <Swiper
        // style
        style={swiperStyle}
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          500: {
            slidesPerView: 2,
          },
          750: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
          1250: {
            slidesPerView: 5,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {novelSwiperData?.map((novel, index: number) => {
          return (
            <SwiperSlide key={index} onClick={clickHandler}>
              <NovelCard
                id={novel.id}
                title={novel.title}
                writer={novel.writer.nickname}
                writerId={novel.writer.id}
                genre={novel.genre}
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
  /* height: 100%; */
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 10%;
  padding-right: 12%;
`;
