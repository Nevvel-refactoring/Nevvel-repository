import NovelNav from "@/src/components/main/NovelNav";
import NovelPagination from "@/src/components/common/NovelPagination";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import styled from "styled-components";

function LatestNovel() {
  const { query } = useRouter();

  // url으로 입력해서 들어오는 경우
  const router = useRouter();
  if (query.genre == undefined) {
    useEffect(() => {
      router.push(
        {
          pathname: `/novels/latest`,
          query: { genre: 1, sort: "like", name: "전체" },
        },
        `/novels/latest`
      );
    }, [query]);
  }

  // nav바 클릭 시 세부 장르명을 받아오기 힘들기 때문에
  // 세부 장르를 전체로 하는 router 다시 보내기
  if (query.name == undefined) {
    useEffect(() => {
      router.push(
        {
          pathname: `/novels/latest`,
          query: { genre: query.genre, sort: query.sort, name: "전체" },
        },
        `/novels/latest`
      );
    }, [query]);
  }

  // 정렬 기준 선택 시 반영
  const sortHandler = (params: string) => {
    router.push(
      {
        pathname: `/novels/latest`,
        query: { genre: query.genre, sort: params, name: query.name },
      },
      `/novels/latest`
    );
  };

  return (
    <Wrapper>
      <NovelNav nav="latest" />
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
      <NovelPagination />
    </Wrapper>
  );
}

export default LatestNovel;

const Wrapper = styled.div``;

const NovelTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 1rem;
`;

const SortWrapper = styled.div``;

const SortContent = styled.span`
  font-size: 13.5px;
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
`;
