import { useToast } from "@chakra-ui/react";

const showSuccessToast = (title, text) => {
  useToast({
    title: title,
    description: text,
    status: "success",
    duration: 3000,
    isClosable: true,
  });
};

const useErrorToast = (title, text) => {
  useToast({
    title: title,
    description: text,
    status: "error",
    duration: 3000,
    isClosable: true,
  });
};

export { showSuccessToast, useErrorToast };
