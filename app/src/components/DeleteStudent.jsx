export default async function deleteStudent(id, update) {
  fetch(`http://127.0.0.1:8000/students/${id}`, {
    method: "DELETE",
  }).then((res) => console.log(res.json()))
    .catch((error) => console.log(error))
    .finally(() => update());
}