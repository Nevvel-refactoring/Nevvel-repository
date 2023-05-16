import { useState, useEffect } from "react";
import axios from "axios";
import springApi from "@/src/api";
import { userInfoAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import SemiTitle from "./SemiTitle";
import styled from "styled-components";
import NovelCard from "../common/NovelCard";

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

function MyNovel() {
  // 작성한 소설
  const userInfoStatus = useAtomValue(userInfoAtom);
  const [uploadedNovel, setUploadedNovel] = useState<Novel | undefined>(
    undefined
  );
  const [uploadedNovel5, setUploadedNovel5] = useState<
    | {
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
      }[]
    | undefined
  >(undefined);
  const [uploadedMore, setUploadedMore] = useState("");
  useEffect(() => {
    const getUploadedCovers = async () => {
      const res = await springApi.get(`/covers/uploader/${userInfoStatus?.id}`);
      console.log(res.data);
      setUploadedNovel(res.data);
      console.log(res.data.empty);
      if (res.data.empty) {
        setUploadedMore("");
      } else {
        setUploadedMore("/myPage/uploadedNovel");
      }
    };
    getUploadedCovers();
  }, []);
  // 작성한 소설 5개 받아오기
  useEffect(() => {
    setUploadedNovel5(uploadedNovel?.content?.slice(0, 5));
    // console.log(uploadedNovel?.content?.slice(0, 5));
  }, [uploadedNovel]);

  // 구매한 소설

  // 좋아요한 소설
  return (
    <NovelWrapper>
      <TitleWrapper>웹소설</TitleWrapper>
      <NovelContent>
        <SemiTitle title="작성한 소설" more={uploadedMore} />
        <UploadedNovelDiv>
          {uploadedNovel?.empty ? (
            <EmptyDiv>작성한 소설이 존재하지 않습니다.</EmptyDiv>
          ) : (
            <NovelDiv>
              {uploadedNovel5?.map((novel, index: number) => {
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
            </NovelDiv>
          )}
        </UploadedNovelDiv>
      </NovelContent>
      <NovelContent>
        <SemiTitle title="구매한 소설" more="" />
      </NovelContent>
      <NovelContent>
        <SemiTitle title="좋아요한 소설" more="" />
      </NovelContent>
    </NovelWrapper>
  );
}

export default MyNovel;

const NovelWrapper = styled.div`
  margin-top: 2rem;
`;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const NovelContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadedNovelDiv = styled.div``;

const EmptyDiv = styled.div`
  padding-left: 8%;
  margin-top: 1rem;
  text-align: center;
`;

const NovelDiv = styled.div``;
