import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)',
      color: "white",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: '0 4px 16px rgba(45, 80, 22, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      {/* Logo/Brand */}
      <div style={{
        fontWeight: "700",
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🌾</span>
        <span>AgriYield AI</span>
      </div>

      {/* Navigation Links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          🎯 Predict
        </Link>

        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/about"
          style={{
            color: "white",
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ℹ️ About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
