import yaml
from pyswip import Prolog

# Load data from YAML file
def load_prolog():
    with open('backend/available.yml', 'r') as file:
        data = yaml.safe_load(file)
    
    prolog = Prolog()
    for doctor in data["doctors"]:
        doctor_id = doctor["doctor_id"]
        for hour in doctor["available_hours"]:
            hour_only = hour[:2]  # Get only the hour part
            prolog.assertz(f"available({doctor_id}, '{hour_only}')")
    
    return prolog

# Intialize prolog engine and load data
prolog = load_prolog()

# Check if a doctor is available at a specific hour
def is_doctor_available(doctor_id: str, time: str) -> bool:
    hour_only = time[:2]
    query = f"available({doctor_id}, '{hour_only}')"
    return bool(list(prolog.query(query)))