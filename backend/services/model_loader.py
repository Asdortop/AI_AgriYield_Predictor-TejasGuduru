# backend/services/model_loader.py

import joblib
import os

# Path to /backend/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# /backend/ml
ARTIFACT_DIR = os.path.join(BASE_DIR, "ml")

# File paths - using final trained models
MODEL_PATH = os.path.join(ARTIFACT_DIR, "best_model_final.pkl")
ENC_PATH   = os.path.join(ARTIFACT_DIR, "encoders_final.pkl")
FO_PATH    = os.path.join(ARTIFACT_DIR, "feature_order_final.pkl")
TARGET_ENC_PATH = os.path.join(ARTIFACT_DIR, "target_encodings_final.pkl")

# Load model
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
model = joblib.load(MODEL_PATH)

# Load preprocessors
if not os.path.exists(ENC_PATH):
    raise FileNotFoundError(f"Encoders file not found at {ENC_PATH}")
if not os.path.exists(FO_PATH):
    raise FileNotFoundError(f"Feature order file not found at {FO_PATH}")

# Load target encodings (optional - will fallback in preprocess.py if missing)
target_encodings = None
if os.path.exists(TARGET_ENC_PATH):
    target_encodings = joblib.load(TARGET_ENC_PATH)

preprocessors = {
    "encoders": joblib.load(ENC_PATH),
    "feature_order": joblib.load(FO_PATH),
    "target_encodings": target_encodings
}
