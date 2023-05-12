import { mobile, tabletH } from "@/src/util/Mixin";
import React from "react";
import styled from "styled-components";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

type SettingBoxProps = {
  fontSize: number;
  whiteSpace: number;
  interval: number;
  setWriteMode: React.Dispatch<React.SetStateAction<boolean>>;
  setFontStyle: React.Dispatch<React.SetStateAction<string>>;
  setInterval: React.Dispatch<React.SetStateAction<number>>;
  setWhiteSpace: React.Dispatch<React.SetStateAction<number>>;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
};

function SettingBox({
  fontSize,
  whiteSpace,
  interval,
  setWriteMode,
  setFontStyle,
  setInterval,
  setWhiteSpace,
  setFontSize,
}: SettingBoxProps) {
  const fontStyleHandler = (e: string) => {
    setFontStyle(e);
  };

  const viewerHandler = (e: string) => {
    if (e == "minusSize" && fontSize >= 2) {
      setFontSize(fontSize - 1);
    } else if (e == "plusSize" && fontSize <=5) {
      setFontSize(fontSize + 1);
    } else if (e == "minusInterval" && interval >= 1) {
      setInterval(interval - 1);
    } else if (e == "plusInterval" && interval <= 4) {
      setInterval(interval + 1);
    } else if (e == "minusWhiteSpace" && whiteSpace >= 1) {
      setWhiteSpace(whiteSpace - 1);
    } else if (e == "plusWhiteSpace" && whiteSpace <= 2) {
      setWhiteSpace(whiteSpace + 1);
    }
  };

  return (
    <BoxContainer>
      <BoxHeadContainer>
        뷰어설정
        <Button>X</Button>
      </BoxHeadContainer>
      <FontContainer>
        글꼴
        <ButtonContainer>
          <Button className="defalut" onClick={() => fontStyleHandler("")}>
            기본체
          </Button>
          <Button className="Batang" onClick={() => fontStyleHandler("Batang")}>
            바탕체
          </Button>
          <Button onClick={() => fontStyleHandler("Gungsuh")}>궁서체</Button>
        </ButtonContainer>
      </FontContainer>
      <FontSizeContainer>
        글씨 크기
        <ButtonContainer>
          <Button className="arrow" onClick={() => viewerHandler("minusSize")}>
            <AiFillCaretLeft />
          </Button>
          <Num>{fontSize}</Num>
          <Button className="arrow" onClick={() => viewerHandler("plusSize")}>
            <AiFillCaretRight />
          </Button>
        </ButtonContainer>
      </FontSizeContainer>
      <LineIntervalContainer>
        줄 간격
        <ButtonContainer>
          <Button
            className="arrow"
            onClick={() => viewerHandler("minusInterval")}
          >
            <AiFillCaretLeft />
          </Button>
          <Num>{interval}</Num>
          <Button
            className="arrow"
            onClick={() => viewerHandler("plusInterval")}
          >
            <AiFillCaretRight />
          </Button>
        </ButtonContainer>
      </LineIntervalContainer>
      <WhiteSpaceContainer>
        여백
        <ButtonContainer>
          <Button
            className="arrow"
            onClick={() => viewerHandler("minusWhiteSpace")}
          >
            <AiFillCaretLeft />
          </Button>
          <Num>{whiteSpace}</Num>
          <Button
            className="arrow"
            onClick={() => viewerHandler("plusWhiteSpace")}
          >
            <AiFillCaretRight />
          </Button>
        </ButtonContainer>
      </WhiteSpaceContainer>
      <WriteStyleContainer>
        <Button onClick={() => setWriteMode(false)}>TabMode</Button>
        <Button onClick={() => setWriteMode(true)}>PageMode</Button>
      </WriteStyleContainer>
    </BoxContainer>
  );
}

const BoxContainer = styled.div`
  position: absolute;
  width: 15rem;
  height: 15rem;
  top: 50%;
  left: 77%;
  box-shadow: 0rem 0rem 1rem gray;
  border-radius: 1rem;
  z-index: 100000;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.background};
  ${tabletH} {
    top: 60%;
    left: 55%;
  }
  ${mobile} {
    left: 15%;
  }
`;

const BoxHeadContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const FontContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;
`;
const Button = styled.button`
  display: flex;
  padding-left: 0.5rem;
  text-align: center;
  height: 100%;

  &.defalut,
  &.Batang {
    border-right: 1px solid ${({ theme }) => theme.color.text1};
    padding-right: 0.5rem;
  }

  &.arrow {
    padding-left: 0rem;
  }
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

const WhiteSpaceContainer = styled.div`
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

const Num = styled.div`
  width: 3rem;
`;

export default SettingBox;
