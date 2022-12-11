import type { FC } from "react";
import { AspectRatio, Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
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
      height="auto"
      maxWidth="30rem"
      backgroundColor="white"
    >
      <CardBody position="relative">
        <Flex flexDir="column" alignItems="center" textAlign="center" gap={4}>
          <Text fontSize={{ base: "1rem", lg: "1.5rem" }}>{text}</Text>
          <Box w="full">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={imageref}
                alt="Present for you"
                fill
                style={{ objectFit: "contain" }}
              />
            </AspectRatio>
          </Box>
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
