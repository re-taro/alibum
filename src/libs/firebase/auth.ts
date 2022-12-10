import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "./init";

export const login = (): Promise<User> => {
  const provider = new GoogleAuthProvider();

  const user = signInWithPopup(auth, provider).then((result) => result.user);
  return user;
};

export const logout = (): Promise<void> => auth.signOut();
