import React from "react";

const ResultCard = ({ prediction, shap }) => {
  return (
    <div>
      {prediction ? (
        <div className="fade-in">
          {/* Prediction Value */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
            border: '2px solid #90ee90',
            boxShadow: '0 4px 16px rgba(74, 124, 44, 0.15)'
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: '#2d5016',
              fontWeight: 600,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Predicted Yield
            </p>
            <div className="result-value">
              {prediction.toFixed(2)}
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: '#4a7c2c',
              marginTop: '0.5rem'
            }}>
              tons/hectare
            </p>
          </div>

          {/* SHAP Features */}
          {shap && shap.length > 0 && (
            <div>
              <h4 style={{
                marginBottom: '1rem',
                color: '#2d5016',
                fontSize: '1rem'
              }}>
                🔍 Top Contributing Factors
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {shap.slice(0, 5).map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fdf5 100%)',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                    className="feature-badge"
                  >
                    <span style={{
                      fontWeight: 500,
                      color: '#2d5016',
                      fontSize: '0.9rem'
                    }}>
                      {s.feature}
                    </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #f5deb3 0%, #d4af37 100%)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#3e2723'
                    }}>
                      {Math.abs(s.shap_value).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          color: '#999'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌾</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#666' }}>
            Enter crop details and click predict
          </p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Get AI-powered yield predictions instantly
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
