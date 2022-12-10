import type { FC } from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";

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
    <Heading as="h1" fontSize="2rem" color="primary.500">
      Alibum
    </Heading>
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
