# backend/services/predict_service.py

from .model_loader import model, preprocessors
from utils.preprocess import preprocess_input
import pandas as pd

def predict_from_json(data_json):
    """
    Converts JSON input → DataFrame → Preprocess → Predict
    """

    # Convert JSON → DataFrame
    if isinstance(data_json, dict):
        df = pd.DataFrame([data_json])
    else:
        df = pd.DataFrame(data_json)

    # Preprocess (label encoding + column ordering)
    X_proc = preprocess_input(df, preprocessors)

    # Predict
    preds = model.predict(X_proc)

    return preds.tolist()
