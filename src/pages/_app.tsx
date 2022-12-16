import { DefaultSeo } from "next-seo";
import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Chakra } from "../components/chakra";
import { auth } from "../libs/firebase/init";
import defaultSEOConfig from "../../next-seo.config";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);
  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      if (
        !user &&
        router.asPath.match(
          /\/((?!api|_next\/static|favicon.ico|share|login).*)/,
        )
      ) {
        await router.push("/login");
      }
    });
    return () => {
      authStateChanged();
    };
  }, [router]);
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
