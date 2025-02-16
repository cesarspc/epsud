# init_db.py
from db.session import engine
from db.base import Base

def init_db():

    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Database initialized")

if __name__ == "__main__":
    init_db()
