import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

DATA_FILE_PATH = os.path.join(BASE_DIR, 'data', 'car-details.csv')

MODEL_DIR = os.path.join(BASE_DIR, 'app', 'models')
MODEL_PATH = os.path.join(MODEL_DIR, 'model.joblib')