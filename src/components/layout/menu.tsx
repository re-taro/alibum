import type { FC, ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { MenuHeader } from "./header/menu";

type MenuLayoutProps = Required<{
  children: ReactNode;
}>;

export const MenuLayout: FC<MenuLayoutProps> = ({ children }) => (
  <Box minH="100vh" bgColor="background.500">
    <MenuHeader />
    <Flex
      as="main"
      flexDir="column"
      alignItems="center"
      pt="28"
      position="static"
    >
      {children}
    </Flex>
  </Box>
);
