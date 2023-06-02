import { useState } from "react"

export default function GetMarks() {
    const [marks, setMarks] = useState([])
    const [marksLoaded, setMarksLoaded] = useState(false)
    const [id, setId] = useState(0)

    const getMarks = () => {
        fetch(`http://127.0.0.1:8000/students/${id}/marks`)
            .then(res => res.json())
            .then(data => setMarks(data))
            .then(console.log(marks))
            .then(setMarksLoaded(true))
            .catch(err => console.log(err))
    }

  return (
    <div>
            <label htmlFor="id">Enter student ID</label>
            <input value={id} onChange={(e) => setId(e.target.value)} type="number" name="id"></input>
            <button onClick={getMarks}>Get marks</button>
            <div>
                <ul>
                    {marksLoaded ? marks.map((mark, index) => 
                        <li key={index}><p>{mark}</p></li>
                    ) : ""}
                </ul>
            </div>
        </div>
  )
}
