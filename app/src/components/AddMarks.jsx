import { useState } from 'react'

export default function AddMarks() {
    const [marks, setMarks] = useState("")
    const [id, setId] = useState(0)

    const addMarks = () => {
        const marks_arr = marks.split(",")

        for (let i = 0; i < marks_arr.length; i++) {
            fetch(`http://127.0.0.1:8000/students/${id}/marks/${marks_arr[i]}`, {
                method: "POST",
            })
                .then((response) => console.log(response.json()))
                .catch((err) => console.log(err))
        }
    }

  return (
    <div>
        <label htmlFor="id">ID</label>
        <input value={id} onChange={(e) => setId(parseInt(e.target.value))} type="number" name="id"></input>
        <label htmlFor="marks">Marks</label>
        <input value={marks} onChange={(e) => setMarks(e.target.value)} type="text" name="marks" placeholder='Input marks (coma separated)'></input>
        <button type="submit" onClick={
            (e) => {
                e.preventDefault()
                addMarks()
                console.log(e)
            }
        }>Add marks</button>
    </div>
  )
}
