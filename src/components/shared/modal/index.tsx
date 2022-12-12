import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/react";
import React from "react";
import type { ReactNode, FC } from "react";
import { IconButton } from "../button/icon-button";

export type InputModalProps = {
  children: ReactNode;
  footer: ReactNode;
} & Pick<ModalProps, "isOpen" | "onClose">;

// eslint-disable-next-line react/display-name
export const Modal: FC<InputModalProps> = ({
  children,
  footer,
  isOpen,
  onClose,
}) => (
  <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent mx="4" w="full">
      <ModalHeader p="0">
        <IconButton
          label="Close"
          icon="material-symbols:arrow-back-rounded"
          onClick={onClose}
          ml="4"
          mt="1"
        />
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter p={0} bgColor="secondary.50" borderBottomRadius="0.375rem">
        <Box py={1} px={4}>
          {footer}
        </Box>
      </ModalFooter>
    </ModalContent>
  </ChakraModal>
);
