import { DefaultSeo } from "next-seo";
import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useStore } from "@nanostores/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Chakra } from "../components/chakra";
import defaultSEOConfig from "../../next-seo.config";
import "../styles/globals.css";
import { userStore } from "../stores/user";
import { auth } from "../libs/firebase/init";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const user = useStore(userStore);
  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (u) => {
      userStore.set(u);
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
  }, [router, user]);
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Chakra>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      {getLayout(<Component {...pageProps} />)}
    </Chakra>
  );
};

export default App;
