import { DefaultSeo } from "next-seo";
import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import { Chakra } from "../components/chakra";
import defaultSEOConfig from "../../next-seo.config";
import { AuthProvider } from "../contexts/auth";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
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
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </Chakra>
  );
};

export default App;
