import type {
  FormControlProps,
  FormErrorMessageProps,
  FormLabelProps,
  HelpTextProps,
} from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import type { ReactNode, FC } from "react";

export type WrapperProps = {
  label?: FormLabelProps["children"];
  errorText?: FormErrorMessageProps["children"];
  helperText?: HelpTextProps["children"];
  children?: ReactNode;
} & Pick<FormControlProps, "isInvalid" | "isRequired">;

export const Wrapper: FC<WrapperProps> = ({
  label,
  errorText,
  helperText,
  isInvalid,
  isRequired,
  children,
}) => (
  <FormControl isInvalid={isInvalid} isRequired={isRequired}>
    {label && <FormLabel>{label}</FormLabel>}
    {children}
    {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
