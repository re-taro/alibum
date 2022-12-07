import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Chakra } from "../components/chakra";
import defaultSEOConfig from "../../next-seo.config";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Chakra>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
    </Head>
    <DefaultSeo {...defaultSEOConfig} />
    <Component {...pageProps} />
  </Chakra>
);

export default App;
