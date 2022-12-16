import { Box, Flex } from "@chakra-ui/react";
import type { GetServerSideProps, NextPageWithLayout } from "next";
import type { StoreCardList } from "libs/firebase/types";
import { useEffect, useState } from "react";
import { getCardList } from "libs/firebase/store";
import { ViewImageCard, ViewTextCard } from "components/card/view";
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
};

export const getServerSideProps: GetServerSideProps<ViewPageProps> = async (
  context,
) => {
  const { uuid, listid } = context.query;
  return {
    props: {
      uuid: uuid as string,
      listid: listid as string,
    },
  };
};

// eslint-disable-next-line react/prop-types
const View: NextPageWithLayout<ViewPageProps> = ({ uuid, listid }) => {
  const [cardList, setCardList] = useState<StoreCardList>([]);

  useEffect(() => {
    (async () => {
      const list: StoreCardList = await getCardList(uuid, listid);
      setCardList(list);
    })();
  }, [listid, uuid]);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex>
        {cardList.flatMap((index) =>
          index.imageRef ? (
            <ViewImageCard
              text={index.text}
              imageRef={index.imageRef}
              key={index.createdAt as unknown as string}
              onClick={() => {}}
            />
          ) : (
            <ViewTextCard
              text={index.text}
              key={index.createdAt as unknown as string}
              onClick={() => {}}
            />
          ),
        )}
      </Flex>
    </Box>
  );
};

View.getLayout = createGetLayout(data);

export default View;
