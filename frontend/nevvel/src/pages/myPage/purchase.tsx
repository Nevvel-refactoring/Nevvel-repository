import springApi from "@/src/api";
import RadioInput from "@/src/components/common/RadioInput";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import styled from "styled-components";

export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel?: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}

export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface PurchaseData {
  impNum: string | string[] | undefined | null;
  midNum: string | string[] | undefined;
}

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback
  ) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

function Purchase() {
  // 로그인 여부 확인
  const loginStatus = useAtomValue(loginAtom);
  const router = useRouter();

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  useEffect(() => {
    if (!loginStatus) {
      router.push({ pathname: "/#" });
    }
  }, []);

  const [amount, setAmount] = useState<number>(1000);

  const money = [
    {
      id: 1000,
      value: 1000,
      labelText: "1,000",
    },
    {
      id: 5000,
      value: 5000,
      labelText: "5,000",
    },
    {
      id: 10000,
      value: 10000,
      labelText: "10,000",
    },
    {
      id: 50000,
      value: 50000,
      labelText: "50,000",
    },
  ];

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

  const onClickPayment = () => {
    if (!window.IMP) return;

    const { IMP } = window;
    IMP.init("imp88176312");

    const data: RequestPayParams = {
      pg: "kakaopay", // PG사 : https://portone.gitbook.io/docs/sdk/javascript-sdk/payrq#undefined-1 참고
      pay_method: "kakaopay", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: amount, // 결제금액
      name: "NEVVEL 포인트 충전", // 주문명
      //   buyer_name: "홍길동", // 구매자 이름
      //   buyer_tel: "01012341234", // 구매자 전화번호
      // buyer_email: "example@example", // 구매자 이메일(사용자 정보 저장 가능해지면 수정)
      //   buyer_addr: "신사동 661-16", // 구매자 주소
      //   buyer_postcode: "06018", // 구매자 우편번호
      m_redirect_url: "http://k8d1061.p.ssafy.io/myPage/purchased", // 예: https://www.my-service.com/payments/complete
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response: RequestPayResponse) => {
    const { success, error_msg, merchant_uid, imp_uid } = response;

    if (success) {
      // console.log(success, merchant_uid, imp_uid);
      postHandler({
        impNum: imp_uid,
        midNum: merchant_uid,
      });
      //   axios.post(우리링크, amout, user 정보 넣어서 보내기)
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <Wrapper>
      <CenterDiv>
        <BigP>포인트 충전</BigP>
        <GridDiv>
          {money.map((e) => {
            return (
              <RadioInput
                key={e.id}
                id={e.id}
                value={e.value}
                labelText={e.labelText}
                name="point"
                current={amount}
                setValue={setAmount}
              />
            );
          })}
        </GridDiv>
        <ChargeP onClick={onClickPayment}>
          {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          카카오페이로 결제하기
        </ChargeP>
      </CenterDiv>
    </Wrapper>
  );
}

export default Purchase;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  justify-content: center;
`;

const CenterDiv = styled.div`
  text-align: center;
  margin: 5rem;
`;

const BigP = styled.p`
  color: ${({ theme }) => theme.color.point};
  font-size: larger;
  font-weight: 600;
  margin: 0rem 0rem 2rem;
`;

const ChargeP = styled.p`
  margin: 2rem 0.5rem;
  padding: 1rem;
  width: 25rem;
  border: 1.5px solid;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text2};
  background-color: ${({ theme }) => theme.color.text1};
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
