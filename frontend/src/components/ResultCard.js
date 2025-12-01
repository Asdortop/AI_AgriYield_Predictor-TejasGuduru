import React, { useEffect, useState } from "react";

const ResultCard = ({ prediction, shap }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prediction) {
      setIsVisible(true);

      // Animate number counting
      const duration = 1500;
      const steps = 60;
      const increment = prediction / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;

        if (step >= steps) {
          setDisplayValue(prediction);
          clearInterval(timer);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [prediction]);

  return (
    <div>
      {prediction ? (
        <div className={`fade-in-up ${isVisible ? '' : ''}`}>
          {/* Main Result Card */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,253,245,0.9) 100%)',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 12px 48px rgba(45, 80, 22, 0.2)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid rgba(134, 239, 172, 0.3)',
            marginBottom: '2rem'
          }}>
            {/* Animated background glow */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(134, 239, 172, 0.15) 0%, transparent 70%)',
              animation: 'rotate 10s linear infinite',
              pointerEvents: 'none'
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontSize: '1.1rem',
                color: '#4a7c2c',
                fontWeight: 600,
                marginBottom: '1rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                🌾 Predicted Yield
              </div>

              <div className="result-value" style={{
                fontSize: '4rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #2d5016 0%, #4a7c2c 50%, #86efac 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '1.5rem 0',
                letterSpacing: '-2px'
              }}>
                {displayValue.toFixed(2)}
              </div>

              <div style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                fontWeight: 500,
                marginBottom: '2rem'
              }}>
                tons/hectare
              </div>

              {/* Success indicator */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                borderRadius: '12px',
                color: '#22543d',
                fontWeight: 600,
                fontSize: '0.9rem',
                boxShadow: '0 4px 16px rgba(45, 80, 22, 0.12)'
              }}>
                <span style={{ fontSize: '1.2rem' }}>✓</span>
                Prediction Complete
              </div>
            </div>
          </div>

          {/* SHAP Features */}
          {shap && shap.length > 0 && (
            <div className="fade-in-up delay-2" style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,253,245,0.9) 100%)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(45, 80, 22, 0.16)',
              border: '1px solid rgba(74, 124, 44, 0.2)'
            }}>
              <h4 style={{
                marginBottom: '1.5rem',
                color: '#2d5016',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
                📊 Top Contributing Factors
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {shap.slice(0, 5).map((s, i) => (
                  <div
                    key={i}
                    className="fade-in-up"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem 1.25rem',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(45, 80, 22, 0.08)',
                      transition: 'all 0.3s ease',
                      animationDelay: `${i * 0.1}s`,
                      border: '1px solid rgba(74, 124, 44, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(45, 80, 22, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 80, 22, 0.08)';
                    }}
                  >
                    <span style={{
                      fontWeight: 500,
                      color: '#4a7c2c',
                      fontSize: '0.95rem'
                    }}>
                      {s.feature}
                    </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #f5deb3 0%, #d4af37 100%)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#3e2723',
                      boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3)'
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
        <div className="fade-in" style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(248,253,245,0.6) 100%)',
          borderRadius: '24px',
          border: '2px dashed rgba(74, 124, 44, 0.3)'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
            animation: 'bounce 2s ease-in-out infinite'
          }}>
            🌾
          </div>
          <p style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#2d5016',
            marginBottom: '0.5rem'
          }}>
            Ready to Predict
          </p>
          <p style={{
            fontSize: '0.95rem',
            color: '#6b7280'
          }}>
            Enter crop details and click predict to get AI-powered yield predictions
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
