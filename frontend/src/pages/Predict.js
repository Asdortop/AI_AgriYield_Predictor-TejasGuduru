import React, { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import ResultCard from "../components/ResultCard";
import FeatureImportanceChart from "../components/FeatureImportanceChart";
import api from "../utils/api";

const Predict = () => {
  const [formData, setFormData] = useState({
    Crop: "",
    State: "",
    Season: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: ""
  });

  const [result, setResult] = useState(null);
  const [shapSummary, setShapSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await api.post("/predict_shap", formData);

      setResult(res.data.predicted_yield);

      const shap = res.data.shap || [];
      const summary = shap.map((s) => ({
        feature: s.feature,
        mean_abs_shap: Math.abs(s.shap_value || s.abs_shap || 0)
      }));

      setShapSummary(summary);
      localStorage.setItem("last_shap_summary", JSON.stringify(summary));

    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please check your input and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div className="text-center mb-3 slide-up">
        <h1 style={{ marginBottom: '0.5rem' }}>🌾 Crop Yield Predictor</h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#4a7c2c',
          fontWeight: 500
        }}>
          Predict agricultural yields using advanced machine learning
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid" style={{ marginTop: '2rem' }}>
        {/* Input Form Card */}
        <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
          <h2>📝 Enter Crop Details</h2>
          <p style={{
            color: '#666',
            marginBottom: '1.5rem',
            fontSize: '0.95rem'
          }}>
            Fill in the agricultural parameters below
          </p>
          <PredictionForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Results Card */}
        <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
          <h2>📊 Prediction Results</h2>

          {error && (
            <div className="error">
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          {loading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              gap: '1rem'
            }}>
              <div className="loading"></div>
              <p style={{ color: '#4a7c2c', fontWeight: 500 }}>
                Analyzing crop data...
              </p>
            </div>
          ) : (
            <ResultCard
              prediction={result}
              shap={shapSummary?.map(s => ({
                feature: s.feature,
                shap_value: s.mean_abs_shap
              }))}
            />
          )}

          {shapSummary && shapSummary.length > 0 && (
            <div className="mt-3 slide-up">
              <h3 style={{ marginBottom: '1rem' }}>
                🎯 Feature Importance Analysis
              </h3>
              <p style={{
                color: '#666',
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}>
                Factors that influenced this prediction
              </p>
              <FeatureImportanceChart summary={shapSummary} />
            </div>
          )}
        </div>
      </div>

      {/* Info Footer */}
      <div className="card mt-3 fade-in" style={{
        animationDelay: '0.3s',
        background: 'linear-gradient(135deg, #f5deb3 0%, #d4af37 20%, #f5deb3 100%)',
        textAlign: 'center'
      }}>
        <p style={{
          margin: 0,
          color: '#3e2723',
          fontWeight: 500,
          fontSize: '0.95rem'
        }}>
          💡 <strong>Tip:</strong> Our model achieves 88% R² accuracy with 12,411+ accurate predictions
        </p>
      </div>
    </div>
  );
};

export default Predict;
