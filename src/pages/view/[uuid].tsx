import { Box } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import { createGetLayout } from "../../components/layout/view";
import type { ViewLayoutProps } from "../../components/layout/view";

const data: ViewLayoutProps = {
  title: "This is Test!!!!!!!",
  name: "kosen Taro",
  date: "4/25",
};

const View: NextPageWithLayout = () => (
  <Box
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    
  </Box>
);

View.getLayout = createGetLayout(data);

export default View;
