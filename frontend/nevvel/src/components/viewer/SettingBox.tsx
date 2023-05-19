import { bigMobile, mobile, tabletH } from "@/src/util/Mixin";
import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { TbHandClick, TbMouse } from "react-icons/tb";
import { themeAtom } from "@/src/store/Theme";
import { useAtom } from "jotai";

type SettingBoxProps = {
  fontSize: number;
  whiteSpace: number;
  interval: number;
  viewerColor:string
  setWriteMode: React.Dispatch<React.SetStateAction<boolean>>;
  setFontStyle: React.Dispatch<React.SetStateAction<string>>;
  setInterval: React.Dispatch<React.SetStateAction<number>>;
  setWhiteSpace: React.Dispatch<React.SetStateAction<number>>;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  setViewerColor: React.Dispatch<React.SetStateAction<string>>;
};

function SettingBox({
  fontSize,
  whiteSpace,
  interval,
  viewerColor,
  setWriteMode,
  setFontStyle,
  setInterval,
  setWhiteSpace,
  setFontSize,
  setViewerColor,
}: SettingBoxProps) {
  const fontStyleHandler = (e: string) => {
    setFontStyle(e);
  };



  const viewerHandler = (e: string) => {
    if (e == "minusSize" && fontSize >= 2) {
      setFontSize(fontSize - 1);
    } else if (e == "plusSize" && fontSize <= 5) {
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

  const viewerColorHandler = (color:string) => {
    if (color == "black"){
      setViewerColor("#1a1a1a")
    }else if (color == "white"){
      setViewerColor("#fefefe")
    }else if (color == "yellow"){
      setViewerColor("#f4f4c8")
    }else if (color == "green"){
      setViewerColor("#b7d8be")
    }
  }

  return (
    <BoxContainer viewerColor={viewerColor}>
      <BoxHeadContainer>뷰어설정</BoxHeadContainer>
      <FontContainer>
        글꼴
        <ButtonContainer>
          <Button viewerColor={viewerColor} className="defalut" onClick={() => fontStyleHandler("")}>
            기본체
          </Button>
          <Button viewerColor={viewerColor} className="Batang" onClick={() => fontStyleHandler("Batang")}>
            바탕체
          </Button>
          <Button viewerColor={viewerColor} className= "Gungsuh" onClick={() => fontStyleHandler("Gungsuh")}>궁서체</Button>
        </ButtonContainer>
      </FontContainer>
      <FontSizeContainer>
        글씨 크기
        <ButtonContainer>
          <Button viewerColor={viewerColor} className="arrow" onClick={() => viewerHandler("minusSize")}>
            <AiFillCaretLeft />
          </Button>
          <Num>{fontSize}</Num>
          <Button viewerColor={viewerColor} className="arrow" onClick={() => viewerHandler("plusSize")}>
            <AiFillCaretRight />
          </Button>
        </ButtonContainer>
      </FontSizeContainer>
      <LineIntervalContainer>
        줄 간격
        <ButtonContainer>
          <Button viewerColor={viewerColor}
            className="arrow"
            onClick={() => viewerHandler("minusInterval")}
          >
            <AiFillCaretLeft />
          </Button>
          <Num>{interval}</Num>
          <Button viewerColor={viewerColor}
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
          <Button viewerColor={viewerColor}
            className="arrow"
            onClick={() => viewerHandler("minusWhiteSpace")}
          >
            <AiFillCaretLeft />
          </Button>
          <Num>{whiteSpace}</Num>
          <Button viewerColor={viewerColor}
            className="arrow"
            onClick={() => viewerHandler("plusWhiteSpace")}
          >
            <AiFillCaretRight />
          </Button>
        </ButtonContainer>
      </WhiteSpaceContainer>
      <WriteStyleContainer>
        읽기모드
        <ButtonContainer>
          <Button viewerColor={viewerColor} className="tab" onClick={() => setWriteMode(false)}>
            Tab<TbHandClick size={18} />
          </Button>
          <Button viewerColor={viewerColor} className="scroll" onClick={() => setWriteMode(true)}>
            Scroll<TbMouse size={18} />
          </Button>
        </ButtonContainer>
      </WriteStyleContainer>
      <ColorContainer>
        색상
          <Button viewerColor={viewerColor} className="black" onClick={() => viewerColorHandler("black")}>
          &nbsp;&nbsp;
          </Button>
          <Button viewerColor={viewerColor} className="white" onClick={() => viewerColorHandler("white")}>
          &nbsp;&nbsp;
          </Button>
          <Button viewerColor={viewerColor} className="yellow" onClick={() => viewerColorHandler("yellow")}>
          &nbsp;&nbsp;
          </Button>
          <Button viewerColor={viewerColor} className="green" onClick={() => viewerColorHandler("green")}>
          &nbsp;&nbsp;
          </Button>
      </ColorContainer>
    </BoxContainer>
  );
}

const BoxContainer = styled.div<{viewerColor:string}>`
  position: absolute;
  width: 15rem;
  height: 15rem;
  top: 50%;
  left: 73%;
  box-shadow: 0rem 0rem 1px gray;
  border-radius: 1rem;
  z-index: 100000;
  padding: 1rem;
  background-color:${(props)=>props.viewerColor ?(props.viewerColor):("#fefefe")};
  color:${(props)=>props.viewerColor =="#1a1a1a" ? ("#fefefe"):("#1a1a1a")};
  ${tabletH} {
    top: 50%;
    left: 55%;
  }
  ${bigMobile}{
    width: 100%;
    height: 15rem;
    top: 60vh;
    left: 0;
    box-shadow: none;
    border-radius:0px
  }
  ${mobile} {
    width: 100%;
    height: 15rem;
    top: 60vh;
    left: 0;
    box-shadow: none;
    border-radius:0px
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
const Button = styled.button<{viewerColor:string}>`
  display: flex;
  padding-left: 0.5rem;
  text-align: center;
  height: 100%;
  color:${(props)=>props.viewerColor =="#1a1a1a" ? ("#fefefe"):("#1a1a1a")};

  &.defalut {
    border-right: 1px solid ${({ theme }) => theme.color.text1};
    padding-right: 0.5rem;
    font-size: 12px;
  }
  &.Batang {
    border-right: 1px solid ${({ theme }) => theme.color.text1};
    padding-right: 0.5rem;
    font-family: "Batang";
    font-size: 12px;
  }

  &.Gungsuh {
    padding-right: 0.5rem;
    font-family: "Gungsuh";
    font-size: 12px;
  }

  &.tab{
    width: 60px;
  }
  &.scroll{
    width: 60px;
  }

  &.arrow {
    padding-left: 0rem;
  }

  &.black {
    background-color: #1a1a1a;
    border-radius: 50%;
    box-shadow: 0px 0px 1px gray;
  }
  &.white {
    background-color: #fefefe;
    border-radius: 50%;
    box-shadow: 0px 0px 1px gray;
  }
  &.green {
    background-color: #a3ccac;
    border-radius: 50%;
    box-shadow: 0px 0px 1px gray;
  }
  &.yellow {
    background-color: #f5f5bc;
    border-radius: 50%;
    box-shadow: 0px 0px 1px gray;
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

const ColorContainer = styled.div`
  display: flex;
  justify-content: space-between;

`
// const ColorBtnContainer = styled.div`
//   display: flex;
//   align-items: center;
//   text-align: center;
//   justify-content: space-between;
//   height: 100%;
// ` 
const Num = styled.div`
  width: 3rem;
`;
const Space = styled.div`
  width: 18px;
`;
export default SettingBox;
