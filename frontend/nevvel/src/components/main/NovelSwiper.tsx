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
import { mobile, tabletH } from "@/src/util/Mixin";

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

function NovelSwiper(props: { content: Novel }) {
  // 소설 10개 받아오기
  const novelSwiperData = props.content?.content.slice(0, 10);

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
        spaceBetween={60}
        slidesPerView={2}
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
        {novelSwiperData.map((novel) => {
          return (
            <SwiperSlide key={novel.id}>
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
  ${tabletH} {
    padding-left: 7%;
    padding-right: 8%;
  }
  ${mobile} {
    padding-left: 3%;
    padding-right: 3.2%;
  }
`;
