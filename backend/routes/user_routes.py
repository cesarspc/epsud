from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from backend.db.session import get_db
from backend.models.user import User
from backend.schemas.user import UserCreate

router = APIRouter()

@router.post("/register/")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(id=user.id, email=user.email, name=user.name, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user