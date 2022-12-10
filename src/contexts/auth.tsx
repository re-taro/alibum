import { createContext, useState, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../libs/firebase/init";

type UserType = User | null;

type AuthContextProps = {
  user: UserType;
};

type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>(null);

  const value = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (
        !u &&
        router.asPath.match(
          /\/((?!api|_next\/static|favicon.ico|view|login).*)/,
        )
      ) {
        await router.push("/login");
      }
    });
    return () => {
      authStateChanged();
    };
  }, [router]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
