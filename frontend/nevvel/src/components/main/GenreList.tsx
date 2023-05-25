import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  id: number;
  name: string;
  nav: string;
  pageNum: number;
  canClick: boolean;
}

function GenreList({ id, name, nav, pageNum, canClick }: Props) {
  const router = useRouter();
  const [genre, setgenre] =useState<string>("전체")
  const [genreCheck, setGenreCheck] = useState(false)
  const genreName = router.query.name
  
  const genreSelectHandler = () => {
    if (canClick) {
      router.push(
        {
          pathname: `/novels/${nav}`,
          query: { genre: id, sort: "like", name: name, pageNum: pageNum },
        }
        // `/novels/${nav}`
        );
        setgenre(`${name}`)
        setGenreCheck(!genreCheck)
    }
  };

  return (
    <GenreWrapper>
      <GenreName type="button" value={name} genreName={genreName} onClick={genreSelectHandler} />
    </GenreWrapper>
  );
}

export default GenreList;

const GenreWrapper = styled.div`
  display: flex;
`;

const GenreName = styled.input<{ genreName:string| string | string[] | undefined,value:string}>`
  background-color: ${({ theme }) => theme.color.subNavbar};
  border: none;
  color: ${(props)=>props.genreName === props.value ?(({theme})=>(theme.color.point)):(({theme})=>(theme.color.text2))  };
  font-size: 16px;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;
