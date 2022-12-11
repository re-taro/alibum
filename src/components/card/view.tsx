import type { FC } from "react";
import { AspectRatio, Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import type { CardProps } from "./types";

export type ViewCardProps = CardProps & { onClick: () => void };

export const ViewImageCard: FC<Required<ViewCardProps>> = ({
  text,
  imageRef,
  onClick,
}) => (
  <Card
    shadow="md"
    rounded="md"
    height="auto"
    minH={93}
    minW={{ base: "35%", md: "20%" }}
    backgroundColor="extra.500"
  >
    <CardBody position="relative" px={0} as="button" onClick={onClick}>
      <Flex flexDir="column" alignItems="center" textAlign="center" gap={4}>
        <Text color="white" fontSize={{ base: "0.75rem", md: "1rem" }}>
          {text}
        </Text>
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
      </Flex>
    </CardBody>
  </Card>
);

export const ViewTextCard: FC<Omit<ViewCardProps, "imageRef">> = ({
  text,
  onClick,
}) => (
  <Card
    shadow="md"
    rounded="md"
    backgroundColor="white"
    minH={93}
    w={{ base: "40%", md: "20%" }}
    _odd={{ bg: "secondary.500" }}
    _even={{ bg: "primary.500" }}
  >
    <CardBody
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      as="button"
      onClick={onClick}
    >
      {/* Flex使うと親でFlexのalignItemを使った場合に中央寄せにならない */}
      <Text textAlign="center" fontSize={{ base: "0.75rem", md: "1rem" }}>
        {text}
      </Text>
    </CardBody>
  </Card>
);
