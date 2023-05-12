import NovelNav from "@/src/components/main/NovelNav";
import NovelPagination from "@/src/components/common/NovelPagination";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import styled from "styled-components";

interface Novel {
  genre: number | string;
  sort: string;
  name: string;
  pageNum: number | string;
}

function CompletedNovel(props: Novel) {
  // console.log(props);
  const { query } = useRouter();

  // url으로 입력해서 들어오는 경우
  const router = useRouter();
  useEffect(() => {
    if (query.genre == undefined || query.genre == "") {
      router.push(
        {
          pathname: `/novels/completed`,
          query: { genre: 1, sort: "like", name: "전체", pageNum: 1 },
        }
        // `/novels/completed`
      );
    }
  }, [query]);

  // nav바 클릭 시 세부 장르명을 받아오기 힘들기 때문에
  // 세부 장르를 전체로 하는 router 다시 보내기
  useEffect(() => {
    if (query.name == undefined || query.name == "") {
      router.push(
        {
          pathname: `/novels/completed`,
          query: {
            genre: query.genre,
            sort: query.sort,
            name: "전체",
            pageNum: 1,
          },
        }
        // `/novels/completed`
      );
    }
  }, [query]);

  // 정렬 기준 선택 시 반영
  const sortHandler = (params: string) => {
    router.push(
      {
        pathname: `/novels/completed`,
        query: {
          genre: query.genre,
          sort: params,
          name: query.name,
          pageNum: 1,
        },
      }
      // `/novels/completed`
    );
  };

  return (
    <Wrapper>
      {typeof props.pageNum == "number" ? (
        <NovelNav nav="completed" pageNum={props.pageNum} />
      ) : (
        ""
      )}
      <NovelTop>
        {query.name}
        {query.genre}
        {query.sort}
        {query.pageNum}
        <hr />
        {props.name}
        {props.genre}
        {props.sort}
        {props.pageNum}
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
      <NovelPagination
        nav="completed"
        name={props.name}
        genre={props.genre}
        sort={props.sort}
        pageNum={props.pageNum}
      />
    </Wrapper>
  );
}

export async function getServerSideProps(context: {
  query: {
    genre: number | undefined | string;
    sort: string | undefined;
    name: string | undefined;
    pageNum: number | undefined | string;
  };
}) {
  // genre
  let genre = 1;
  if (context.query.genre == undefined || context.query.genre == "") {
    genre = 1;
  } else {
    genre = Number(context.query.genre);
  }
  // sort
  let sort = "like";
  if (context.query.sort == undefined || context.query.sort == "") {
    sort = "like";
  } else {
    sort = context.query.sort;
  }
  // name
  let name = "전체";
  if (context.query.name == undefined || context.query.name == "") {
    name = "전체";
  } else {
    name = context.query.name;
  }
  // pageNum
  let pageNum = 1;
  if (context.query.pageNum == undefined || context.query.pageNum == "") {
    pageNum = 1;
  } else {
    pageNum = Number(context.query.pageNum);
  }
  return { props: { genre: genre, sort: sort, name: name, pageNum: pageNum } };
}

export default CompletedNovel;

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
