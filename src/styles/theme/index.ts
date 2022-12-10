import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { config } from "./config";
import { fonts } from "./font";

const customTheme = extendTheme({
  colors,
  config,
  fonts,
});

export default customTheme;
