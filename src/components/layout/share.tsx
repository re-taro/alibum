import { FC, ReactNode, ReactElement, useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ShareHeader } from "./header/share";
import { ListInfo } from "../../libs/firebase/types";
import { getInfo } from "../../libs/firebase/store";

interface ShareLayoutInterface {
  children: ReactNode;
}

const ShareLayout: FC<ShareLayoutInterface> = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (!router.isReady) {
        return;
      }
      const { from, to } = router.query;
      const res: ListInfo = await getInfo(from as string, to as string);
      if (typeof res !== "undefined") {
        setName(res.name);
        setDate(res.date);
        setTitle(res.title);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <Box minH="100vh" bgColor="background.500">
      <ShareHeader date={date} name={name} title={title} />
      <Flex
        as="main"
        flexDir="column"
        alignItems="center"
        pt="28"
        px={{ base: "3", lg: "25%" }}
        position="static"
      >
        {children}
      </Flex>
    </Box>
  );
};

export const createGetLayout = (): ((page: ReactElement) => ReactElement) =>
  function getLayout(page: ReactElement) {
    return <ShareLayout>{page}</ShareLayout>;
  };
