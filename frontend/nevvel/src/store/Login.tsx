import { atom } from "jotai";
import { getCookie } from "../util/cookies";

export const loginAtom = atom(!!getCookie("accessToken"));
