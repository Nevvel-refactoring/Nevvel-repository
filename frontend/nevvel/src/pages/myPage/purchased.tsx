import springApi from "@/src/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PurchaseData } from "./purchase";
import { loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";

function purchased() {
  // 로그인 여부 확인
  const loginStatus = useAtomValue(loginAtom);

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  const router = useRouter();
  // useEffect(() => {
  //   if (!loginStatus) {
  //     router.push({ pathname: "/" });
  //   }
  // }, []);

  const { query } = useRouter();

  const postHandler = async (pointChargeDto: PurchaseData) => {
    try {
      const res = await springApi.post("/point-charge", pointChargeDto);
      if (res.status === 200) {
        console.log(res);
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
      // console.log(impNum, midNum);
      // router.push("/profile");
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
