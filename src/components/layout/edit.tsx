import { FC, ReactNode, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../libs/firebase/init";
import { EditHeader } from "./header/edit";

interface EditLayoutInterface {
  children: ReactNode;
}

const EditLayout: FC<EditLayoutInterface> = ({ children }) => {
  const [listid, setListid] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const { id } = router.query;
        const i = id as string;
        setListid(i);
        setLink(`https://alibum.re-taro.dev/view?from=${u.uid}&to=${listid}`);
      }
    });
    return () => {
      authStateChanged();
    };
  }, [router, listid]);
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
