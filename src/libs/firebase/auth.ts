import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./init";

export const login = (): void => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => auth.signOut();
