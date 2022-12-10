import type { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

type ViewHeaderProps = {
  date: string;
  name: string;
  title: string;
};

export const ViewHeader: FC<ViewHeaderProps> = ({ date, name, title }) => (
  <Flex
    as="header"
    alignItems="center"
    bgColor="white"
    flexDir="column"
    top={0}
    position="fixed"
    w="full"
    py={1}
  >
    <Text fontSize="md">{date}</Text>
    <Text
      fontSize="2xl"
      borderBottom="1px"
      borderColor="primary.500"
      maxWidth="90vw"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
    >
      {name}
    </Text>
    <Text
      fontSize="md"
      maxWidth="90vw"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
    >
      {title}
    </Text>
  </Flex>
);
