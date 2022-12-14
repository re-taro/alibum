import type { FC } from "react";
import { AspectRatio, Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import type { CardProps } from "./types";

export const EditCard: FC<CardProps> = ({ text, imageRef }) => (
  <Card
    shadow="md"
    rounded="md"
    width="full"
    height="auto"
    backgroundColor="white"
  >
    <CardBody position="relative">
      <Flex flexDir="column" alignItems="center" textAlign="center" gap={4}>
        <Text
          fontSize={{ base: "1rem", lg: "1.5rem" }}
          maxW="calc(100% - 2.5rem)"
        >
          {text}
        </Text>
        {imageRef ? (
          <Box w="full">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={imageRef}
                alt="Present for you"
                fill
                style={{ objectFit: "contain" }}
              />
            </AspectRatio>
          </Box>
        ) : null}
      </Flex>
    </CardBody>
  </Card>
);
