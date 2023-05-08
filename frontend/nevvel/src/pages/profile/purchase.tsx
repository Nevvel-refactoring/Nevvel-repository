import React, { useState } from "react";
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
  const [amount, setAmount] = useState<number>(0);

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
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
      //   buyer_email: "example@example", // 구매자 이메일
      //   buyer_addr: "신사동 661-16", // 구매자 주소
      //   buyer_postcode: "06018", // 구매자 우편번호
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response: RequestPayResponse) => {
    const { success, paid_amount, error_msg } = response;

    if (success) {
      console.log(success, paid_amount);
      //   axios.post(우리링크, amout, user 정보 넣어서 보내기)
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <Wrapper>
      포인트 충전
      <label>
        <input type="radio" value="1000" name="purchase" onChange={onChecked} />
        1,000
      </label>
      <label>
        <input type="radio" value="5000" name="purchase" onChange={onChecked} />
        5,000
      </label>
      <label>
        <input
          type="radio"
          value="10000"
          name="purchase"
          onChange={onChecked}
        />
        10,000
      </label>
      <label>
        <input
          type="radio"
          value="50000"
          name="purchase"
          onChange={onChecked}
        />
        50,000
      </label>
      <p onClick={onClickPayment}>{amount}원 결제하기</p>
    </Wrapper>
  );
}

export default Purchase;

const Wrapper = styled.div``;
