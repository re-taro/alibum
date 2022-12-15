import { FC, ReactNode, ReactElement } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { EditHeader } from "./header/edit";

type EditLayoutProps = Required<{
  name: string;
}>;

interface EditLayoutInterface extends EditLayoutProps {
  children: ReactNode;
}

const EditLayout: FC<EditLayoutInterface> = ({ children, name }) => {
  const router = useRouter();
  const { id } = router.query;
  const listid = id as string;
  const link = `https://alibum.re-taro.dev/share/${listid}`;

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
    const headerData: EditLayoutProps = {
      name: "KosenTaro",
    };
    return <EditLayout {...headerData}>{page}</EditLayout>;
  };
