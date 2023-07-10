import React from "react";
import { Btn,BtnContainer } from "../../styles/Editor.styled";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";

type EditorPublishPointProps = {
  pointChange: number;
  setPointChange: React.Dispatch<React.SetStateAction<number>>;
};

function EditorPublishPoint({
  pointChange,
  setPointChange,
}: EditorPublishPointProps) {

  const HandleChange = (e: string) => {
    if (e == "-" && pointChange > 0) {
      setPointChange(pointChange - 100);
    } else if (e == "+") setPointChange(pointChange + 100);
  };

  return (
    <div>
      <div>{pointChange}point</div>
      <BtnContainer>
        <Btn onClick={() => HandleChange("-")}>
          <BiCaretDown />
        </Btn>
        <Btn onClick={() => HandleChange("+")}>
          <BiCaretUp />
        </Btn>
      </BtnContainer>
    </div>
  );
}


export default EditorPublishPoint;
