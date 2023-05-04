import GenreList from "./GenreList";
import styled from "styled-components";

interface Nav {
  nav: string;
}

function NovelNav({ nav }: Nav) {
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

  return (
    <Wrapper>
      {dummy_genres.map((genre) => (
        <GenreList key={genre.id} id={genre.id} name={genre.name} nav={nav} />
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
`;
