import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const user = signInWithPopup(auth, provider).then((result) => result.user);

  return user;
};
