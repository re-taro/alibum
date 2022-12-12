import type { FC } from "react";
import { Card, CardBody, VStack, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

type CardProps = {
  date: string;
  id: string;
  name: string;
};

export const MenuCard: FC<CardProps> = ({ date, id, name }) => (
  <Link href={`/edit/${id}`} passHref legacyBehavior>
    <Card as="a" shadow="md" rounded="md" backgroundColor="white">
      <CardBody>
        <VStack spacing={0} align="center">
          <Heading
            as="h2"
            fontSize="xl"
            maxW="calc(100% - 2.5rem)"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            color="black"
          >
            {name}
          </Heading>
          <Text fontSize="xl" color="black">
            {date}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  </Link>
);
