import { Box, Text } from "@chakra-ui/react";
import type { HTMLChakraProps } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import type { FC } from "react";
import { MenuLayout } from "../components/layout/menu";

const GradientText: FC<HTMLChakraProps<"p">> = (chakraProps) => (
  <Text
    fontSize="6vw"
    background="linear-gradient(90deg, #4d62d0, #d152c9 30%, #e6b357)"
    backgroundClip="text"
    {...chakraProps}
  />
);

const Index: NextPageWithLayout = () => (
  <Box
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <GradientText as="h2">Hello Chakra UI</GradientText>
  </Box>
);

Index.getLayout = (page) => <MenuLayout>{page}</MenuLayout>;

export default Index;
