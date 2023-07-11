import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import NovelCard from "@/src/components/common/NovelCard";
import { NewvelApi } from "@/src/api";
import Image from "next/image";
import { NextPageContext } from "next";
import styled from "styled-components";

import { Novel } from "novel";
import { loginAtom, userInfoAtom } from "@/src/store/Login";
import { NewvelApi } from "@/src/api";

import NovelCard from "@/src/components/common/NovelCard";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";

function LikedNovel(props: { userDTO: string }) {
  const userDTO = props.userDTO === "" ? "" : JSON.parse(props.userDTO);
  const newUserInfo =
    userDTO === ""
      ? undefined
      : {
          id: userDTO.id,
          nickname: userDTO.nickname,
          profileImage: userDTO.profileImage,
          point: userDTO.point,
        };

  // 쿠키 상태 관리
  const [loginStatus, setLoginStatus] = useAtom(loginAtom);
  const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoAtom);
  useEffect(() => {
    setLoginStatus(userDTO === "" ? false : true);
    setUserInfoStatus(newUserInfo);
  }, []);

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
                isUploaded={novel.isUploaded}
                isNew={novel.isNew}
              />
            );
          })}
        </NovelExists>
      )}
    </Wrapper>
  );
}

// 쿠키 확인
export async function getServerSideProps({ req }: NextPageContext) {
  const cookies =
    req && req.headers && req.headers.cookie ? req.headers.cookie : "";
  const cookie = decodeURIComponent(cookies);
  // 쿠키를 ; 기준으로 나누어 그 중 userDto가 존재하는지 확인
  const parts = cookie.split("; ");
  let userDTOcookie = "";
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith("userDto=")) {
      userDTOcookie = parts[i].substring("userDto=".length);
      break;
    }
  }
  return {
    props: {
      userDTO: userDTOcookie,
    },
  };
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
  margin-left: 10%;
  margin-right: 10%;
`;
