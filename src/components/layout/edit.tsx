import type { FC, ReactNode, ReactElement } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { EditHeader } from "./header/edit";

export type EditLayoutProps = Required<{
  name: string;
}>;

interface EditLayoutInterface extends EditLayoutProps {
  children: ReactNode;
}

const EditLayout: FC<EditLayoutInterface> = ({ children, name }) => (
  <Box minH="100vh" bgColor="background.500">
    <EditHeader name={name} />
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

export const createGetLayout = (
  layoutProps: EditLayoutProps,
): ((page: ReactElement) => ReactNode) =>
  function getLayout(page: ReactElement) {
    return <EditLayout {...layoutProps}>{page}</EditLayout>;
  };
