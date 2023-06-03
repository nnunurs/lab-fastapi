export default function GetMarks(id) {
    console.log(id)
    let marks = []

    fetch(`http://127.0.0.1:8000/students/${id}/marks`)
        .then(res => {
            if (res.status === 404) {
                console.log("No marks found")
            } else {
                marks = res.json()
            }
        })
        .catch(err => console.log(err))

    return marks

    //   return (
    //     <div>
    //             <label htmlFor="id">Enter student ID</label>
    //             <input value={id} onChange={(e) => setId(e.target.value)} type="number" name="id"></input>
    //             <button onClick={getMarks}>Get marks</button>
    //             <div>
    //                 <ul>
    //                     {marksLoaded ? marks.map((mark, index) => 
    //                         <li key={index}><p>{mark}</p></li>
    //                     ) : ""}
    //                 </ul>
    //             </div>
    //         </div>
    //   )
}
