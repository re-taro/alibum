import type { FC, ReactNode, ReactElement } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import type { ListInfo } from "../../libs/firebase/types";
import { getInfo } from "../../libs/firebase/store";
import { auth } from "../../libs/firebase/init";
import { EditHeader } from "./header/edit";

interface EditLayoutInterface {
  children: ReactNode;
}

const EditLayout: FC<EditLayoutInterface> = ({ children }) => {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const { id } = router.query;
        const listid = id as string;
        setLink(`https://alibum.re-taro.dev/share?from=${u.uid}&to=${listid}`);
        const res: ListInfo = await getInfo(u.uid, listid);
        if (typeof res !== "undefined") setName(res.name);
      }
    });
    return () => {
      authStateChanged();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <Box minH="100vh" bgColor="background.500">
      <EditHeader name={name} link={link} />
      <Flex
        as="main"
        flexDir="column"
        alignItems="center"
        pt="28"
        px={{ base: "10", lg: "25%" }}
        position="static"
      >
        {children}
      </Flex>
    </Box>
  );
};
export const createGetLayout = (): ((page: ReactElement) => ReactElement) =>
  function getLayout(page: ReactElement) {
    return <EditLayout>{page}</EditLayout>;
  };
