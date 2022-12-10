import { ChakraProvider } from "@chakra-ui/react";
import type { FC } from "react";
import customTheme from "../styles/theme";

type ChakraProps = {
  children: React.ReactNode;
};

export const Chakra: FC<ChakraProps> = ({ children }) => (
  <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
);
