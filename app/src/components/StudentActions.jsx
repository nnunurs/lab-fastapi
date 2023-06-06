/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Input,
  Button,
  ButtonGroup,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";

import { deleteStudent, addMark } from "./ApiCalls";

export default function StudentActions({ id, update }) {
  const [mark, setMark] = useState(0.0);
  const [isAdding, setIsAdding] = useState(false);

  const toast = useToast();

  return isAdding ? (
    <div>
      <Input
        placeholder=""
        onChange={(e) => setMark(parseFloat(e.target.value))}
        type="number"
        width="auto"
      />
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          onClick={() => {
            addMark(id, mark, update, toast);
            setIsAdding(false);
          }}
        >
          Add
        </Button>
        <Button onClick={() => setIsAdding(false)}>
          <CloseIcon />
        </Button>
      </ButtonGroup>
    </div>
  ) : (
    <ButtonGroup display="flex" justifyContent="flex-end">
      <Button
        onClick={() => setIsAdding(true)}
        colorScheme="teal"
        variant="outline"
      >
        Add mark
      </Button>
      <IconButton
        onClick={() => deleteStudent(id, update, toast)}
        aria-label="delete entry"
        icon={<DeleteIcon />}
        colorScheme="red"
      />
    </ButtonGroup>
  );
}
