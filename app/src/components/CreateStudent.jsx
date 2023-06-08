/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Button,
  Modal,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { createStudent } from "./apiCalls";

export default function CreateStudent({ update }) {
  const [student, setStudent] = useState({ first_name: "", last_name: "" });
  const [isOpen, setIsOpen] = useState(false);

  const toast = useToast();

  const isFNameError = student.first_name === "";
  const isLNameError = student.last_name === "";

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} colorScheme="teal">
        New student
      </Button>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new student</ModalHeader>
          <ModalBody>
            <FormControl isRequired isInvalid={isFNameError}>
              <FormLabel>First name</FormLabel>
              <Input
                value={student.first_name}
                onChange={(e) =>
                  setStudent({ ...student, first_name: e.target.value })
                }
                placeholder="First name"
                mb={5}
              />
              {!isFNameError ? (
                ""
              ) : (
                <FormErrorMessage>First name is required</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={isLNameError}>
              <FormLabel>Last name</FormLabel>
              <Input
                value={student.last_name}
                onChange={(e) =>
                  setStudent({ ...student, last_name: e.target.value })
                }
                placeholder="Last name"
              />
              {!isLNameError ? (
                ""
              ) : (
                <FormErrorMessage>Last name is required</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => {
                setIsOpen(false);
                setStudent({ first_name: "", last_name: "" });
              }}
              mr={5}
            ></IconButton>
            <Button
              isDisabled={isFNameError || isLNameError}
              onClick={() => {
                createStudent(student, update, toast);
                setStudent({ first_name: "", last_name: "" });
                setIsOpen(false);
              }}
              colorScheme="teal"
            >
              Create student
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
