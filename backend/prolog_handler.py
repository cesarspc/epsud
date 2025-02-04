import yaml
from pyswip import Prolog

# Load data from YAML file
def load_prolog():
    with open('backend/available.yml', 'r') as file:
        data = yaml.safe_load(file)
    
    prolog = Prolog()
    for doctor in data["doctors"]:
        doctor_id = doctor["doctor"]
        for hour in doctor["available_hours"]:
            hour_only = hour[:2]  # Get only the hour part
            prolog.assertz(f"available({doctor_id}, '{hour_only}')")
        
        specialty_id = doctor.get("specialty")
        if specialty_id is not None:
            prolog.assertz(f"has_specialty({doctor_id}, {specialty_id})") # Add specialty to doctor
    
    return prolog

# Intialize prolog engine and load data
prolog = load_prolog()

# Check if a doctor is available at a specific hour
def is_doctor_available(doctor: str, time: str) -> bool:
    hour_only = time[:2]
    query = f"available({doctor}, '{hour_only}')"
    return bool(list(prolog.query(query)))

# Check if a doctor has a specific specialty
def is_doctor_able(doctor_id: str, specialty_id: int) -> bool:
    query = f"has_specialty({doctor_id}, {specialty_id})"
    return bool(list(prolog.query(query)))

print(is_doctor_able("1",2))