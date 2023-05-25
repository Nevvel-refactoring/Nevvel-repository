import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SeriesHeader from "@/src/components/series/SeriesHeader";
import SeriesMain from "@/src/components/series/SeriesMain";
import springApi from "@/src/api";
import { cover } from "series";
import { useRouter } from "next/dist/client/router";
import { mobile, tabletH } from "@/src/util/Mixin";

import { NextPageContext } from "next";
import { loginAtom, userInfoAtom } from "../../../store/Login";
import { useAtom } from "jotai";

function index(props: { userDTO: string }) {
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

  const [seriesData, setSeriesData] = useState<cover>();
  const [isPurchased, setIsPurchase] = useState<number>(0);
  const router = useRouter();
  const id = router.query.id;

  // cover 정보 받아오기
  const getSeriesData = async (Id: number) => {
    const res = await springApi.get(`/covers/${Id}`);
    if (res) {
      setSeriesData(res.data);
    }
  };

  useEffect(() => {
    if (id) {
      const Id = Number(id);
      getSeriesData(Id);
    }
  }, [id, isPurchased]);

  return (
    <Wrapper>
      {seriesData && (
        <SeriesWrapper>
          <SeriesHeader
            SeriesData={seriesData}
            coverId={seriesData.coverId}
            setIsPurchase={setIsPurchase}
            isPurchased={isPurchased}
          />
          <SeriesMain SeriesData={seriesData} />
        </SeriesWrapper>
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

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  padding: 0;
  margin: 0;
`;
const SeriesWrapper = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  position: relative;
  ${tabletH} {
    margin-left: 10%;
    margin-right: 10%;
  }
  ${mobile} {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

export default index;
