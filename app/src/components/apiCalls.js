const API_BASE_URL = "http://127.0.0.1:8000/students/";

const getStudents = (toast) => {
  return fetch(API_BASE_URL + "all")
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Error",
          description: res.statusText,
          status: "error",
        });
        throw new Error(res.statusText);
      } else return res.json();
    })
    .catch((error) => {
      console.log(error);
      return { students: {}, marks: {} };
    });
};

const createStudent = (student, update, toast) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Error",
          description: res.statusText,
          status: "error",
        });
        throw new Error(res.statusText);
      } else res.json();
    })
    .then((data) => {
      console.log(data);
      toast({
        title: "Student created",
        description: "Student was created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => update());
};

const updateStudent = (id, student, update, toast) => {
  fetch(API_BASE_URL + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: student.first_name,
      last_name: student.last_name,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Error",
          description: res.statusText,
          status: "error",
        });
        throw new Error(res.statusText);
      } else res.json();
    })
    .then((data) => {
      console.log(data);
      toast({
        title: "Student modified",
        description: "Student was modified successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => update());
};

const deleteStudent = (id, update, toast) => {
  return fetch(API_BASE_URL + id, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Error",
          description: res.statusText,
          status: "error",
        });
        throw new Error(res.statusText);
      } else res.json();
    })
    .then((data) => {
      console.log(data);
      toast({
        title: "Student deleted",
        description: "Student was deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => update());
};

const addMark = (id, mark, update, toast) => {
  fetch(API_BASE_URL + `${id}/marks/${mark}`, {
    method: "POST",
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Error",
          description: res.statusText,
          status: "error",
        });
        throw new Error(res.statusText);
      } else res.json();
    })
    .then((data) => {
      console.log(data);
      toast({
        title: "Mark added",
        description: "Mark was added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => update());
};

const updateMarks = (id, newMarks, update, toast) => {
  fetch(API_BASE_URL + `${id}/marks/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ marks: newMarks }),
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Error updating marks",
          description: res.statusText,
          status: "error",
        });
        throw new Error(res.statusText);
      } else res.json();
    })
    .then((data) => {
      console.log(data);
      toast({
        title: "Mark updated",
        description: "Marks were updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => update());
};

export {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  addMark,
  updateMarks,
};
