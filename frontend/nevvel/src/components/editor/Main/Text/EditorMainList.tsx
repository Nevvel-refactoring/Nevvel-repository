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
import { content, episode } from "editor";
import EditorMainInput from "./EditorMainInput";
import { useRouter } from "next/router";

type EditorMainListProps = {
  episode: episode;
  setEpisode: React.Dispatch<React.SetStateAction<episode>>;
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
  setEpisode,
}: EditorMainListProps) {
  const scrollRef = useRef<any>();
  // useEffect(() => {
  //   console.log(scrollRef.current?.scrollHeight)
  //   scrollRef.current.scrollTop = (scrollRef.current?.scrollHeight + 64);
  // }, [currentText,contents]);
  const router = useRouter();
  const eid = router.query.eid;
  const [deleted, setDeleted] = useState(false);
  const [reLocation, setRelocation] = useState<content[]>([]);

  useEffect(() => {
    // console.log("mainlist", eid);
  }, []);

  // useEffect(() => {
  //   if (deleted) {
  //     relocationHandler();
  //   }
  //   return () => {
  //     setDeleted(false);
  //     setRelocation([]);
  //     setEpisode({ ...episode, contents: reLocation });
  //   };
  // }, [deleted]);

  useEffect(()=>{
    // console.log(deleted,"deleted")
  },[])

  // useEffect(() => {
  //   if (!deleted) {
  //     relocationHandler();
  //   }
  //   return(()=>{
  //     if (!deleted) {
  //     setRelocation([]);
  //     }
  //   })
  // }, [contents]);
  // const relocationHandler = () => {
  //   if (contents[contents.length - 1]?.idx != contents.length) {
  //     // console.log("여기 안들어온건가");
  //     contents.map((content, index) => {
  //       reLocation.push({
  //         idx: index + 1,
  //         context: content.context,
  //         event: content.event,
  //       });
  //     });
  //     setEpisode({ ...episode, contents: reLocation });
  //   }
  // };
  useEffect(()=>{
    console.log(episode)
  },[episode])


  return (
    <MainWrapper>
      <MainContainer ref={scrollRef}>
        <ListWrapper>
          {episode.contents.map((content, index) => (
            <EditorMainListItem
              key={content.idx}
              content={content}
              contents={contents}
              setContents={setContents}
              deleted={deleted}
              setDeleted={setDeleted}
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
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
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
