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
import { useAtom } from "jotai";
import { content, episode } from "editor";
import { useRouter } from "next/router";

type EditorMainListProps = {
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
};

function EditorMainList({
  contents,
  setContents,
}: EditorMainListProps) {
  const scrollRef = useRef<any>();
  const router = useRouter();
  const eid = router.query.eid;

  return (
    <MainWrapper>
      <MainContainer ref={scrollRef}>
        <ListWrapper>
          {contents.map((content, index) => (
            <div>
              <EditorMainListItem
                key={content.idx}
                content={content}
                contents={contents}
                setContents={setContents}
              />
            </div>
          ))}
        </ListWrapper>
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
