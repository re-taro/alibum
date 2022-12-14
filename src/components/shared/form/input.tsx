import type { InputProps } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";
import { forwardRef } from "react";
import type { WrapperProps } from "./wrapper";
import { Wrapper } from "./wrapper";

export type ControlledInputProps = WrapperProps & InputProps;

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, ControlledInputProps>(
  (
    { label, errorText, helperText, isInvalid, isRequired, ...inputProps },
    ref,
  ) => (
    <Wrapper
      label={label}
      errorText={errorText}
      helperText={helperText}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      <ChakraInput
        ref={ref}
        focusBorderColor="extra.500"
        color="extra.500"
        _placeholder={{ opacity: 0.6, color: "inherit" }}
        variant="outline"
        borderRadius="8px"
        {...inputProps}
        isRequired={isRequired}
      />
    </Wrapper>
  ),
);
