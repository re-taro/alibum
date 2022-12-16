import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageWithLayout,
} from "next";
import type { ListInfo, StoreCardList } from "libs/firebase/types";
import { useEffect, useState } from "react";
import { ShareImageCard, ShareTextCard } from "components/card/share";
import { ShareModal } from "components/share-modal";
import { NextSeo } from "next-seo";
import { getCardList, getInfo } from "../../libs/firebase/store";
import { createGetLayout } from "../../components/layout/share";

type SharePageProps = {
  uuid: string;
  listid: string;
  name: string;
  getList: StoreCardList;
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps: GetServerSideProps<SharePageProps> = async (
  context,
) => {
  const { to, from } = context.query;
  const cardlist = await getCardList(from as string, to as string);
  const res: ListInfo = await getInfo(from as string, to as string);
  return {
    props: JSON.parse(
      JSON.stringify({
        uuid: from as string,
        listid: to as string,
        name: res.name,
        getList: cardlist,
      }),
    ),
  };
};

const Share: NextPageWithLayout<Props> = ({ uuid, listid, getList, name }) => {
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
      <NextSeo
        title={name}
        description={`${name}への感謝のメッセージ`}
        openGraph={{
          url: `https://alibum.re-taro.dev/share?from=${uuid}&to=${listid}`,
          title: `Alibum for ${name}`,
          description: `${name}へのメッセージ`,
          images: [
            {
              url: `https://alibum.re-taro.dev/api/og?name=${name}`,
              alt: "alibum",
            },
          ],
        }}
      />
      <Flex as="section" w="full" justify="center" wrap="wrap" gap={2}>
        {cardList.flatMap((index, key) =>
          index.imageRef ? (
            <ShareImageCard
              text={index.text}
              imageRef={index.imageRef}
              key={key}
              onClick={() => {
                setListIndex(key);
                onOpen();
              }}
            />
          ) : (
            <ShareTextCard
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
      <ShareModal
        isOpen={isOpen}
        onClose={onClose}
        text={cardList[listIndex].text}
        imageRef={cardList[listIndex].imageRef}
        index={listIndex}
      />
    </>
  );
};

Share.getLayout = createGetLayout();

export default Share;
