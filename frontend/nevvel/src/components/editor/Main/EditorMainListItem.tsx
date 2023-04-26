import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

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
};

function EditorMainListItem({
  block,
  textBlocks,
  setTextBlocks,
}: EditorMainListItemProps) {
  const [plus, setPlus] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    console.log(textBlocks);
  }, [textBlocks]);

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
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event: React.FormEvent<HTMLDivElement>) => {
    setIsComposing(false);
    handleChange(event);
  };

  return (
    <BlockContainer>
      {plus ? (
        <>
          <AssetButton onClick={() => setPlus(!plus)}>-</AssetButton>
          <div>{block.image}</div>
          <div>{block.sound}</div>
        </>
      ) : (
        <AssetButton onClick={() => setPlus(!plus)}>+</AssetButton>
      )}
      <TextBlock
        key={block.id}
        contentEditable="true"
        suppressContentEditableWarning
        onInput={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        ref={textRef}
      >
        {block.text}
      </TextBlock>
      <RemoveButton onClick={() => RemoveHandler(block)}>X</RemoveButton>
    </BlockContainer>
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
const AssetButton = styled.button`
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

const RemoveButton = styled.button``;

export default EditorMainListItem;
