import type { FC } from "react";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

type EditCardProps = {
  text: string;
  imageref: string;
};

export const EditCard: FC<EditCardProps> = ({ text, imageref }) =>
  imageref ? (
    <Card
      shadow="md"
      rounded="md"
      width="70vw"
      maxWidth="30rem"
      backgroundColor="white"
    >
      <CardBody position="relative">
        <Flex flexDir="column" alignItems="center" textAlign="center">
          <Text fontSize={{ base: "1rem", lg: "1.5rem" }}>{text}</Text>
          <Image
            src={imageref}
            alt="Present for you"
            width={128}
            height={128}
          />
        </Flex>
      </CardBody>
    </Card>
  ) : (
    <Card
      shadow="md"
      rounded="md"
      width="70vw"
      maxWidth="30rem"
      backgroundColor="white"
      padding={4}
      textAlign="center"
    >
      <Text fontSize={["1rem", "1rem", "1.25rem", "1.5rem"]}>{text}</Text>
    </Card>
  );
