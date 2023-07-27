import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import EditorMainListItem from "./EditorMainListItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "@atlaskit/css-reset";

import { content, episode } from "editor";
import { useRouter } from "next/router";

type EditorMainListProps = {
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
};

function EditorMainList({ contents, setContents }: EditorMainListProps) {
  const router = useRouter();
  const eid = router.query.eid;

  const handleChage = (result: any) => {
    if (!result.destination) return;
    const items = [...contents];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setContents(items);
  };

  return (
    <DragDropContext onDragEnd={handleChage}>
      <MainWrapper>
        <Droppable droppableId="cardlists">
          {(provided) => (
            <MainContainer {...provided.droppableProps} ref={provided.innerRef}>
              {contents.map((content, index) => (
                <Draggable
                  draggableId={content.idx}
                  index={index}
                  key={content.idx}
                >
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <EditorMainListItem
                        key={content.idx}
                        content={content}
                        contents={contents}
                        setContents={setContents}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              <>{provided.placeholder}</>
            </MainContainer>
          )}
        </Droppable>
      </MainWrapper>
    </DragDropContext>
  );
}

const MainWrapper = styled.div`
  /* overflow: scroll; */
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 10px;
  /* box-shadow: 0px 0px 3px gray; */
  /* margin-bottom:10vh; */
`;

const ListWrapper = styled.div`
  /* border: 2px solid ${({ theme }) => theme.color.hover}; */
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
    margin-bottom: 1rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  /* padding: 0.5rem; */
  /* background-color: ${({ theme }) => theme.color.secondary}; */
  /* border-radius: 5px; */
  /* box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1); */
`;

const AssetWrapper = styled.div``;

const ItemContainer = styled.div``;
export default EditorMainList;
