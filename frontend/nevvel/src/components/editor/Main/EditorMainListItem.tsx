import React, { useState } from "react";
import styled from "styled-components";

interface TextBlock {
  id: number;
  text: string;
  image: string;
  sound: string;
}

type EditorMainListItemProps = {
  block: TextBlock;
};

function EditorMainListItem({ block }: EditorMainListItemProps) {
  const [plus, setPlus] = useState(false);

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

      <TextBlock>{block.text}</TextBlock>
      <RemoveButton>삭제</RemoveButton>
    </BlockContainer>
  );
}

const BlockContainer = styled.div`
  color: ${({ theme}) => theme.color.text1};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const AssetButton = styled.button`
  margin-left: 1rem;
  display: flex;
  text-align: center;
  align-items: center;
`

const TextBlock = styled.div`
  width: 80%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.editor};
  height:3rem ;
  padding-left: 1rem;
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  
`;

export default EditorMainListItem;
