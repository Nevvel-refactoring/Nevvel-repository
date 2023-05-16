import { atom } from "jotai";
import { Asset, AssetContent, AssetUploader } from "editor";

export const assetOpenAtom = atom(0);

export const nowTextBlockAtom = atom(0);

export const ImageAssetAtom = atom<Asset[]>([]);

export const AudioAssetAtom = atom<Asset[]>([])

export const putEditorAtom = atom<boolean>(false)