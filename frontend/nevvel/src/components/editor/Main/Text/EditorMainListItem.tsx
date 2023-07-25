import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BiImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { AiOutlineSound } from "react-icons/ai";
import EditorMainMenu from "./EditorMainMenu";
import { bigMobile, mobile } from "@/src/util/Mixin";
import { content } from "editor";
import { atom, useAtom, useAtomValue } from "jotai";
import { assetOpenAtom, nowTextBlockAtom } from "@/src/store/EditorAssetStore";
import { ImageAssetAtom } from "@/src/store/EditorAssetStore";
import { AudioAssetAtom } from "@/src/store/EditorAssetStore";
import { useRouter } from "next/router";
import EditorMainListItemText from "./EditorMainListItemText";

type EditorMainListItemProps = {
  content: content;
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  deleted: boolean;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditorMainListItem({
  content,
  contents,
  setContents,
  deleted,
  setDeleted,
}: EditorMainListItemProps) {
  const [plus, setPlus] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [menuBlock, setMenuBlock] = useState(false);
  const [assetOpen, setAssetOpen] = useAtom(assetOpenAtom);
  const [nowTextBlock, setNowTextBlock] = useAtom(nowTextBlockAtom);
  const [isDragging, setIsDragging] = useState(false);
  const [blockText, setBlockText] = useState("");
  const [TextId, setTextId] = useState("");
  const [nowContent, setNowContent] =useState<content>(content);
  const [enterClick, setEnterClick] =useState(false)

  const idx = content.idx;
  const IMAGE = useAtomValue(ImageAssetAtom);
  const AUDIO = useAtomValue(AudioAssetAtom);
  const router = useRouter();
  const eid = router.query.eid;


  useEffect(()=>{
    console.log(contents);
  },[contents])

  useEffect(()=>{
    const newContents:content[] = [];
    const nowIdx = contents.findIndex((el)=>el.idx === idx);
    contents.map((content,index)=>{
      if(index === nowIdx){
        newContents.push(nowContent)
      }else {
        newContents.push(content)
      }
    })
    setContents(newContents)
    if(enterClick){
      const newBlock: content = {
        idx: Math.random().toString(),
        context: [
          {
            id:"a",
            tag: "p",
            text: "",
          },
        ],
        event:[],
      };
      setContents([...contents, newBlock]);
      setEnterClick(false)
    }
  },[nowContent,enterClick])

  useEffect(() => {
    // `nowContent`의 복사본을 만들어서 업데이트합니다.
    if(nowContent){
      setNowContent((prevContent) => ({
        ...prevContent,
        context: prevContent.context.map((el) =>
          el.id === TextId ? { ...el, text: blockText } : el
        ),
      }));
    }
  }, [blockText, TextId]);

  // block삭제
  const RemoveHandler = (content: content) => {
    setContents(contents.filter((el) => el.idx !== idx));
    setDeleted(true);
  };

  const AssetHandler = (e: number) => {
    if (e === 1) {
      setAssetOpen(1);
      setNowTextBlock(content.idx);
    } else {
      setAssetOpen(2);
      setNowTextBlock(content.idx);
    }
  };

  const ImageEvent = content.event.map((asset, index) => {
    if (content.event.length == 1 && index == 0 && asset.type === "IMAGE") {
      const assetImageFindIndex = IMAGE.findIndex(
        (el) => el.id == asset.assetId
      );
      return (
        <AssetContainer key={index}>
          <Img src={IMAGE[assetImageFindIndex]?.thumbnail} alt="썸네일" />
          <AssetButton onClick={() => AssetHandler(2)}>
            <AiOutlineSound className="sound" size="24" />
          </AssetButton>
        </AssetContainer>
      );
    } else if (
      content.event.length == 1 &&
      index == 0 &&
      asset.type === "AUDIO"
    ) {
      const assetAudioFindIndex = AUDIO.findIndex(
        (el) => el.id == asset.assetId
      );
      return (
        <AssetContainer key={index}>
          <AssetButton onClick={() => AssetHandler(1)}>
            <BiImageAdd className="image" size="24" />
          </AssetButton>
          <Img src={AUDIO[assetAudioFindIndex]?.thumbnail} alt="썸네일" />
        </AssetContainer>
      );
    } else {
      const assetImageFindIndex = IMAGE.findIndex(
        (el) => el.id == asset.assetId
      );
      const assetAudioFindIndex = AUDIO.findIndex(
        (el) => el.id == asset.assetId
      );
      return (
        <div key={index}>
          {asset.type === "IMAGE" && (
            <Img
              className="check"
              src={IMAGE[assetImageFindIndex]?.thumbnail}
              alt="썸네일"
            />
          )}
          {asset.type === "AUDIO" && (
            <Img
              className="check"
              src={AUDIO[assetAudioFindIndex]?.thumbnail}
              alt="썸네일"
            />
          )}
        </div>
      );
    }
  });

  return (
    <BlockContainer>
      {plus ? (
        <>
          <AssetButtonContainer>
            {content.event.length == 0 ? (
              <>
                <AssetButton onClick={() => AssetHandler(1)}>
                  <BiImageAdd className="image" size="24" />
                </AssetButton>
                <AssetButton onClick={() => AssetHandler(2)}>
                  <AiOutlineSound className="sound" size="24" />
                </AssetButton>
                <PlusButton onClick={() => setPlus(!plus)}>-</PlusButton>
              </>
            ) : (
              <>{eid ? null : ImageEvent}</>
            )}
          </AssetButtonContainer>
        </>
      ) : (
        <>
          <AssetButtonContainer>
            <Space>&nbsp;</Space>
            <Space>&nbsp;</Space>
            <PlusButton onClick={() => setPlus(!plus)}>+</PlusButton>
          </AssetButtonContainer>
        </>
      )}
      <TextBlock>
        {content.context.map((context, index) => (
          <EditorMainListItemText
            key={index}
            id={context.id}
            text={context.text}
            setContents={setContents}
            contents={contents}
            setEnterClick={setEnterClick}
            context={context}
            setTextId={setTextId}
            blockText={blockText}
            setBlockText={setBlockText}
          />
        ))}
      </TextBlock>
      <RemoveButton onClick={() => RemoveHandler(content)}>
        <TiDelete size="24" />
      </RemoveButton>
    </BlockContainer>
  );
}

const BlockContainer = styled.div`
  color: ${({ theme }) => theme.color.text1};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  ${bigMobile} {
    flex-direction: column;
  }
`;
const AssetButtonContainer = styled.div`
  width: 10rem;
  display: inline-flex;
  text-align: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  justify-content: center;
  ${bigMobile} {
    display: flex;
  }
`;

const AssetContainer = styled.div`
  display: inline-flex;
  text-align: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  justify-content: center;
`;

const AssetButton = styled.button`
  width: 3.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 0.3rem;
  border: 2px solid ${({ theme }) => theme.color.hover};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.hover};
  :hover {
    color: ${({ theme }) => theme.color.point};
    border: 2px solid ${({ theme }) => theme.color.point};
  }
`;
const Space = styled.div`
  width: 3.5rem;
  height: 2.5rem;
`;

const PlusButton = styled.button`
  width: 2rem;
  color: ${({ theme }) => theme.color.point};
  font-size: 2rem;
  margin-left: 1rem;
  display: flex;
  text-align: center;
  align-items: center;
`;

const TextBlock = styled.div`
  width: 85%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.editor};
  padding: 1rem;
  height: auto;

  display: flex;
  align-items: center;
  white-space: normal;
`;

const RemoveButton = styled.button`
  display: flex;
  width: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.color.hover};
  :hover {
    ${({ theme }) => theme.color.point};
  }
`;

const Img = styled.img`
  width: 3.5rem;
  height: 2.5rem;
  &.check {
    margin-left: 0.3rem;
  }
`;

export default EditorMainListItem;
