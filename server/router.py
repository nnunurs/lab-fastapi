from fastapi import APIRouter, HTTPException

from server.schema import Student, Mark
from server.storage import students, get_marks_storage

router = APIRouter()


def validate_student(student: Student, id_: int = 0, update: bool = False):
    if student.first_name.isdigit() or student.last_name.isdigit():
        raise HTTPException(status_code=400, detail="Invalid input")

    if update and id_ not in students:
        raise HTTPException(status_code=404, detail="Student not found")

    if student.first_name == "" or student.last_name == "":
        raise HTTPException(status_code=400, detail="Invalid input")


@router.get("/")
async def root():
    return {"message": "Students API"}


@router.get("/all")
async def get_all_students():
    return {"students": students}


@router.get("/{id_}", response_model=Student)
async def get_student(id_: int):
    if id_ not in students:
        raise HTTPException(status_code=404, detail="Student not found")

    return students[id_]


@router.post("/")
async def create_student(student: Student):
    validate_student(student)

    id_ = len(students)
    students[id_] = student
    return {id_: student}


@router.put("/{id_}", response_model=Student)
async def update_student(id_: int, student: Student):
    validate_student(student, id_, True)

    students[id_] = student
    return students[id_]


@router.delete("/{id_}")
async def delete_student(id_: int):
    if id_ not in students:
        raise HTTPException(status_code=404, detail="Student not found")

    del students[id_]
    return {"message": "Student deleted"}


@router.post("/{id_}/marks/{mark:float}")
async def add_mark(id_: int, mark: Mark):
    temp_mark = get_marks_storage()

    print(students)
    if id_ not in students:
        raise HTTPException(status_code=404, detail="Student not found")

    if id_ not in temp_mark:
        temp_mark[id_] = [mark]
    else:
        temp_mark[id_].append(mark)

    return {"message": "Mark added"}


@router.get("/{id_}/marks")
async def get_marks(id_: int):
    if id_ not in students:
        raise HTTPException(status_code=404, detail="Student not found")

    if id_ not in get_marks_storage():
        raise HTTPException(status_code=404, detail="Student has no marks")

    return get_marks_storage()[id_]
