from pydantic import BaseModel

class SpecialtyCreate(BaseModel):
    name: str

class SpecialtyResponse(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}