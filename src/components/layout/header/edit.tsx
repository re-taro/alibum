import { Flex, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { IconButton } from "../../shared/button/icon-button";

type EditHeaderProps = {
  name: string;
};

// TODO: Add a button logics
export const EditHeader: FC<EditHeaderProps> = ({ name }) => (
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
    <IconButton label="arrow" size="md" icon="material-symbols:arrow-back" />
    <Text
      fontSize="2xl"
      maxWidth="60vw"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      _before={{ content: `"To "` }}
    >
      {name}
    </Text>
    <IconButton label="link" size="md" icon="mdi:link-variant" />
  </Flex>
);
