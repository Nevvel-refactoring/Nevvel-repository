import React from "react";
import styled from "styled-components";

function AssetstoreBanner() {
  return(
    <Wrapper>
      {/* 에셋스토어 배너 자리입니다 */}
      <img src="/assetstore_banner.png" alt="임시배너" />
    </Wrapper>
  )
}

export default AssetstoreBanner

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 4%;
  padding-top: 1%;
  padding-bottom: 1%;
  /* padding-left: 10%;
  padding-right: 10%; */
`;