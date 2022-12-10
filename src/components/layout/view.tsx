import type { FC, ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ViewHeader } from "./header/view";

type ViewLayoutProps = Required<{
  children: ReactNode;
  date: string;
  name: string;
  title: string;
}>;

export const ViewLayout: FC<ViewLayoutProps> = ({
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
      position="static"
    >
      {children}
    </Flex>
  </Box>
);
