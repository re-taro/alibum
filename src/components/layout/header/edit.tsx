import {
  Flex,
  Text,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useClipboard,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";
import { useRouter } from "next/router";
import { IconButton } from "../../shared/button/icon-button";

type EditHeaderProps = {
  name: string;
  link: string;
};

export const EditHeader: FC<EditHeaderProps> = ({ name, link }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, value, hasCopied } = useClipboard(link);

  const handler = async (path: string): Promise<void> => {
    await router.push(path);
  };

  return (
    <Flex
      as="header"
      justifyContent="space-around"
      alignItems="center"
      bgColor="white"
      position="fixed"
      top={0}
      w="full"
      py="4"
    >
      <IconButton label="link" size="md" icon="material-symbols:arrow-back" />
      <Text
        fontSize="2xl"
        maxWidth="60vw"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        _before={{ content: `"To "` }}
      >
        {name}
      </Text>
      <IconButton
        label="link"
        size="md"
        icon="mdi:link-variant"
        onClick={onOpen}
      />
      <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx="4" w="full">
          <ModalHeader p="0">
            <IconButton
              label="Close"
              icon="material-symbols:arrow-back-rounded"
              onClick={onClose}
              ml="6"
              mt="2"
            />
          </ModalHeader>
          <ModalBody>
            <Input rounded="md" bgColor="gray.500" value={value} />
          </ModalBody>
          <ModalFooter justifyContent="space-around">
            <Button
              colorScheme="extra"
              borderRadius="2xl"
              px="4"
              color="white"
              fontSize={{ md: "1rem", lg: "1.25rem" }}
              onClick={onCopy}
            >
              {hasCopied ? "コピーしました！" : " コピー"}
            </Button>
            <Button
              colorScheme="extra"
              borderRadius="2xl"
              px="4"
              color="white"
              fontSize={{ md: "1rem", lg: "1.25rem" }}
              onClick={() => handler(value)}
            >
              閲覧
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </Flex>
  );
};
