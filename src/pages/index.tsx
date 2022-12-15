import type { NextPageWithLayout } from "next";
import { VStack, Box, useDisclosure } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { MenuCard } from "../components/card/menu";
import { MenuLayout } from "../components/layout/menu";
import { IconButton } from "../components/shared/button/icon-button";
import { Modal } from "../components/shared/modal";
import { MenuForm } from "../components/form/menu";
import type {
  CreateStoreMenuListItem,
  StoreMenuList,
} from "../libs/firebase/types";
import { createMenuListItem } from "../libs/firebase/store";
import { userStore } from "../stores/user";

const Menu: NextPageWithLayout = () => {
  const [list, setList] = useState<StoreMenuList>([]);
  const user = useStore(userStore);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<CreateStoreMenuListItem>({
    defaultValues: {
      name: "",
      date: "",
      title: "",
    },
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<CreateStoreMenuListItem> = async (result) => {
    if (!user) {
      return;
    }
    const item = await createMenuListItem(user.uid, result);
    setList([...list, item]);
    onClose();
    reset();
  };
  return (
    <>
      <Box as="section" w="full">
        <VStack align="stretch" spacing="7">
          <Suspense>
            {list.map((data) => (
              <MenuCard
                date={data.date}
                id={data.id}
                name={data.name}
                key={data.id}
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
      </Box>
      <Modal
        footer={
          <IconButton
            label="send"
            icon="material-symbols:send"
            type="submit"
            form="menu"
          />
        }
        isOpen={isOpen}
        onClose={onClose}
      >
        <MenuForm register={register} handleSubmit={handleSubmit(onSubmit)} />
      </Modal>
    </>
  );
};

Menu.getLayout = (page) => <MenuLayout>{page}</MenuLayout>;

export default Menu;
