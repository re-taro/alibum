import { ChakraProvider } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import customTheme from "../styles/theme";

type ChakraProps = {
  children: ReactNode;
};

export const Chakra: FC<ChakraProps> = ({ children }) => (
  <ChakraProvider theme={customTheme} resetCSS>
    {children}
  </ChakraProvider>
);
