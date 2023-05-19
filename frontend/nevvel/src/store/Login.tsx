import { atomWithStorage } from "jotai/utils";

export const loginAtom = atomWithStorage("loginStatus", false);

export const userInfoAtom = atomWithStorage<
  | undefined
  | {
      id: number;
      point: number;
      profileImage: string;
      nickname: string;
      //   description: string;
    }
>("userInfoStatus", undefined);
