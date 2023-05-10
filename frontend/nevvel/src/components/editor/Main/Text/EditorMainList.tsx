import React, { useState } from "react";
import styled from "styled-components";
import EditorMainListItem from "./EditorMainListItem";
import EditorMainAssetContainer from "../Asset/EditorMainAssetContainer";
import { content } from "editor";
type EditorMainListProps = {
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
};

function EditorMainList({ contents, setContents }: EditorMainListProps) {

  return (
    <MainContainer>
      <ListWrapper>
        {contents.map((content, index) => (
          <EditorMainListItem
            key={index}
            content={content}
            contents={contents}
            setContents={setContents}
          />
        ))}
      </ListWrapper>
    </MainContainer>
  );
}
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 10px;
  /* box-shadow: 0px 0px 3px gray; */
`;

const ListWrapper = styled.div`
  /* border: 2px solid ${({ theme }) => theme.color.hover}; */
  height: 60vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AssetWrapper = styled.div``;

const ItemContainer = styled.div``;
export default EditorMainList;
