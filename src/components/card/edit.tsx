import type { FC } from "react";
import { AspectRatio, Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import type { CardProps } from "./type";

export const EditCard: FC<CardProps> = ({ text, imageref }) => (
  <Card
    shadow="md"
    rounded="md"
    width="full"
    height="auto"
    maxWidth="30rem"
    backgroundColor="white"
  >
    <CardBody position="relative">
      <Flex flexDir="column" alignItems="center" textAlign="center" gap={4}>
        <Text fontSize={{ base: "1rem", lg: "1.5rem" }}>{text}</Text>
        {imageref ? (
          <Box w="full">
            <AspectRatio
              ratio={16 / 9}
              visibility={{ visibility: imageref ? "visible" : "hidden" }}
            >
              <Image
                src={imageref}
                alt="Present for you"
                fill
                style={{ objectFit: "contain" }}
              />
            </AspectRatio>{" "}
          </Box>
        ) : null}
      </Flex>
    </CardBody>
  </Card>
);
