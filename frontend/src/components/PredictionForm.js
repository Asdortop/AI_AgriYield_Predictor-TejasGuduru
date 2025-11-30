import React from "react";

const PredictionForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: '1.25rem' }}>

        {/* Crop */}
        <div>
          <label>🌾 Crop Type</label>
          <input
            name="Crop"
            value={formData.Crop}
            onChange={handleChange}
            placeholder="e.g., Rice, Wheat"
            required
          />
        </div>

        {/* State */}
        <div>
          <label>📍 State</label>
          <input
            name="State"
            value={formData.State}
            onChange={handleChange}
            placeholder="e.g., Maharashtra"
            required
          />
        </div>

        {/* Season */}
        <div>
          <label>🌤️ Season</label>
          <input
            name="Season"
            value={formData.Season}
            onChange={handleChange}
            placeholder="Kharif / Rabi / Whole Year"
            required
          />
        </div>

        {/* Annual Rainfall */}
        <div>
          <label>🌧️ Annual Rainfall (mm)</label>
          <input
            type="number"
            step="any"
            name="Annual_Rainfall"
            value={formData.Annual_Rainfall}
            onChange={handleChange}
            placeholder="e.g., 1000"
            required
          />
        </div>

        {/* Fertilizer */}
        <div>
          <label>🧪 Fertilizer (kg/hectare)</label>
          <input
            type="number"
            step="any"
            name="Fertilizer"
            value={formData.Fertilizer}
            onChange={handleChange}
            placeholder="e.g., 120"
            required
          />
        </div>

        {/* Pesticide */}
        <div>
          <label>🛡️ Pesticide (kg/hectare)</label>
          <input
            type="number"
            step="any"
            name="Pesticide"
            value={formData.Pesticide}
            onChange={handleChange}
            placeholder="e.g., 0.5"
            required
          />
        </div>

      </div>

      {/* Submit Button */}
      <div style={{ marginTop: '2rem' }}>
        <button
          type="submit"
          style={{
            width: '100%',
            fontSize: '1.05rem',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}
        >
          🚀 Predict Crop Yield
        </button>
      </div>

      {/* Helper Text */}
      <p style={{
        marginTop: '1rem',
        fontSize: '0.85rem',
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        💡 All fields are required for accurate predictions
      </p>
    </form>
  );
};

export default PredictionForm;
