import React from "react";

const Navbar = () => {
  return (
    <nav style={{
      background: "#2b7a0b",
      color: "white",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ fontWeight: "bold", fontSize: 18 }}>SmartCrop — Yield Predictor</div>
      <div>
        <a style={{ color: "white", marginRight: 12 }} href="/">Predict</a>
        <a style={{ color: "white", marginRight: 12 }} href="/dashboard">Dashboard</a>
        <a style={{ color: "white" }} href="/about">About</a>
      </div>
    </nav>
  );
};

export default Navbar;
