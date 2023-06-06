/* eslint-disable react/prop-types */
import {
  Editable,
  EditablePreview,
  ButtonGroup,
  IconButton,
  EditableInput,
  Th,
  Tr,
  Td,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

import StudentActions from "./StudentActions";
import { updateStudent } from "./ApiCalls";

// eslint-disable-next-line react/prop-types
export default function StudentRow({ studentObj, allMarks, id, update }) {
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState(studentObj);
  const [prevStudent, setPrevStudent] = useState(studentObj);

  const toast = useToast();

  return (
    <Tr>
      <Th>{id}</Th>
      <Td>
        {isEditing ? (
          <Editable defaultValue={student.first_name}>
            <EditablePreview />
            <EditableInput
              value={student.first_name}
              onChange={(e) =>
                setStudent({ ...student, first_name: e.target.value })
              }
            />
          </Editable>
        ) : (
          student.first_name
        )}
      </Td>
      <Td>
        {isEditing ? (
          <Editable defaultValue={student.last_name}>
            <EditablePreview />
            <EditableInput
              value={student.last_name}
              onChange={(e) =>
                setStudent({ ...student, last_name: e.target.value })
              }
            />
          </Editable>
        ) : (
          student.last_name
        )}
      </Td>
      <Td display="flex" justifyContent="space-evenly" alignItems="center">
        {id in allMarks
          ? allMarks[id].map((mark, index) => (
              <Badge key={index} m={2}>
                {mark}
              </Badge>
            ))
          : "no marks"}
      </Td>
      <Td>
        {isEditing ? (
          <ButtonGroup size="sm" isAttached variant="outline">
            <IconButton
              onClick={() => {
                console.log(student);
                setPrevStudent(student);
                setIsEditing(false);
                updateStudent(id, student, update, toast);
              }}
              aria-label="save edit"
              icon={<CheckIcon />}
            />
            <IconButton
              onClick={() => {
                setIsEditing(false);
                setStudent(prevStudent);
              }}
              aria-label="cancel edit"
              icon={<CloseIcon />}
            />
          </ButtonGroup>
        ) : (
          <IconButton
            onClick={() => setIsEditing(true)}
            aria-label="edit entry"
            icon={<EditIcon />}
          />
        )}
      </Td>
      <Td>
        <StudentActions id={id} update={update} />
      </Td>
    </Tr>
  );
}
