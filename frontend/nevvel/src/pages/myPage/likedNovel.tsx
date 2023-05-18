import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import NovelCard from "@/src/components/common/NovelCard";
import axios from "axios";
import { NewvelApi } from "@/src/api";
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

function LikedNovel() {
  // 로그인 여부 확인
  const loginStatus = useAtomValue(loginAtom);

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  // 로그인 상태인 경우 axios 요청
  const router = useRouter();
  const [likedNovel, setLikedNovel] = useState<Novel | undefined>(undefined);
  useEffect(() => {
    const getLikedCovers = async () => {
      const res = await NewvelApi.likesCovers();
      // console.log(res.data);
      setLikedNovel(res.data);
    };
    // if (!loginStatus) {
    //   router.push({ pathname: "/" });
    // } else {
    getLikedCovers();
    // }
  }, []);

  return (
    <Wrapper>
      <NovelTop>좋아요한 소설</NovelTop>
      {likedNovel?.empty ? (
        <NovelEmptyWrapper>
          <ImageWrapper>
            <Image
              src={nevvel_m_dark}
              alt="좋아요한 소설이 존재하지 않습니다."
              width={300}
              height={300}
            />
          </ImageWrapper>
          <NovelEmpty>좋아요한 소설이 존재하지 않습니다.</NovelEmpty>
        </NovelEmptyWrapper>
      ) : (
        <NovelExists>
          {likedNovel?.content.map((novel, index: number) => {
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

export default LikedNovel;

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

const NovelExists = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
