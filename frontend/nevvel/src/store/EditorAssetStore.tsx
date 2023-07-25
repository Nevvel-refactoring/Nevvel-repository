import { atom } from "jotai";
import { Asset, AssetContent, AssetUploader,content,context } from "editor";

export const assetOpenAtom = atom(0);

export const nowTextBlockAtom = atom("");

export const ImageAssetAtom = atom<Asset[]>([]);

export const AudioAssetAtom = atom<Asset[]>([])

export const putEditorAtom = atom<boolean>(false)

export const totalEventAtom =atom<content>(
    {
        idx:"total-asset",
        context:[],
        event:[]
    }
)

export const totalEventCheckAtom = atom<boolean>(false);