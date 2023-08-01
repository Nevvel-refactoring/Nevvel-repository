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


import { content, episode } from "editor";
import { useRouter } from "next/router";

type EditorMainListProps = {
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
};

function EditorMainList({ contents, setContents }: EditorMainListProps) {
  const router = useRouter();
  const eid = router.query.eid;
  const [deleteBlock, setDeleteBlock] = useState("");
  const handleChage = (result: any) => {
    if (!result.destination) return;
    const items = [...contents];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setContents(items);
  };

  useEffect(() => {
    const fIndex = contents.findIndex((el) => el.idx === deleteBlock);
    if (contents && contents[fIndex]?.context.length == 0) {
      setContents(contents.filter((el) => el.idx !== deleteBlock));
    }
  }, [deleteBlock,contents]);

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
                        index={index}
                        content={content}
                        contents={contents}
                        setContents={setContents}
                        setDeleteBlock={setDeleteBlock}
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
export default EditorMainList;
