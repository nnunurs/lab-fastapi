from pydantic import BaseModel
from enum import Enum

class Student(BaseModel):
    first_name: str
    last_name: str
    
    class Config:
        schema_extra = {
            "example": {
                "first_name": "John",
                "last_name": "Doe"
            }
        }
        
class Mark(int, Enum):
    BARDZO_DOBRY = 5
    DOBRY = 4
    DOSTATECZNY = 3
    NIEDOSTATECZNY = 2