import { useState } from "react"

export default function DeleteStudent() {
    const [id, setId] = useState(0)

    const deleteStudent = () => {
        fetch(`http://127.0.0.1:8000/students/${id}`, {
            method: "DELETE"
        }).then(res => console.log(res.json()))
    }

    return (
        <div>
            <label htmlFor="id">ID</label>
            <input value={id} onChange={(e) => setId(parseInt(e.target.value))} type="number" name="id"></input>
            <button type="submit" onClick={(e) => {
                e.preventDefault()
                deleteStudent()
            }}>DELETE STUDENT</button>
        </div>
  )
}
 