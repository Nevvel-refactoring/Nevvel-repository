import springApi from "@/src/api";
import { mobile } from "@/src/util/Mixin";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { episode } from "series";
import styled from "styled-components";

type SeriesEpOnePurchaseProps = {
  Info: episode;
};

function SeriesEpOnePurchase({ Info }: SeriesEpOnePurchaseProps) {
  const router = useRouter();
  const episodePurchase = async () => {
    try {
      const res = await springApi.post("episodes/purchasing", {
        coverId: Number(router.query.id),
        episodes: [Info.id],
      });
      if (res.status === 201) {
        console.log(res);
        router.push(`/viewer/${Info.id}`);
      } else if (res.status === 200) {
        if (confirm("포인트가 부족합니다. 충전하러 가시겠습니까?")) {
          router.push("/myPage/purchase");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <WalletPoint>00님의 남은 포인트 xxxp</WalletPoint>
      <Wrapper>
        <PurchaseWrapper>
          <PurchaseTitle>{Info.title}</PurchaseTitle>
          <PurchasePoint>{Info.point}p</PurchasePoint>
        </PurchaseWrapper>
        <SeriesBtn onClick={episodePurchase}>구매하기</SeriesBtn>
      </Wrapper>
    </div>
  );
}

const PurchaseTitle = styled.p`
  color: ${({ theme }) => theme.color.text1};
  align-self: flex-end;
  margin: 5px;
  font-size: 1rem;
`;

const PurchasePoint = styled.p`
  color: ${({ theme }) => theme.color.text1};
  font-size: 0.8rem;
  align-self: flex-end;
  margin: 5px;
`;

const WalletPoint = styled.p`
  color: ${({ theme }) => theme.color.text1};
  font-size: 0.8rem;
  align-self: flex-end;
  margin: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 100;
`;

const PurchaseWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20rem;
`;

const SeriesBtn = styled.button`
  box-shadow: 0px 0px 1px ${({ theme }) => theme.color.text1};
  max-width: fit-content;
  padding: 0rem 1rem;
  height: 2rem;
  border-radius: 10px;
  margin-left: 0.5rem;
  background-color: ${({ theme }) => theme.color.text1};
  color: ${({ theme }) => theme.color.text2};
`;

export default SeriesEpOnePurchase;
