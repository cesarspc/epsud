from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from backend.db.base import Base

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    date_time = Column(DateTime, nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(String, ForeignKey("users.id"), nullable=False)
    specialty_id = Column(Integer, ForeignKey("specialties.id"), nullable=False)
    status = Column(String, nullable=False)
    patient = relationship("User", foreign_keys=[user_id], back_populates="appointments_as_patient")
    doctor = relationship("User", foreign_keys=[doctor_id], back_populates="appointments_as_doctor")
    specialty = relationship("Specialty", back_populates="appointments")
    