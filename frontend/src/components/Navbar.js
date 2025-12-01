import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkStyle = (path) => ({
    color: "white",
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '0.6rem 1.25rem',
    borderRadius: '10px',
    position: 'relative',
    display: 'inline-block',
    background: location.pathname === path ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
  });

  const NavLink = ({ to, icon, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Link
        to={to}
        style={navLinkStyle(to)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
        }}>
          {icon} {children}
        </span>
        <div style={{
          position: 'absolute',
          bottom: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isHovered ? '70%' : '0%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #fcd34d, transparent)',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '2px'
        }} />
      </Link>
    );
  };

  return (
    <nav className="fade-in-down" style={{
      background: scrolled
        ? 'rgba(45, 80, 22, 0.95)'
        : 'linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)',
      color: "white",
      padding: scrolled ? "0.75rem 2rem" : "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: scrolled
        ? '0 8px 32px rgba(45, 80, 22, 0.3)'
        : '0 4px 16px rgba(45, 80, 22, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Logo/Brand */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{
          fontWeight: "800",
          fontSize: scrolled ? '1.35rem' : '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontFamily: 'Poppins, sans-serif',
          color: 'white',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span style={{
            fontSize: scrolled ? '1.6rem' : '1.8rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            🌾
          </span>
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fcd34d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            AgriYield AI
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <NavLink to="/" icon="🎯">Predict</NavLink>
        <NavLink to="/dashboard" icon="📊">Dashboard</NavLink>
        <NavLink to="/about" icon="ℹ️">About</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
