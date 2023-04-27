import React, { useState } from "react";
import styled from "styled-components";
import EditorMainListItem from "./EditorMainListItem";
import EditorMainAssetContainer from "../Asset/EditorMainAssetContainer";

interface TextBlock {
  id: number;
  text: string;
  image: string;
  sound: string;
}

type EditorMainListProps = {
  textBlocks: TextBlock[];
  setTextBlocks: React.Dispatch<React.SetStateAction<TextBlock[]>>;
};

function EditorMainList({ textBlocks, setTextBlocks }: EditorMainListProps) {
  const [assetOpen, setAssetOpen] = useState<number>(0);

  return (
    <MainContainer>
      <ListWrapper>
        {textBlocks.map((block, index) => (
          <EditorMainListItem
            setAssetOpen={setAssetOpen}
            key={index}
            block={block}
            textBlocks={textBlocks}
            setTextBlocks={setTextBlocks}
          />
        ))}
      </ListWrapper>
      {assetOpen ? <EditorMainAssetContainer
      assetOpen={assetOpen}
      /> : <></>}
    </MainContainer>
  );
}
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const ListWrapper = styled.div`
  /* border: 2px solid ${({ theme }) => theme.color.hover}; */
  height: 60vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
`;

const AssetWrapper = styled.div``;

export default EditorMainList;
