import React from "react";
import styled from "styled-components";

type SettingBoxProps = {
  setWriteMode:React.Dispatch<React.SetStateAction<boolean>>
}

function SettingBox({setWriteMode}:SettingBoxProps) {
  return (
    <BoxContainer>
      <BoxHeadContainer>
        뷰어설정
        <Button>X</Button>
      </BoxHeadContainer>
      <FontStyleContainer>
        글꼴
        <ButtonContainer>
          <Button>고딕체</Button>
          <Button>바탕체</Button>
          <Button>굴림체</Button>
        </ButtonContainer>
      </FontStyleContainer>
      <FontSizeContainer></FontSizeContainer>
      <LineIntervalContainer></LineIntervalContainer>
      <WriteStyleContainer>
        <Button onClick={()=>setWriteMode(false)}>TabMode</Button>
        <Button onClick={()=>setWriteMode(true)}>PageMode</Button>
      </WriteStyleContainer>
    </BoxContainer>
  );
}

const BoxContainer = styled.div`
  position: fixed;
  width: 15rem;
  height: 15rem;
  top: 45%;
  left: 75%;
  box-shadow: 0rem 0rem 1rem gray;
  border-radius: 1rem;
  z-index: 100000;
  padding: 1rem;
`;

const BoxHeadContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const FontStyleContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const ButtonContainer = styled.div``;
const Button = styled.button`
  padding-left: 0.5rem;
`;
const FontSizeContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const LineIntervalContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const WriteStyleContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export default SettingBox;
