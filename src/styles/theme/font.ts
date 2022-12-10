import { Kosugi_Maru } from "@next/font/google";
import type { DeepPartial, Theme } from "@chakra-ui/react";

const KosugiMaru = Kosugi_Maru({
  weight: "400",
  subsets: ["japanese"],
  display: "swap",
});

export const fonts: DeepPartial<Theme["fonts"]> = {
  heading: `${KosugiMaru.style.fontFamily}, sans-serif`,
  body: `${KosugiMaru.style.fontFamily}, sans-serif`,
};
