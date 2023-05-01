import NovelNav from "@/src/components/main/NovelNav";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

function GenreNovel() {
  const { query } = useRouter();

  return (
    <Wrapper>
      <NovelNav nav="genres" />
      {query.genre}
      {query.sort}
    </Wrapper>
  );
}

export default GenreNovel;

const Wrapper = styled.div``;
