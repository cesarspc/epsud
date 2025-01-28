# init_db.py
from backend.db.session import engine
from backend.db.base import Base

def init_db():

    print("Creando tablas...")
    Base.metadata.create_all(bind=engine)
    print("Base de datos inicializada.")

if __name__ == "__main__":
    init_db()
