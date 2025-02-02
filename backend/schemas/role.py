from pydantic import BaseModel

class RoleCreate(BaseModel):
    name: str

class RoleResponse(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}