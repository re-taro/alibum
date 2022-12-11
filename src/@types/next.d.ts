import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

declare module "next" {
  type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}
