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
  setTextBlocks: React.Dispatch<React.SetStateAction<TextBlock[]>>;
};

function EditorMainList({ textBlocks, setTextBlocks }: EditorMainListProps) {


  return (
    <ListWrapper>
      {textBlocks.map((block, index) => (
          <EditorMainListItem
            key={index}
            block={block}
            textBlocks={textBlocks}
            setTextBlocks={setTextBlocks}
          />
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.text1};
  height: 60vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const BlockContainer = styled.div`
  width: 100%;
  display: inline-flex;
`;
const RemoveButton = styled.button`
  width: 10%;
`;

export default EditorMainList;
