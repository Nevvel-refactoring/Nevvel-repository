import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineSound } from "react-icons/ai";
import EditorMainMenu from "./EditorMainMenu";
import { mobile } from "@/src/util/Mixin";

interface TextBlock {
  id: number;
  text: string;
  image: string;
  sound: string;
}

type EditorMainListItemProps = {
  block: TextBlock;
  textBlocks: TextBlock[];
  setTextBlocks: React.Dispatch<React.SetStateAction<TextBlock[]>>;
  setAssetOpen: React.Dispatch<React.SetStateAction<number>>;
};

function EditorMainListItem({
  block,
  textBlocks,
  setTextBlocks,
  setAssetOpen,
}: EditorMainListItemProps) {
  const [plus, setPlus] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [text, setText] = useState(block.text);
  const [menuBlock, setMenuBlock] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    console.log(text);
  }, [text]);

  const RemoveHandler = (block: TextBlock) => {
    const id = block.id;
    setTextBlocks(textBlocks.filter((el) => el.id !== id));
  };

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    if (isComposing) {
      return;
    }
    const newBlocks = [...textBlocks];
    const index = newBlocks.findIndex((el) => el.id === block.id);
    newBlocks[index].text = event.currentTarget.textContent ?? "";
    setTextBlocks(newBlocks);

    if (textRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    setText(event.currentTarget.innerHTML);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event: React.FormEvent<HTMLDivElement>) => {
    setIsComposing(false);
    handleChange(event);
  };

  

  const handleContextMenu = (event: any) => {
    event.preventDefault();
    setTooltipPos({ x: event.clientX, y: event.clientY });
    setMenuBlock(true);
  };

  return (
    <div onMouseLeave={()=>setMenuBlock(false)}>
      {menuBlock ? <EditorMainMenu x={tooltipPos.x} y={tooltipPos.y} setText={setText} /> : null}
      <BlockContainer >
        {plus ? (
          <>
            <PlusButton onClick={() => setPlus(!plus)}>-</PlusButton>
            <AssetButtonContainer>
              <AssetButton onClick={() => setAssetOpen(1)}>
                <BiImageAdd className="image" size="24" />
              </AssetButton>
              <AssetButton onClick={() => setAssetOpen(2)}>
                <AiOutlineSound className="sound" size="24" />
              </AssetButton>
            </AssetButtonContainer>
          </>
        ) : (
          <PlusButton onClick={() => setPlus(!plus)}>+</PlusButton>
        )}
        <TextBlock
          key={block.id}
          contentEditable="true"
          suppressContentEditableWarning
          onInput={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          ref={textRef}
          dangerouslySetInnerHTML={{ __html: text }}
          onContextMenu={handleContextMenu}
          
        />
        <RemoveButton onClick={() => RemoveHandler(block)}>
          <BsFillTrashFill size="24" />
        </RemoveButton>
      </BlockContainer>
    </div>
  );
}

const BlockContainer = styled.div`
  color: ${({ theme }) => theme.color.text1};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;
const AssetButtonContainer = styled.div`
  width: 10rem;
  display: inline-flex;
  text-align: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  justify-content: center;
`;

const AssetButton = styled.button`
  width: 3.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 0.3rem;
  border: 2px solid ${({ theme }) => theme.color.hover};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.hover};
  :hover {
    color: ${({ theme }) => theme.color.point};
    border: 2px solid ${({ theme }) => theme.color.point};
  }
`;

const PlusButton = styled.button`
  width: 2rem;
  color: ${({ theme }) => theme.color.point};
  font-size: 2rem;
  margin-left: 1rem;
  display: flex;
  text-align: center;
  align-items: center;

`;

const TextBlock = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.editor};
  height: 3rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  display: flex;
  width: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.color.hover};
  :hover {
    ${({ theme }) => theme.color.point};
  }
`;

export default EditorMainListItem;
