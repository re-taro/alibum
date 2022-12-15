import {
  Box,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  AspectRatio,
  Flex,
  ModalCloseButton,
} from "@chakra-ui/react";
import type { FC } from "react";
import type { ModalProps } from "@chakra-ui/react";
import Image from "next/image";

export type ViewModalProps = {
  text: string;
  imageRef?: string;
  index: number;
} & Pick<ModalProps, "isOpen" | "onClose">;

export const ViewModal: FC<ViewModalProps> = ({
  isOpen,
  onClose,
  text,
  imageRef,
  index,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent
      mx="4"
      w="full"
      p={0}
      bg={
        // eslint-disable-next-line no-nested-ternary
        imageRef
          ? "extra.500"
          : index % 2 === 0
          ? "secondary.50"
          : "primary.500"
      }
    >
      <ModalHeader>
        <ModalCloseButton />
      </ModalHeader>
      <ModalBody>
        <Flex
          height="full"
          justifyContent="space-around"
          alignItems="center"
          flexDir="column"
          gap={10}
          minH="50vh"
        >
          <Text
            wordBreak="break-word"
            textAlign="center"
            color={imageRef ? "white" : "black"}
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
      </ModalBody>
    </ModalContent>
  </Modal>
);
