import NovelNav from "@/src/components/main/NovelNav";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

function LatestNovel() {
  const { query } = useRouter();

  return (
    <Wrapper>
      <NovelNav nav="latest" />
      {query.genre}
      {query.sort}
    </Wrapper>
  );
}

export default LatestNovel;

const Wrapper = styled.div``;
