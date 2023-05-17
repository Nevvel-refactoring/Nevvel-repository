import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginAtom, userInfoAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import NovelCard from "@/src/components/common/NovelCard";
import axios from "axios";
import springApi from "@/src/api";
import Image from "next/image";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";
import styled from "styled-components";

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

function UploadedNovel() {
  // 로그인 여부 확인
  const loginStatus = useAtomValue(loginAtom);
  const userInfoStatus = useAtomValue(userInfoAtom);

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  // 로그인 상태인 경우 axios 요청
  const router = useRouter();
  const [uploadedNovel, setUploadedNovel] = useState<Novel | undefined>(
    undefined
  );
  useEffect(() => {
    const getUploadedCovers = async () => {
      const res = await springApi.get(`/covers/uploader/${userInfoStatus?.id}`);
      // console.log(res.data);
      setUploadedNovel(res.data);
    };
    if (!loginStatus) {
      router.push({ pathname: "/" });
    } else {
      getUploadedCovers();
    }
  }, []);

  return (
    <Wrapper>
      <NovelTop>작성한 소설</NovelTop>
      {uploadedNovel?.empty ? (
        <NovelEmptyWrapper>
          <ImageWrapper>
            <Image
              src={nevvel_m_dark}
              alt="작성한 소설이 존재하지 않습니다."
              width={300}
              height={300}
            />
          </ImageWrapper>
          <NovelEmpty>작성한 소설이 존재하지 않습니다.</NovelEmpty>
        </NovelEmptyWrapper>
      ) : (
        <NovelExists>
          {uploadedNovel?.content.map((novel, index: number) => {
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

export default UploadedNovel;

const Wrapper = styled.div``;

const NovelTop = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 3rem;
  font-size: 1.5rem;
  font-weight: 800;
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
`;

const ImageWrapper = styled.div`
  margin-top: 2rem;
  opacity: 0.3;
`;

const NovelExists = styled.div``;
