/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Flex,
  Badge,
  ButtonGroup,
  IconButton,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Button,
  HStack,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { addMark, updateMarks } from "./apiCalls";

export default function Marks({ id, allMarks, update }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newMark, setNewMark] = useState("");
  const [selected, setSelected] = useState([]);

  const toast = useToast();

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return isDeleting ? (
    <Flex mt={2}>
      {allMarks[id].map((mark, index) => (
        <Button
          key={index}
          mr={4}
          colorScheme={selected.includes(index) ? "teal" : "gray"}
          onClick={() => {
            // console.log(index, selected.includes(index));
            selected.includes(index)
              ? setSelected((c) => c.filter((e) => e !== index))
              : setSelected([...selected, index]);
          }}
        >
          {mark}
        </Button>
      ))}
      <ButtonGroup isAttached variant="outline">
        <IconButton
          onClick={() => {
            updateMarks(
              id,
              allMarks[id].filter((_, i) => !selected.includes(i)),
              update,
              toast
            );
            setIsDeleting(false);
            setSelected([]);
          }}
          icon={<CheckIcon />}
          aria-label="delete selected"
        />
        <IconButton
          onClick={() => {
            setIsDeleting(false);
            setSelected([]);
          }}
          icon={<CloseIcon />}
          aria-label="cancel deletion"
        />
      </ButtonGroup>
    </Flex>
  ) : (
    <Flex mt={2}>
      {id in allMarks ? (
        <HStack orientation="row">
          {allMarks[id].map((mark, index) => (
            <Badge
              key={index}
              mr={4}
              mb={2}
              pt={2}
              pb={2}
              pl={4}
              pr={4}
              borderRadius={5}
            >
              {mark}
            </Badge>
          ))}
        </HStack>
      ) : (
        ""
      )}
      {isAdding ? (
        <Flex>
          <FormControl>
            <NumberInput
              min={2}
              max={5}
              step={0.5}
              defaultValue={2}
              value={newMark}
              onChange={(e) => setNewMark(e)}
              size="sm"
              width={20}
              mr={4}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <ButtonGroup isAttached variant="outline">
            <IconButton
              icon={<CheckIcon />}
              onClick={() => {
                addMark(id, parseFloat(newMark), update, toast);
                setNewMark("");
                setIsAdding(false);
              }}
            />
            <IconButton
              icon={<CloseIcon />}
              onClick={() => setIsAdding(false)}
            />
          </ButtonGroup>
        </Flex>
      ) : (
        <ButtonGroup isAttached variant="outline">
          <IconButton
            onClick={() => {
              setIsAdding(true);
            }}
            aria-label="add mark"
            icon={<AddIcon />}
          />
          <IconButton
            onClick={() => {
              setIsDeleting(true);
              toast({
                title: "Select marks to delete",
                status: "info",
                duration: 3000,
                isClosable: true,
              });
            }}
            aria-label="delete marks"
            icon={<DeleteIcon />}
            isDisabled={!(id in allMarks && allMarks[id].length > 0)}
          />
        </ButtonGroup>
      )}
    </Flex>
  );
}
