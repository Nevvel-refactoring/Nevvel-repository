import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { useAtomValue } from "jotai";
import {
  nowTextBlockAtom,
  totalEventCheckAtom,
} from "@/src/store/EditorAssetStore";
import { Asset } from "editor";
import { content } from "editor";
import { event } from "editor";
import springApi from "@/src/api/instance";
import { AudioAssetAtom } from "@/src/store/EditorAssetStore";
import { totalEventAtom } from "@/src/store/EditorAssetStore";

type EditorMainAssetAudioListProps = {
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  contents: content[];
};

function EditorMainAssetSoundList({
  setContents,
  contents,
}: EditorMainAssetAudioListProps) {
  const nowTextBlock = useAtomValue(nowTextBlockAtom);
  const assetData = useAtomValue(AudioAssetAtom);
  const [totalEvent, setTotalEvent] = useAtom(totalEventAtom);
  const [totalEventCheck, setTotalEventCheck] = useAtom(totalEventCheckAtom);

  useEffect(() => {
    // console.log(contents);
  }, [contents]);

  const ClickHandler = (asset: Asset) => {
    if (nowTextBlock == "") {
      if (totalEvent.event.length >= 2) {
      } else {
        if (totalEvent.event.length !== 0) {
          if (totalEvent.event[0].type !== "AUDIO") {
            totalEvent.event.push({
              assetId: asset.id,
              type: asset.type,
            });
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
          if (newBlocks[index].event[0].type == "AUDIO") {
          } else {
            newBlocks[index].event.push({
              assetId: asset.id,
              type: asset.type,
            });
          }
        } else {
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
        <AssetList>현재 가지고 있는 오디오 에셋이 없습니다.</AssetList>
      ) : (
        <AssetList>
          {assetData.map((asset, index) => (
            <AssetItem key={index} onClick={() => ClickHandler(asset)}>
              <Img src={asset.thumbnail} alt="썸네일" />
              {asset.title}
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
  overflow: auto;
  position: relative;
`;
const AssetItem = styled.div`
  color: ${({ theme }) => theme.color.text1};
  margin: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 4.5rem;
  height: 5.5rem;
  white-space: nowrap;
  text-align: start;
`;
const Img = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

export default EditorMainAssetSoundList;
