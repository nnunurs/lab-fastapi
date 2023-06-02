from functools import lru_cache
from students.schema import Mark

students = {0: {"first_name": "John", "last_name": "Doe"}}

marks = {0: [Mark(5.0)]}


@lru_cache()
def get_storage():
    return students


@lru_cache()
def get_marks_storage():
    return marks
