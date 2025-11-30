import React from "react";
import Plot from "react-plotly.js";

const FeatureImportanceChart = ({ summary }) => {
  if (!summary) return null;
  const features = summary.map(s => s.feature).reverse();
  const values = summary.map(s => s.mean_abs_shap).reverse();
  return (
    <Plot
      data={[
        {
          type: "bar",
          x: values,
          y: features,
          orientation: "h"
        }
      ]}
      layout={{ title: "SHAP Feature Importance", margin: { l: 150 } }}
      style={{ width: "100%", height: "400px" }}
    />
  );
};

export default FeatureImportanceChart;
