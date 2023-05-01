import NovelNav from "@/src/components/main/NovelNav";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

function CompletedNovel() {
  const { query } = useRouter();

  return (
    <Wrapper>
      <NovelNav nav="completed" />
      {query.genre}
      {query.sort}
    </Wrapper>
  );
}

export default CompletedNovel;

const Wrapper = styled.div``;
