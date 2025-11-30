import React, { useEffect, useState } from "react";
import FeatureImportanceChart from "../components/FeatureImportanceChart";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem("last_shap_summary");
    if (s) {
      try {
        setSummary(JSON.parse(s));
      } catch (e) {
        setSummary(null);
      }
    }
  }, []);

  const clearSummary = () => {
    localStorage.removeItem("last_shap_summary");
    setSummary(null);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Shows last prediction's SHAP importance (saved locally).</p>

      {summary ? (
        <>
          <FeatureImportanceChart summary={summary} />
          <div style={{ marginTop: 12 }}>
            <button 
              onClick={clearSummary} 
              style={{ 
                padding: "8px 12px", 
                background: "#c0392b", 
                color: "white", 
                border: "none", 
                borderRadius: 6 
              }}
            >
              Clear saved SHAP
            </button>
          </div>
        </>
      ) : (
        <p>No saved SHAP summary found. Make a prediction first on the Predict page to populate this dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;

