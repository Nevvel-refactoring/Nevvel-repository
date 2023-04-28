import React, { useState } from "react";
import styled from "styled-components";
import EditorMainListItem from "./EditorMainListItem";
import EditorMainAssetContainer from "../Asset/EditorMainAssetContainer";

interface content {
  idx: number;
  context: string;
  event:event[]
}

interface event {
  assetId: number;
  type:string
}

type EditorMainListProps = {
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
};

function EditorMainList({ contents, setContents }: EditorMainListProps) {
  const [assetOpen, setAssetOpen] = useState<number>(0);
  

  return (
    <MainContainer>
      <ListWrapper>
        {contents.map((content, index) => (
          <EditorMainListItem
            setAssetOpen={setAssetOpen}
            key={index}
            content={content}
            contents={contents}
            setContents={setContents}
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
  background-color: ${({ theme })=> theme.color.background};
`

const ListWrapper = styled.div`
  /* border: 2px solid ${({ theme }) => theme.color.hover}; */
  height: 55vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
`;

const AssetWrapper = styled.div``;

const ItemContainer = styled.div`
  
`
export default EditorMainList;
