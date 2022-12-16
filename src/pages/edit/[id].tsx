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
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../libs/firebase/init";
import {
  getCardList,
  createCardListItem,
  getInfo,
} from "../../libs/firebase/store";
import type {
  StoreCardList,
  CreateStoreCardListItem,
  ListInfo,
} from "../../libs/firebase/types";
import { EditCard } from "../../components/card/edit";
import { createGetLayout } from "../../components/layout/edit";
import { IconButton } from "../../components/shared/button/icon-button";
import { Modal } from "../../components/shared/modal";

const Edit: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const [list, setList] = useState<StoreCardList>([]);
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File>();
  const listid = id;

  const [title, setTitle] = useState("");

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
    if (!user || !(typeof id === "string")) {
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
    const authStateChanged = onAuthStateChanged(auth, async (u) => {
      if (u && typeof listid === "string") {
        const res = await getCardList(u.uid, listid);
        const info: ListInfo = await getInfo(u.uid, listid);
        if (typeof info !== "undefined") setTitle(info.title);
        setList(res);
        setUser(u);
      }
    });
    return () => {
      authStateChanged();
    };
  }, [listid]);
  return (
    <Box w="full" as="section">
      <VStack align="stretch" spacing={7}>
        <Text textAlign="center" fontSize={{ sm: "1rem", lg: "1.25rem" }}>
          {title}
        </Text>
        <Suspense>
          {list.map((data) => (
            <EditCard
              text={data.text}
              imageRef={data.imageRef}
              key={data.createdAt.toString()}
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

        {image ? (
          <Image width={128} height={128} src={image} alt={image} />
        ) : null}
      </Modal>
    </Box>
  );
};

Edit.getLayout = createGetLayout();

export default Edit;
