import { useEffect, useState } from "react"
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
            .then(data => setStudents(data.students))
            .then(setStudentLoaded(true))
            .then(console.log(students))
    }

    return (
        <div className="card">
            <CreateStudent />
            <UpdateStudent />
            <DeleteStudent />
            <AddMarks />
            <button onClick={getStudents}>Get students</button>
            <div>
                <ul>
                    {Object.keys(students).map((key, index) => (
                        <li key={index}>
                            <p>{students[key].first_name} {students[key].last_name}</p>
                            {GetMarks(index).map((mark) => <p>{mark}</p>)}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}
