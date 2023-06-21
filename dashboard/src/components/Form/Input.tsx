import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import React from "react";

interface InputProps extends ChakraInputProps {
  label?: string;
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error = null, ...props }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}

      <ChakraInput
        {...props}
        id={props.name}
        ref={ref}
        focusBorderColor="green.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
      />

      { !!error && <FormErrorMessage>{ error.message }</FormErrorMessage> }
    </FormControl>
  );
});

Input.displayName = 'Input';

export default Input;