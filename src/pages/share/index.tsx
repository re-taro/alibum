import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import type { GetServerSideProps, NextPageWithLayout } from "next";
import type { StoreCardList } from "libs/firebase/types";
import { useEffect, useState } from "react";
import { getCardList } from "libs/firebase/store";
import { ViewImageCard, ViewTextCard } from "components/card/view";
import { ViewModal } from "components/view-modal";
import { createGetLayout } from "../../components/layout/view";
import type { ViewLayoutProps } from "../../components/layout/view";

const data: ViewLayoutProps = {
  title: "This is Test!!!!!!!",
  name: "kosen Taro",
  date: "4/25",
};

type ViewPageProps = {
  uuid: string;
  listid: string;
  getList: StoreCardList;
};

export const getServerSideProps: GetServerSideProps<ViewPageProps> = async (
  context,
) => {
  const { to, from } = context.query;
  const cardlist = await getCardList(from as string, to as string);
  return {
    props: JSON.parse(
      JSON.stringify({
        uuid: from as string,
        listid: to as string,
        getList: cardlist,
      }),
    ),
  };
};

// eslint-disable-next-line react/prop-types
const View: NextPageWithLayout<ViewPageProps> = ({ uuid, listid, getList }) => {
  const [cardList, setCardList] = useState<StoreCardList>(getList);
  const [listIndex, setListIndex] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      const list: StoreCardList = await getCardList(uuid, listid);
      setCardList(list);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box minH="100vh" w="full" mx="4">
        <Flex w="full" justify="center" wrap="wrap" gap={2} mt="4">
          {cardList.flatMap((index, key) =>
            index.imageRef ? (
              <ViewImageCard
                text={index.text}
                imageRef={index.imageRef}
                key={key}
                onClick={() => {
                  setListIndex(key);
                  onOpen();
                }}
              />
            ) : (
              <ViewTextCard
                text={index.text}
                key={key}
                onClick={() => {
                  setListIndex(key);
                  onOpen();
                }}
              />
            ),
          )}
        </Flex>
      </Box>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        text={cardList[listIndex].text}
        imageRef={cardList[listIndex].imageRef}
        index={listIndex}
      />
    </>
  );
};

View.getLayout = createGetLayout(data);

export default View;
