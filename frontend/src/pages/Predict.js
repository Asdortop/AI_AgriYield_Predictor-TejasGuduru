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
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 300 }}>
        <h2>Predict Crop Yield</h2>
        <PredictionForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>

      <div style={{ flex: 1, minWidth: 300 }}>
        <h2>Result</h2>

        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

        {loading ? (
          <div>Loading...</div>
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
          <>
            <h3 style={{ marginTop: 20 }}>Feature Importance</h3>
            <FeatureImportanceChart summary={shapSummary} />
          </>
        )}
      </div>
    </div>
  );
};

export default Predict;

