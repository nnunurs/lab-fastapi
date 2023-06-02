from fastapi.testclient import TestClient
from main import app

import pytest

client = TestClient(app)


def test_get_client():
    response = client.get("/students")
    assert response.status_code == 200
    assert response.json() == {"message": "Students API"}


def test_get_student():
    response = client.get("/students/0")
    assert response.status_code == 200
    assert response.json() == {"first_name": "John", "last_name": "Doe"}


def test_get_student_not_found():
    response = client.get("/students/1")
    assert response.status_code == 404
    assert response.json() == {"detail": "Student not found"}


def test_create_student():
    response = client.post("/students", json={"first_name": "Jane", "last_name": "Doe"})
    assert response.status_code == 200
    assert response.json() == {"1": {"first_name": "Jane", "last_name": "Doe"}}


def test_create_student_invalid_input():
    response = client.post("/students/", json={"first_name": 1, "last_name": "Doe"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid input"}


def test_update_student():
    response = client.put(
        "/students/0", json={"first_name": "Jane", "last_name": "Doe"}
    )
    assert response.status_code == 200
    assert response.json() == {"first_name": "Jane", "last_name": "Doe"}


def test_update_student_not_found():
    response = client.put(
        "/students/100", json={"first_name": "Jane", "last_name": "Doe"}
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Student not found"}


def test_update_student_invalid_input():
    response = client.put("/students/0", json={"first_name": 1, "last_name": "Doe"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid input"}


def test_delete_student():
    response = client.delete("/students/0")
    assert response.status_code == 200
    assert response.json() == {"message": "Student deleted"}


def test_delete_student_not_found():
    response = client.delete("/students/100")
    assert response.status_code == 404
    assert response.json() == {"detail": "Student not found"}


def test_add_mark():
    response = client.post("/students/1/marks/5")
    # assert response.status_code == 200
    assert response.json() == {"message": "Mark added"}


def test_add_mark_not_found():
    response = client.post("/students/100/marks/5.0")
    assert response.status_code == 404
    assert response.json() == {"detail": "Student not found"}


def test_get_marks():
    response = client.get("/students/1/marks")
    assert response.status_code == 200
    assert response.json() == [5.0]


def test_get_marks_not_found():
    response = client.get("/students/100/marks")
    assert response.status_code == 404
    assert response.json() == {"detail": "Student not found"}


@pytest.fixture(autouse=True)
def delete_all_students():
    for student in client.get("/students/").json():
        client.delete(f"/students/{student}")


# Run the tests with pytest test/test_students.py
