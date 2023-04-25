import React from "react";
import styled from "styled-components";
import EditorMainListItem from "./EditorMainListItem";

interface TextBlock {
  id: number;
  text: string;
  image: string;
  sound: string;
}

type EditorMainListProps = {
  textBlocks: TextBlock[];
};

function EditorMainList({ textBlocks }: EditorMainListProps) {
  return (
    <ListWrapper>
      {textBlocks.map((block, index) => (
        <EditorMainListItem
          key={index}
          block={block}
        />
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
    border : 1px solid ${({ theme }) => theme.color.text1};
    height: 60vh;
    display: flex;
    flex-direction: column;
    overflow:scroll;
  `;

export default EditorMainList;
