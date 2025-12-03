import React from "react";

const Dashboard = () => {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        color: '#2d5016',
        marginBottom: '1rem'
      }}>
        📊 Dashboard
      </h2>
      <p style={{
        fontSize: '1.1rem',
        color: '#6b7280',
        marginBottom: '2rem'
      }}>
        Welcome to your crop yield prediction dashboard!
      </p>

      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,253,245,0.9) 100%)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(45, 80, 22, 0.16)',
        border: '1px solid rgba(74, 124, 44, 0.2)'
      }}>
        <p style={{ color: '#4a7c2c', fontSize: '1rem' }}>
          Use the <strong>Predict</strong> tab to make crop yield predictions using our advanced machine learning model.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
