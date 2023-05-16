import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Wrapper>
      <p>
        <b>(주)Nevvel</b>
      </p>
      <FlexDiv>
        <p>개발팀: Free Season</p>
        <p>|</p>
        <p>SSAFY 8기 구미 캠퍼스 : 김유홍 박희종 김민지 김호균 김현진 이시준</p>
      </FlexDiv>
      <SmallFont>
        <p>사업자 등록 번호: xxx-xx-xxxxx</p>
        <p>고객센터: 0000-0000</p>
        <p>이메일: example@nevvel.com</p>
      </SmallFont>
      <CopyrightP>
        본 사이트에 등록된 콘텐츠는 사이트 및 원 저작권자에 권리가 있는
        콘텐츠이며, 무단 복제/전송/수정/배포는 법적 처벌을 받을 수 있습니다.
        Copyright © Nevvel, All Rights Reserved.
      </CopyrightP>
    </Wrapper>
  );
}

export default Footer;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.hover};
  opacity: 30%;
  padding: 30px;
  margin: 50px 0px;
  bottom: 0;
`;

const SmallFont = styled.div`
  p {
    font-size: 14px;
    padding: 5px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  margin: 1rem 1rem 1rem 0rem;
  p {
    font-size: 15px;
    margin-right: 1rem;
  }
`;

const CopyrightP = styled.p`
  font-size: 15px;
  margin-top: 7px;
  line-height: 130%;
`;
