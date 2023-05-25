import springApi from "@/src/api";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { PurchaseData } from "./purchase";
import { loginAtom, userInfoAtom } from "@/src/store/Login";
import { useAtom } from "jotai";

import { NextPageContext } from "next";

function purchased(props: { userDTO: string }) {
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

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트 (예정)
  const router = useRouter();

  const { query } = useRouter();

  const postHandler = async (pointChargeDto: PurchaseData) => {
    try {
      const res = await springApi.post("/point-charge", pointChargeDto);
      if (res.status === 200) {
        router.push("/myPage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.imp_success === "true") {
      const impNum = query.imp_uid;
      const midNum = query.merchant_uid;
      postHandler({
        impNum: impNum,
        midNum: midNum,
      });
    } else if (query.imp_success === "false") {
      router.push("/myPage/purchase");
    }
  }, [query]);
  return (
    <Wrapper>
      <StyledP>결제 완료</StyledP>
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
  display: flex;
  justify-content: center;
  padding: 10rem;
`;

const StyledP = styled.p`
  color: ${({ theme }) => theme.color.point};
  font-size: larger;
  font-weight: 600;
  margin: 0rem 0rem 2rem;
`;

export default purchased;
