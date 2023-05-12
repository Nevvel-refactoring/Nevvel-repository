import styled from "styled-components";
import { useState, useEffect } from "react";
import noveldata from "../../components/main/DummyNovelData.json";
import NovelCard from "@/src/components/common/NovelCard";

interface Novel {
  content: {
    id: number;
    title: string;
    status: string;
    thumbnail: string;
    genre: string;
    writer: {
      id: number;
      nickname: string;
    };
    isUploaded: boolean;
    isNew: boolean;
  }[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

function SearchNovel(props: { word: string }) {
  const [novels, setNovels] = useState<Novel | undefined>(undefined);

  useEffect(() => {
    setNovels(noveldata);
  }, [novels]);

  return (
    <Wrapper>
      <ResultMessage>"{props.word}" 검색결과</ResultMessage>
      {/* novel.empty가 true인 경우 해당하는 소설 없음 */}
      {novels?.empty ? (
        <NovelEmpty>일치하는 검색결과가 없습니다.</NovelEmpty>
      ) : (
        <NovelExists>
          {novels?.content?.map((novel, index: number) => {
            return (
              <NovelCard
                key={index}
                id={novel.id}
                title={novel.title}
                writer={novel.writer.nickname}
                writerId={novel.writer.id}
                genre={novel.genre}
                thumbnail={novel.thumbnail}
              />
            );
          })}
        </NovelExists>
      )}
    </Wrapper>
  );
}

export async function getServerSideProps(context: { query: { word: string } }) {
  const word = context.query.word;
  return { props: { word: word } };
}

export default SearchNovel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 3rem;
`;

const ResultMessage = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 3rem;
`;

const NovelExists = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NovelEmpty = styled.div``;
