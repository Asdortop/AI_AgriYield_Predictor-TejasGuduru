import React from "react";

const ResultCard = ({ prediction, shap }) => {
  return (
    <div style={{
      marginTop: 20,
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      maxWidth: 700,
      background: "white",
      color: "#222"
    }}>
      <h3>Predicted Yield</h3>
      <p style={{ fontSize: 28, margin: "8px 0" }}>{prediction ? prediction + " (units as trained)" : "—"}</p>

      {shap && shap.length > 0 && (
        <>
          <h4>Top contributing features (SHAP):</h4>
          <ul>
            {shap.map((s, i) => (
              <li key={i}>{s.feature}: {s.shap_value.toFixed(2)}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ResultCard;
