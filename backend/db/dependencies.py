# backend/db/dependencies.py
from sqlalchemy.orm import Session
from db.session import SessionLocal

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
