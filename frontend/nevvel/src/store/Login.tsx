import { atomWithStorage } from "jotai/utils";

export const loginAtom = atomWithStorage("loginStatus", false);

export const isUserAtom = atomWithStorage("isUserStatus", false);
