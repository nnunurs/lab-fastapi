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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { createStudent } from "./ApiCalls";

export default function CreateStudent({ update }) {
  const [student, setStudent] = useState({ first_name: "", last_name: "" });
  const [isOpen, setIsOpen] = useState(false);

  const toast = useToast();

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
            <Input
              value={student.first_name}
              onChange={(e) =>
                setStudent({ ...student, first_name: e.target.value })
              }
              placeholder="First name"
              mb={5}
            />
            <Input
              value={student.last_name}
              onChange={(e) =>
                setStudent({ ...student, last_name: e.target.value })
              }
              placeholder="Last name"
            />
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
