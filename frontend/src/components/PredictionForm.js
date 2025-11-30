import React from "react";

const PredictionForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 700 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
        <div>
          <label>Crop</label><br />
          <input name="Crop" value={formData.Crop} onChange={handleChange} placeholder="eg. rice" required />
        </div>

        <div>
          <label>State</label><br />
          <input name="State" value={formData.State} onChange={handleChange} placeholder="eg. maharashtra" required />
        </div>

        <div>
          <label>Season</label><br />
          <input name="Season" value={formData.Season} onChange={handleChange} placeholder="kharif / rabi" required />
        </div>


        <div>
          <label>Annual_Rainfall (mm)</label><br />
          <input type="number" step="any" name="Annual_Rainfall" value={formData.Annual_Rainfall} onChange={handleChange} required />
        </div>

        <div>
          <label>Fertilizer</label><br />
          <input type="number" step="any" name="Fertilizer" value={formData.Fertilizer} onChange={handleChange} required />
        </div>

        <div>
          <label>Pesticide</label><br />
          <input type="number" step="any" name="Pesticide" value={formData.Pesticide} onChange={handleChange} required />
        </div>

      </div>

      <div style={{ marginTop: 12 }}>
        <button type="submit" style={{ padding: "8px 16px", background: "#2b7a0b", color: "white", border: "none", borderRadius: 6 }}>
          Predict Yield
        </button>
      </div>
    </form>
  );
};

export default PredictionForm;
