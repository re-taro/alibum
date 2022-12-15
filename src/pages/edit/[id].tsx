import {
  Box,
  Text,
  Textarea,
  VStack,
  HStack,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useAuthContext } from "../../contexts/auth";
import {
  getCardList,
  createCardListItem,
  CreateStoreCardListItem,
} from "../../libs/firebase/store";
import type { StoreCardList } from "../../libs/firebase/store";
import { EditCard } from "../../components/card/edit";
import { createGetLayout } from "../../components/layout/edit";
import type { EditLayoutProps } from "../../components/layout/edit";
import { IconButton } from "../../components/shared/button/icon-button";
import { Modal } from "../../components/shared/modal";

const headerData: EditLayoutProps = {
  name: "KosenTaro",
  link: "hoge",
};
const Edit: NextPageWithLayout = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const [list, setList] = useState<StoreCardList>([]);
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File>();
  const listid = id;

  const { register, handleSubmit, reset } = useForm<CreateStoreCardListItem>();

  const handleFileClick = () => {
    inputRef.current?.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setFile(fileObject);
    setImage(window.URL.createObjectURL(fileObject));
  };

  const onSubmit: SubmitHandler<CreateStoreCardListItem> = async (result) => {
    if (
      !user ||
      !(typeof id === "string") ||
      !file ||
      !inputRef.current?.value
    ) {
      return;
    }
    const data: CreateStoreCardListItem = {
      text: result.text,
      imageFile: file,
    };
    const item = await createCardListItem(user.uid, id, data);
    setList([...list, item]);
    onClose();
    reset();
  };

  useEffect(() => {
    (async () => {
      if (user) {
        if (typeof listid === "string") {
          const res = await getCardList(user.uid, listid);
          setList(res);
        }
      }
    })();
  }, [user, listid]);
  return (
    <Box w="full" as="section">
      <VStack align="stretch" spacing={7}>
        <Text textAlign="center" fontSize={{ sm: "1rem", lg: "1.25rem" }}>
          Happy Birthday!!!
        </Text>
        <Suspense>
          {list.map((data) => (
            <EditCard
              text={data.text}
              imageRef={data.imageRef}
              key={data.text}
            />
          ))}
        </Suspense>
      </VStack>
      <IconButton
        position="fixed"
        label="plus"
        icon="ic:round-add"
        fontSize="2xl"
        onClick={onOpen}
        zIndex={100}
        right={{ base: "8", lg: "23%" }}
        bottom={{ base: "5", lg: "36" }}
      />
      <Modal
        footer={
          <HStack spacing={4}>
            <IconButton
              label="image"
              icon="material-symbols:broken-image-outline"
              onClick={handleFileClick}
            />
            <IconButton
              label="plus"
              icon="ic:round-add"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            />
            <Input
              {...register("imageFile")}
              type="file"
              accept="image/*"
              isRequired
              ref={inputRef}
              onChange={onFileInputChange}
              hidden
            />
          </HStack>
        }
        isOpen={isOpen}
        onClose={onClose}
      >
        <Textarea
          {...register("text", { required: true })}
          placeholder="//感謝を綴ろう"
          border="none"
          focusBorderColor="white"
          maxLength={120}
          rows={10}
        />

        {!image ? null : (
          <Image width={128} height={128} src={image} alt={image} />
        )}
      </Modal>
    </Box>
  );
};

Edit.getLayout = createGetLayout(headerData);

export default Edit;
