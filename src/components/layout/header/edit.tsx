import { IconButton, Flex, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import type { FC } from "react";

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
    <IconButton
      colorScheme="secondary"
      color="white"
      aria-label="arrow"
      isRound
      size="md"
      icon={<Icon icon="material-symbols:arrow-back" />}
    />
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
    <IconButton
      colorScheme="secondary"
      color="white"
      aria-label="arrow"
      size="md"
      isRound
      icon={<Icon icon="mdi:link-variant" />}
    />
  </Flex>
);
