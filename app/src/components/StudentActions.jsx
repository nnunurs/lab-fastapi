/* eslint-disable react/prop-types */
import { Button, ButtonGroup, IconButton, useToast } from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";

import { deleteStudent } from "./apiCalls";

export default function StudentActions({
  id,
  update,
  acceptEdit,
  cancelEdit,
  isEditMode,
  toggleEditMode,
}) {
  const toast = useToast();

  return (
    <ButtonGroup display="flex" justifyContent="flex-end" isAttached>
      {isEditMode ? (
        <ButtonGroup size="sm" isAttached variant="outline">
          <IconButton
            onClick={() => {
              acceptEdit();
              toggleEditMode();
            }}
            aria-label="save edit"
            icon={<CheckIcon />}
          />
          <IconButton
            onClick={() => {
              cancelEdit();
              toggleEditMode();
            }}
            aria-label="cancel edit"
            icon={<CloseIcon />}
          />
        </ButtonGroup>
      ) : (
        <ButtonGroup isAttached variant="outline">
          <Button onClick={() => toggleEditMode()} colorScheme="teal">
            Edit name
          </Button>
          <IconButton
            onClick={() => deleteStudent(id, update, toast)}
            aria-label="delete entry"
            icon={<DeleteIcon />}
            colorScheme="red"
          />
        </ButtonGroup>
      )}
    </ButtonGroup>
  );
}
