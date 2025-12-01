import React from "react";
import CustomDropdown from "./CustomDropdown";

const PredictionForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Dropdown options from dataset
  const states = [
    "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh",
    "delhi", "goa", "gujarat", "haryana", "himachal pradesh", "jammu and kashmir",
    "jharkhand", "karnataka", "kerala", "madhya pradesh", "maharashtra", "manipur",
    "meghalaya", "mizoram", "nagaland", "odisha", "puducherry", "punjab", "sikkim",
    "tamil nadu", "telangana", "tripura", "uttar pradesh", "uttarakhand", "west bengal"
  ];

  const crops = [
    "arecanut", "arhar/tur", "bajra", "banana", "barley", "black pepper", "cardamom",
    "cashewnut", "castor seed", "coconut", "coriander", "cotton(lint)", "cowpea(lobia)",
    "dry chillies", "garlic", "ginger", "gram", "groundnut", "guar seed", "horse-gram",
    "jowar", "jute", "khesari", "linseed", "maize", "masoor", "mesta", "moong(green gram)",
    "moth", "niger seed", "oilseeds total", "onion", "other cereals", "other kharif pulses",
    "other oilseeds", "other rabi pulses", "other summer pulses", "peas & beans (pulses)",
    "potato", "ragi", "rapeseed &mustard", "rice", "safflower", "sannhamp", "sesamum",
    "small millets", "soyabean", "sugarcane", "sunflower", "sweet potato", "tapioca",
    "tobacco", "turmeric", "urad", "wheat"
  ];

  const seasons = ["autumn", "kharif", "rabi", "summer", "whole year", "winter"];

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: '2rem' }}>

        {/* Crop */}
        <div className="fade-in-up delay-1">
          <CustomDropdown
            fieldName="Crop"
            label="Crop Type"
            icon="🌾"
            options={crops}
            value={formData.Crop}
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <div className="fade-in-up delay-2">
          <CustomDropdown
            fieldName="State"
            label="State"
            icon="📍"
            options={states}
            value={formData.State}
            onChange={handleChange}
          />
        </div>

        {/* Season */}
        <div className="fade-in-up delay-3">
          <CustomDropdown
            fieldName="Season"
            label="Season"
            icon="🌤️"
            options={seasons}
            value={formData.Season}
            onChange={handleChange}
          />
        </div>

        {/* Annual Rainfall */}
        <div className="fade-in-up delay-4">
          <label>🌧️ Annual Rainfall (mm)</label>
          <div className="living-input-container">
            <input
              className="living-input"
              type="number"
              step="any"
              name="Annual_Rainfall"
              value={formData.Annual_Rainfall}
              onChange={handleChange}
              placeholder="e.g., 1000"
              required
            />
          </div>
        </div>

        {/* Fertilizer */}
        <div className="fade-in-up delay-5">
          <label>🧪 Fertilizer (kg/hectare)</label>
          <div className="living-input-container">
            <input
              className="living-input"
              type="number"
              step="any"
              name="Fertilizer"
              value={formData.Fertilizer}
              onChange={handleChange}
              placeholder="e.g., 120"
              required
            />
          </div>
        </div>

        {/* Pesticide */}
        <div className="fade-in-up delay-5">
          <label>🛡️ Pesticide (kg/hectare)</label>
          <div className="living-input-container">
            <input
              className="living-input"
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

      </div>

      {/* Submit Button */}
      <div style={{ marginTop: '3rem' }} className="fade-in-up delay-5">
        <button
          type="submit"
          className="magnetic-btn"
          style={{
            width: '100%',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '18px',
            background: 'linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)',
            border: 'none',
            borderRadius: '16px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(45, 80, 22, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(45, 80, 22, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(45, 80, 22, 0.3)';
          }}
        >
          🚀 Predict Crop Yield
        </button>
      </div>

      {/* Helper Text */}
      <p style={{
        marginTop: '1.5rem',
        fontSize: '0.9rem',
        color: '#6b7280',
        textAlign: 'center',
        fontStyle: 'italic',
        opacity: 0.8
      }} className="fade-in delay-5">
        💡 All fields are required for accurate predictions
      </p>
    </form>
  );
};

export default PredictionForm;
