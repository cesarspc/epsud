from fastapi import FastAPI, Depends, HTTPException
from backend.db.init_db import init_db
from backend.db.base_models import User
from backend.models.appointment import Appointment
from backend.models.role import Role
from backend.models.specialty import Specialty
from backend.schemas.appointment import AppointmentCreate, AppointmentResponse
from backend.schemas.role import RoleCreate, RoleResponse
from backend.schemas.specialty import SpecialtyCreate, SpecialtyResponse
from backend.schemas.user import UserCreate, UserResponse
from backend.db.dependencies import get_db
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

async def startup_event():
    print("Starting up...")
    init_db()

app.add_event_handler("startup", startup_event)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ajusta según tu URL de frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a new user
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Get user by ID
@app.get("/users/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Get doctors
@app.get("/doctors", response_model=list[UserResponse])
def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(User).filter(User.role_id == 2).all()
    return doctors

@app.get("/specialties/", response_model=list[SpecialtyResponse])
def get_specialties(db: Session = Depends(get_db)):
    specialties = db.query(Specialty).all()
    return specialties

# Update a user by ID
@app.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user.model_dump().items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user

# Delete a user by ID
@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

# Roles

@app.post("/roles/", response_model=RoleResponse)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    db_role = Role(**role.model_dump())
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role

# Specialties
@app.post("/specialties/", response_model=SpecialtyResponse)
def create_specialty(specialty: SpecialtyCreate, db: Session = Depends(get_db)):
    db_specialty = Specialty(**specialty.model_dump())
    db.add(db_specialty)
    db.commit()
    db.refresh(db_specialty)
    return db_specialty

@app.get("/specialties", response_model=list[SpecialtyResponse])
def get_specialties(db: Session = Depends(get_db)):
    specialties = db.query(Specialty).all()
    return specialties

# Appointments
@app.post("/appointments/", response_model=AppointmentResponse)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(**appointment.model_dump())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.get("/appointments/{appointment_id}", response_model=AppointmentResponse)
def read_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@app.get("/users/{user_id}/appointments/", response_model=list[AppointmentResponse])
def get_user_appointments(user_id: str, db: Session = Depends(get_db)):
    # Vertify if the user exists
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Get the appointments
    appointments = db.query(Appointment).filter(Appointment.user_id == user_id).all()
    return appointments