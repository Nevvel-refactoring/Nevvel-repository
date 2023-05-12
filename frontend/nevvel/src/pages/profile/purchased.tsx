import springApi from "@/src/api";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { PurchaseData } from "./purchase";

function purchased() {
  const { query } = useRouter();

  const router = useRouter();

  const postHandler = async (purchasData: PurchaseData) => {
    const res = await springApi.post("/purchasing", purchasData);
    console.log(res);
  };

  useEffect(() => {
    if (query.imp_success === "true") {
      const impNum = query.imp_uid;
      const midNum = query.merchant_uid;
      const data = {
        impUid: impNum,
        midUid: midNum,
      };
      postHandler(data);
      // console.log(impNum, midNum);
    } else if (query.imp_success === "false") {
      router.push("/profile/purchase");
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
