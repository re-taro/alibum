import type { NextPageWithLayout } from "next";
import type { AppProps } from "next/app";

declare module "next/app" {
  type AppPropsWithLayout<P = object> = AppProps<P> & {
    Component: NextPageWithLayout<P>;
  };
}
