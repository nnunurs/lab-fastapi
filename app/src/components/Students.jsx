import { useEffect, useState } from "react";
import CreateStudent from "./CreateStudent";
import StudentRow from "./StudentRow";
import { getStudents } from "./apiCalls";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  IconButton,
  Text,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

export default function Students() {
  const [students, setStudents] = useState({});
  const [marks, setMarks] = useState({});

  const toast = useToast();

  const updateData = () => {
    getStudents(toast).then((data) => {
      console.log(data);
      setStudents({ ...data.students });
      setMarks({ ...data.marks });
    });
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div>
      <Text fontSize="2xl" m={4}>
        Students
      </Text>
      <TableContainer variant="simple">
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>First name</Th>
              <Th>Last name</Th>
              <Th>Marks</Th>
              <Th>Average</Th>
              <Th>
                <ButtonGroup display="flex" justifyContent="flex-end">
                  <CreateStudent update={updateData} />
                  <IconButton icon={<RepeatIcon />} onClick={updateData} />
                </ButtonGroup>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(students).map((key, index) => (
              <StudentRow
                key={key}
                studentObj={students[key]}
                allMarks={marks}
                id={key}
                update={updateData}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
