import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import EditorMainListItem from "./EditorMainListItem";
import EditorMainAssetContainer from "../Asset/EditorMainAssetContainer";
import { content,episode } from "editor";
import EditorMainInput from "./EditorMainInput";

type EditorMainListProps = {
  episode:episode;
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  currentText: string;
  setCurrentText: Dispatch<SetStateAction<string>>;
};

function EditorMainList({
  episode,
  contents,
  setContents,
  currentText,
  setCurrentText,
}: EditorMainListProps) {
  const scrollRef = useRef<any>();
  // useEffect(() => {
  //   console.log(scrollRef.current?.scrollHeight)
  //   scrollRef.current.scrollTop = (scrollRef.current?.scrollHeight + 64);
  // }, [currentText,contents]);

  return (
    <MainWrapper>
      <MainContainer ref={scrollRef}>
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
        <ContentWrapper>
          <InputWrapper>
            <EditorMainInput
            episode={episode}
              currentText={currentText}
              setCurrentText={setCurrentText}
              contents={contents}
              setContents={setContents}
            />
          </InputWrapper>
        </ContentWrapper>
      </MainContainer>
    </MainWrapper>
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
  flex: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 0.5rem;
  /* padding: 0.5rem; */
  /* background-color: ${({ theme }) => theme.color.secondary}; */
  /* border-radius: 5px; */
  /* box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1); */
`;

const AssetWrapper = styled.div``;

const ItemContainer = styled.div``;
export default EditorMainList;