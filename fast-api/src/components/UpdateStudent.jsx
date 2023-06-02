import { useState } from "react"

export default function UpdateStudent() {
    const [id, setId] = useState(0)
    const [student, setStudent] = useState({"first_name": "", "last_name": ""})

    const createStudent = () => {
        fetch(`http://127.0.0.1:8000/students/${id}`, {
            method: "PUT",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        }).then((response) => {
            console.log(response)
        }).catch((error) => {console.log(error)})
    }

    return (
        <div>
            <form>
                <label htmlFor="id"></label>
                <input value={id} onChange={(e) => setId(parseInt(e.target.value))} type="number" name="id"></input>
                <label htmlFor="first_name">First name</label>
                <input value={student.first_name} onChange={(e) => setStudent({"first_name": e.target.value, "last_name": student.last_name})} type="text" name="first_name"/>
                <label htmlFor="last_name">Last name</label>
                <input value={student.last_name} onChange={(e) => setStudent({"first_name": student.first_name, "last_name": e.target.value})} type="text" name="last_name"/>
                <button type="submit" onClick={
                    (e) => {
                        e.preventDefault()
                        createStudent()
                        console.log(student)
                }}>Update student</button>
            </form>
        </div>
    )
}
