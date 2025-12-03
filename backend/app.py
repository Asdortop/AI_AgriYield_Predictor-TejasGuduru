# backend/app.py

from flask import Flask, request, jsonify
import pandas as pd

# --- Internal Imports ---
from services.prediction_service import predict_from_json
from services.model_loader import model, preprocessors
from utils.preprocess import preprocess_input

app = Flask(__name__)

# -----------------------------------------------------
# FINAL CORS FIX (NO DUPLICATES, FULL RENDER SUPPORT)
# -----------------------------------------------------
@app.after_request
def add_cors_headers(response):
    # .set() guarantees only ONE header (Render may inject one)
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return response


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        resp = app.make_default_options_response()
        resp.headers.set("Access-Control-Allow-Origin", "*")
        resp.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        resp.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return resp
# -----------------------------------------------------


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
    try:
        req = request.get_json()
        if req is None:
            return jsonify({"error": "Empty input"}), 400

        preds = predict_from_json(req)

        if not preds:
            return jsonify({"error": "Prediction failed"}), 500

        return jsonify({"predicted_yield": float(preds[0])})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
