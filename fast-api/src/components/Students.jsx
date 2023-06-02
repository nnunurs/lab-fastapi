import {  useState } from "react"
import CreateStudent from "./CreateStudent"
import UpdateStudent from "./UpdateStudent"
import AddMarks from "./AddMarks"
import GetMarks from "./GetMarks"
import DeleteStudent from "./DeleteStudent"

export default function Students() {
    const [studentLoaded, setStudentLoaded] = useState(false)
    const [students, setStudents] = useState({})

    const getStudents = () => {
        fetch(`http://127.0.0.1:8000/students/all`)
            .then(res => res.json())
            .then(data => setStudents(data))
            .then(setStudentLoaded(true))
            .then(console.log(students))
    }

    return (
        <div className="card">
            <CreateStudent />
            <UpdateStudent />
            <DeleteStudent />
            <AddMarks />
            <GetMarks />
            <button onClick={getStudents}>Get student</button>
            <div>
                <ul>
                    {studentLoaded ? students.map((student) => {
                        <li>
                            <p>{student.first_name}</p>
                            <p>{student.last_name}</p>
                        </li>
                    }): <p>Loading...</p>}
                </ul>
                
            </div>
        </div>
    )
}
