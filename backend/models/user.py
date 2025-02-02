from sqlalchemy import Column, Integer, String, ForeignKey
from backend.db.base import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String)
    role_id = Column(Integer, ForeignKey('roles.id'), nullable=False)
    role = relationship("Role", back_populates="users")
    appointments_as_patient = relationship("Appointment", foreign_keys="Appointment.user_id", back_populates="patient")
    appointments_as_doctor = relationship("Appointment", foreign_keys="Appointment.doctor_id", back_populates="doctor")