import NovelNav from "@/src/components/main/NovelNav";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import styled from "styled-components";

function CompletedNovel() {
  const { query } = useRouter();

  // nav바 클릭 시 세부 장르명을 받아오기 힘들기 때문에
  // 세부 장르를 전체로 하는 router 다시 보내기
  const router = useRouter();
  if (query.name == undefined) {
    useEffect(() => {
      router.push(
        {
          pathname: `/novels/completed`,
          query: { genre: query.genre, sort: query.sort, name: "전체" },
        },
        `/novels/completed`
      );
    }, [query]);
  }

  // 정렬 기준 선택 시 반영
  const sortHandler = (params: string) => {
    router.push(
      {
        pathname: `/novels/completed`,
        query: { genre: query.genre, sort: params, name: query.name },
      },
      `/novels/completed`
    );
  };

  return (
    <Wrapper>
      <NovelNav nav="completed" />
      <NovelTop>
        {query.name}
        {query.genre}
        {query.sort}
        <SortWrapper>
          <SortContent
            onClick={() => {
              sortHandler("like");
            }}
          >
            인기순
          </SortContent>
          |
          <SortContent
            onClick={() => {
              sortHandler("hit");
            }}
          >
            조회순
          </SortContent>
          |
          <SortContent
            onClick={() => {
              sortHandler("date");
            }}
          >
            업데이트순
          </SortContent>
        </SortWrapper>
      </NovelTop>
    </Wrapper>
  );
}

export default CompletedNovel;

const Wrapper = styled.div``;

const NovelTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 1rem;
`;

const SortWrapper = styled.div``;

const SortContent = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;
