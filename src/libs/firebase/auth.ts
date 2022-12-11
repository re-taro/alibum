import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./init";

export const login = (): void => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
  // eslint-disable-next-line no-useless-return
  return;
};

export const logout = (): void => {
  auth.signOut();
  // eslint-disable-next-line no-useless-return
  return;
};
