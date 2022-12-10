import { Box, Text } from "@chakra-ui/react";
import type { HTMLChakraProps } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import type { FC } from "react";
import { createGetLayout } from "components/layout/view";
import type { ViewLayoutProps } from "components/layout/view";

const data: ViewLayoutProps = {
  children: "",
  title: "This is Test!!!!!!!",
  name: "kosen Taro",
  date: "4/25",
};

const GradientText: FC<HTMLChakraProps<"p">> = (chakraProps) => (
  <Text
    fontSize="6vw"
    background="linear-gradient(90deg, #4d62d0, #d152c9 30%, #e6b357)"
    backgroundClip="text"
    {...chakraProps}
  />
);

const View: NextPageWithLayout = () => (
  <Box
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <GradientText as="h2">Hello Chakra UI</GradientText>
  </Box>
);

View.getLayout = createGetLayout(data);

export default View;
