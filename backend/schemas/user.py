from pydantic import BaseModel

class UserCreate(BaseModel):
    id: str
    name: str
    email: str
    password: str
    role_id: int = 1

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role_id: int = 1

    model_config = {"from_attributes": True}