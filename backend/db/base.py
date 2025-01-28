# db/base.py
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "sqlite:///./test.db"

Base = declarative_base()
