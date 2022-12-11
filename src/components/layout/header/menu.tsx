import type { FC } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Logo } from "../../alibum";

// TODO: Add a logout button logic
export const MenuHeader: FC = () => (
  <Flex
    as="header"
    justifyContent="space-around"
    alignItems="center"
    bgColor="white"
    position="fixed"
    top={0}
    w="full"
    py="4"
  >
    <Logo />
    <Button
      colorScheme="extra"
      borderRadius="2xl"
      px="4"
      color="white"
      fontSize="1.25rem"
      onClick={() => {}}
    >
      logout
    </Button>
  </Flex>
);
