import type { FC } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Logo } from "../../alibum";
import { logout } from "../../../libs/firebase/auth";

export const MenuHeader: FC = () => {
  const onClick = () => {
    logout();
  };
  return (
    <Flex
      as="header"
      justifyContent="space-around"
      alignItems="center"
      bgColor="white"
      position="fixed"
      top={0}
      w="full"
      py="4"
      zIndex={100}
    >
      <Logo />
      <Button
        colorScheme="extra"
        borderRadius="2xl"
        px="4"
        color="white"
        fontSize="1.25rem"
        onClick={onClick}
      >
        logout
      </Button>
    </Flex>
  );
};
