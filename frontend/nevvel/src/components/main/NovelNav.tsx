import GenreList from "./GenreList";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { NewvelApi } from "@/src/api";

interface Nav {
  nav: string;
  pageNum: number;
}

interface Genre {
  id: number;
  name: string;
}

function NovelNav({ nav, pageNum }: Nav) {
  const dummy_genres = [
    { id: 1, name: "전체" },
    { id: 2, name: "로맨스" },
    { id: 3, name: "로맨스 판타지" },
    { id: 4, name: "판타지" },
    { id: 5, name: "현대 판타지" },
    { id: 6, name: "무협" },
    { id: 7, name: "호러/미스터리" },
    { id: 8, name: "라이트노벨" },
    { id: 9, name: "BL" },
    { id: 10, name: "자유" },
  ];

  const [genres, setGenres] = useState<Genre[] | undefined>(undefined);
  useEffect(() => {
    const getGenres = async () => {
      const res = await NewvelApi.allGenres();
      setGenres(res.data.genres);
      // console.log(res.data.genres);
    };
    getGenres();
  }, []);

  return (
    <Wrapper>
      {/* {genres} */}
      {genres?.map((genre) => (
        <GenreList
          key={genre.id}
          id={genre.id}
          name={genre.name}
          nav={nav}
          pageNum={pageNum}
        />
      ))}
    </Wrapper>
  );
}

export default NovelNav;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.subNavbar};
  display: flex;
  justify-content: space-between;
  padding-left: 3%;
  padding-right: 3%;
  height: 3.125rem;
  overflow: hidden;
  white-space: nowrap;
  overflow-x: auto;
  /* 앱에서 스와이프 */
  -webkit-overflow-scrolling: touch;

  /* IE, Edge 및 Firefox에서 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  /* Chrome, Safari 및 Opera에서 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none;
  }
`;
