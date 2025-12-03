# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

# --- Internal Imports ---
from services.prediction_service import predict_from_json
from services.model_loader import model, preprocessors
from utils.preprocess import preprocess_input
from utils.shap_explain import explain_shap

app = Flask(__name__)

# Manual CORS handler (replaces flask-cors to avoid conflicts)

# Manual CORS handler (fail-safe)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Handle OPTIONS requests (CORS preflight)
@app.before_request
def handle_preflight():
    from flask import request
    if request.method == "OPTIONS":
        response = app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

# ----------------------------
# Health Check Endpoint
# ----------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# ----------------------------
# Single Prediction Endpoint
# ----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    """
    Expected JSON:
    {
      "State": "maharashtra",
      "Crop": "rice",
      "Season": "kharif",
      "Year": 2018,
      "Annual_Rainfall": 1100.5,
      "Fertilizer": 120.0,
      "Pesticide": 0.27
    }
    """
    try:
        req = request.get_json()
        if req is None:
            return jsonify({"error": "Empty input"}), 400

        # ---- 1. Get model prediction ----
        preds = predict_from_json(req)

        if not preds:
            return jsonify({"error": "Prediction failed"}), 500

        return jsonify({
            "predicted_yield": float(preds[0])
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------
# Prediction + SHAP Endpoint
# ----------------------------
@app.route("/predict_shap", methods=["POST"])
def predict_with_shap():
    """
    Returns:
    {
      "predicted_yield": 1.85,
      "shap": [
          ["Crop", 0.92],
          ["Annual_Rainfall", 0.31],
          ["Fertilizer", -0.12]
      ]
    }
    """
    try:
        req = request.get_json()
        if req is None:
            return jsonify({"error": "Empty input"}), 400

        # ---- Convert to DF ----
        df = pd.DataFrame([req]) if isinstance(req, dict) else pd.DataFrame(req)

        # ---- Preprocess ----
        X_proc = preprocess_input(df, preprocessors)

        # ---- Predict ----
        preds = model.predict(X_proc)

        # ---- SHAP Explain for row 0 ----
        shap_info = explain_shap(model, X_proc)

        return jsonify({
            "predicted_yield": float(preds[0]),
            "shap": shap_info
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------
# SHAP Summary for Batch
# ----------------------------
@app.route("/explain_batch", methods=["POST"])
def explain_batch():
    try:
        req = request.get_json()
        df = pd.DataFrame(req) if isinstance(req, list) else pd.DataFrame([req])

        X_proc = preprocess_input(df, preprocessors)

        summary = explain_shap(model, X_proc, return_summary=True)

        return jsonify({"shap_summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
