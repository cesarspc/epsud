from datetime import datetime
from pydantic import BaseModel

class AppointmentCreate(BaseModel):
    date_time: datetime
    doctor_id: str
    specialty_id: int
    status: str

class AppointmentResponse(BaseModel):
    id: int
    date_time: datetime
    user_id: str
    doctor_id: str
    specialty_id: int
    status: str
    
    model_config = {"from_attributes": True}