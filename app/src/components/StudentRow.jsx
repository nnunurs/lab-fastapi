/* eslint-disable react/prop-types */
import {
  Editable,
  EditablePreview,
  EditableInput,
  Th,
  Tr,
  Td,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import StudentActions from "./StudentActions";
import Marks from "./Marks";
import { updateStudent } from "./apiCalls";

// eslint-disable-next-line react/prop-types
export default function StudentRow({ studentObj, allMarks, id, update }) {
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState(studentObj);
  const [prevStudent, setPrevStudent] = useState(studentObj);

  const toast = useToast();

  const acceptEdit = () => {
    console.log(student);
    setPrevStudent(student);
    setIsEditing(false);
    updateStudent(id, student, update, toast);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setStudent(prevStudent);
  };

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
      <Td display="flex" justifyContent="flex-start" alignItems="center">
        <Marks id={id} allMarks={allMarks} update={update} />
      </Td>
      <Td>
        {parseFloat(
          allMarks[id].reduce((p, a) => p + a, 0) / allMarks[id].length
        ).toFixed(2)}
      </Td>
      <Td>
        <StudentActions
          id={id}
          update={update}
          acceptEdit={acceptEdit}
          cancelEdit={cancelEdit}
          isEditMode={isEditing}
          toggleEditMode={() => setIsEditing(!isEditing)}
        />
      </Td>
    </Tr>
  );
}
