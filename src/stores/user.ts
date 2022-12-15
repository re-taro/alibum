import { atom } from "nanostores";
import type { User } from "firebase/auth";

type UserType = User | null;

export const userStore = atom<UserType>(null);
