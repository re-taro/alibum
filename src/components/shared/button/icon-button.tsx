import { Icon } from "@iconify/react";
import { IconButton as ChakraIconButton } from "@chakra-ui/react";
import type { IconButtonProps as ChakraIconButtonProps } from "@chakra-ui/react";
import type { IconifyIcon } from "@iconify/react";
import { forwardRef } from "react";

export type IconButtonProps = Omit<
  ChakraIconButtonProps,
  "icon" | "aria-label"
> & {
  label: string;
  icon: string | IconifyIcon;
};

// eslint-disable-next-line react/display-name
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, size, icon }, ref) => (
    <ChakraIconButton
      colorScheme="secondary"
      color="white"
      isRound
      aria-label={label}
      size={size}
      icon={<Icon icon={icon} />}
      ref={ref}
    />
  ),
);
