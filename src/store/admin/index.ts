import { atom } from "recoil";

export const isAdmin = atom({
  key: "isAdmin",
  default: false,
});
export const isSubAdmin = atom({
  key: "isSubAdmin",
  default: false,
});
