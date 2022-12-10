import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  primary: {
    500: "#F5B5A7",
  },
  secondary: {
    50: "#FFF3D5",
    500: "#FFC672",
  },
  extra: {
    500: "#8AC8CF",
  },
  background: {
    500: "#FEEEDC",
  },
  "modal-back": {
    500: "rgba(88, 87, 87, 0.2)",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {
  gray: {
    500: "#E4E4E4",
  },
};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
