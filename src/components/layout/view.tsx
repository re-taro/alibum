import type { FC, ReactNode, ReactElement } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ViewHeader } from "./header/view";

export type ViewLayoutProps = Required<{
  date: string;
  name: string;
  title: string;
}>;

interface ViewLayoutInterface extends ViewLayoutProps {
  children: ReactNode;
}

const ViewLayout: FC<ViewLayoutInterface> = ({
  children,
  date,
  name,
  title,
}) => (
  <Box minH="100vh" bgColor="background.500">
    <ViewHeader date={date} name={name} title={title} />
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
  layoutProps: ViewLayoutProps,
): ((page: ReactElement) => ReactNode) =>
  function getLayout(page: ReactElement) {
    return <ViewLayout {...layoutProps}>{page}</ViewLayout>;
  };
