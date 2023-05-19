import React, { useEffect, useState } from "react";
import DummyAssetData_image from "@/src/components/assetstore/DummyAssetData_Image.json";
import styled from "styled-components";
import AssetCard from "@/src/components/common/AssetCard";
import { useAtom, useAtomValue } from "jotai";
import {
  nowTextBlockAtom,
  totalEventCheckAtom,
  totalEventAtom,
} from "@/src/store/EditorAssetStore";
import { Asset } from "editor";
import { content } from "editor";
import { event } from "editor";
import { eventNames } from "process";
import { ImageAssetAtom } from "@/src/store/EditorAssetStore";

type EditorMainAssetImageListProps = {
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  contents: content[];
};

function EditorMainAssetImageList({
  setContents,
  contents,
}: EditorMainAssetImageListProps) {
  const assetData = useAtomValue(ImageAssetAtom);
  const nowTextBlock = useAtomValue(nowTextBlockAtom);
  const [totalEvent, setTotalEvent] = useAtom(totalEventAtom);
  const [totalEventCheck, setTotalEventCheck] = useAtom(totalEventCheckAtom);

  useEffect(() => {
    // console.log(assetData);
  }, [assetData]);

  useEffect(() => {
    // console.log(contents);
  }, [contents]);

  // 에셋 수정 삭제 기능도 구현해야함!
  const ClickHandler = (asset: Asset) => {
    if (nowTextBlock == 0) {
      if (totalEvent.event.length >= 2) {
      } else {
        if (totalEvent.event.length !== 0) {
          if (totalEvent.event[0].type !== "IMAGE") {
            const queue = {
              assetId: asset.id,
              type: asset.type,
            };
            totalEvent.event.push(queue);
          }
        } else {
          totalEvent.event.push({
            assetId: asset.id,
            type: asset.type,
          });
        }
      }
      setTotalEventCheck(!totalEventCheck);
    } else {
      const newBlocks = [...contents];
      const index = newBlocks.findIndex((el) => el.idx === nowTextBlock);
      if (newBlocks[index].event.length >= 2) {
      } else {
        if (newBlocks[index].event.length !== 0) {
          // 에셋 이벤트가 이미 있는 경우
          if (newBlocks[index].event[0].type == "IMAGE") {
          } else {
            const queue = newBlocks[index].event[0];
            newBlocks[index].event[0] = {
              assetId: asset.id,
              type: asset.type,
            };
            newBlocks[index].event.push(queue);
          }
        } else {
          // 에셋 이벤트가 없는 경우
          newBlocks[index].event.push({
            assetId: asset.id,
            type: asset.type,
          });
        }
      }
      setContents(newBlocks);
    }
  };
  return (
    <>
      {!assetData ? (
        <AssetList>현재 가지고 있는 이미지 에셋이 없습니다.</AssetList>
      ) : (
        <AssetList>
          {assetData.map((asset, index) => (
            <AssetItem key={index} onClick={() => ClickHandler(asset)}>
              <Img src={asset.thumbnail} alt="썸네일" />
            </AssetItem>
          ))}
        </AssetList>
      )}
    </>
  );
}

const AssetList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem;
  padding-top: 2rem;
  overflow: scroll;
  position: relative;
`;
const AssetItem = styled.button`
  color: ${({ theme }) => theme.color.text1};
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Img = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

export default EditorMainAssetImageList;
