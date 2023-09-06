import GenreList from "./GenreList";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { getGenre } from "@/src/api/genre";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [canClick, setCanClick] = useState<boolean>(true);
  const [startX, setStartX] = useState<number>(0);

  const scrollElement = scrollRef.current as HTMLDivElement;

  const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
    setIsDrag(true);
    setStartX(e.pageX);
  };

  const onDragLeave = () => {
    setIsDrag(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragEnd = () => {
    setIsDrag(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isDrag) {
      setCanClick(false); // 드래그에 있어야 일반 클릭과 드래그를 true false 나누어 처리 가능
      e.preventDefault();
      scrollElement.scrollLeft += startX - e.pageX;
      setStartX(e.pageX);
    }
  };

  useEffect(() => {
    const getGenres = async () => {
      const res = await getGenre();
      if (res != null) {
        setGenres(res.data.genres);
        // console.log(res.data.genres);
      }
    };
    getGenres();
  }, []);

  return (
    <Wrapper
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragLeave}
    >
      {/* {genres} */}
      {genres?.map((genre) => (
        <GenreList
          key={genre.id}
          id={genre.id}
          name={genre.name}
          nav={nav}
          pageNum={pageNum}
          canClick={canClick}
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
