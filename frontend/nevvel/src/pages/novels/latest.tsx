import NovelNav from "@/src/components/main/NovelNav";
import NovelPagination from "@/src/components/common/NovelPagination";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Image from "next/image";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";
import NovelCard from "@/src/components/common/NovelCard";
import { Novel } from "novel"

function LatestNovel(props: {
  content: Novel;
  url: { genre: number; sort: string; name: string; pageNum: number };
}) {
  // console.log(props);
  const { query } = useRouter();

  // url으로 입력해서 들어오는 경우
  const router = useRouter();
  useEffect(() => {
    if (query.genre == undefined || query.genre == "") {
      router.push(
        {
          pathname: `/novels/latest`,
          query: { genre: 1, sort: "like", name: "전체", pageNum: 1 },
        }
        // `/novels/latest`
      );
    }
  }, [query]);

  // nav바 클릭 시 세부 장르명을 받아오기 힘들기 때문에
  // 세부 장르를 전체로 하는 router 다시 보내기
  useEffect(() => {
    if (query.name == undefined || query.name == "") {
      router.push(
        {
          pathname: `/novels/latest`,
          query: {
            genre: query.genre,
            sort: query.sort,
            name: "전체",
            pageNum: 1,
          },
        }
        // `/novels/latest`
      );
    }
  }, [query]);

  // 정렬 기준 선택 시 반영
  const sortHandler = (params: string) => {
    router.push(
      {
        pathname: `/novels/latest`,
        query: {
          genre: query.genre,
          sort: params,
          name: query.name,
          pageNum: 1,
        },
      }
      // `/novels/latest`
    );
  };

  return (
    <Wrapper>
      <NovelNav nav="genres" pageNum={props.url.pageNum} />
      <NovelTop>
        {query.name}
        {/* {query.genre}
        {query.sort}
        {query.pageNum}
        <hr /> */}
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
      {props?.content?.empty ? (
        <NovelEmptyWrapper>
          <ImageWrapper>
            <Image
              src={nevvel_m_dark}
              alt="일치하는 검색결과가 없습니다."
              width={300}
              height={300}
            />
          </ImageWrapper>
          <NovelEmpty>일치하는 검색결과가 없습니다.</NovelEmpty>
        </NovelEmptyWrapper>
      ) : (
        <NovelExists>
          {props?.content?.content?.map((novel, index: number) => {
            return (
              <NovelCard
                key={index}
                id={novel.id}
                title={novel.title}
                writer={novel.writer.nickname}
                writerId={novel.writer.id}
                genre={novel.genre}
                thumbnail={novel.thumbnail}
                isUploaded={novel.isUploaded}
                isNew={novel.isNew}
              />
            );
          })}
        </NovelExists>
      )}
      {props?.content?.empty ? (
        ""
      ) : (
        <NovelPagination
          nav="genres"
          name={props.url.name}
          genre={props.url.genre}
          sort={props.url.sort}
          pageNum={props.url.pageNum}
          totalPage={props?.content?.totalPages}
        />
      )}
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
  try {
    const res = await axios.get("https://k8d1061.p.ssafy.io/api/covers", {
      params: {
        sorttype: sort,
        page: pageNum,
        status: "LATEST",
        genre: genre,
      },
    });
    return {
      props: {
        content: res.data,
        url: { genre: genre, sort: sort, name: name, pageNum: pageNum },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { content: "에러남" },
    };
  }
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

const NovelExists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 1rem;
`;

const NovelEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NovelEmpty = styled.div`
  position: absolute;
  margin-top: 5rem;
  font-size: 20px;
  font-weight: 800;
`;

const ImageWrapper = styled.div`
  margin-top: 5rem;
  opacity: 0.3;
`;

const SortWrapper = styled.div`
  margin-top: 1rem;
`;

const SortContent = styled.span`
  font-size: 13.5px;
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
`;
