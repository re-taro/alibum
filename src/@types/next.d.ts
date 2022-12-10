import type { NextPage } from "next";
import type { ReactElement } from "react";

declare module "next" {
  type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactElement;
  };
}
