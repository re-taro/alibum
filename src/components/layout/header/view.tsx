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
    w="full"
    py={1}
  >
    <Text fontSize="md">{date}</Text>
    <Text fontSize="2xl" borderBottom="1px" borderColor="primary.500">
      {name}
    </Text>
    <Text fontSize="md">{title}</Text>
  </Flex>
);
