import { Box, Text } from "@chakra-ui/react";
import type { HTMLChakraProps } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import type { FC } from "react";
import { createGetLayout } from "components/layout/edit";
import type { EditLayoutProps } from "components/layout/edit";

const data: EditLayoutProps = {
  name: "Kosen Taroaaaaaaaaaaaaaaaaaaaaaaaaaaa",
};

const GradientText: FC<HTMLChakraProps<"p">> = (chakraProps) => (
  <Text
    fontSize="6vw"
    background="linear-gradient(90deg, #4d62d0, #d152c9 30%, #e6b357)"
    backgroundClip="text"
    {...chakraProps}
  />
);

const Edit: NextPageWithLayout = () => (
  <Box
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <GradientText as="h2">Hello Chakra UI</GradientText>
  </Box>
);

Edit.getLayout = createGetLayout(data);

export default Edit;
