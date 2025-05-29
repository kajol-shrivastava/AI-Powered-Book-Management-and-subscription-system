// Header.js
import React from "react";
import './Header.css'
import { Link, useNavigate } from "react-router-dom";
const Header = ({ toggleSidebar }) => {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  };

  const navStyle = {
    display: "flex",
    gap: "15px",
  };
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <button style={hamburgerStyle} onClick={toggleSidebar}>
          &#9776;
        </button>
        <div className="logo">
Books4U      </div>
      </div>
      <nav style={navStyle}>
      
        <span onClick={handleLogout} style={linkStyle}>Logout</span>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background:"#7C2EA0" ,
  position:"fixed",
  width:"100%",
  boxSizing: "border-box",
height:"70px",
  padding: "10px 20px",
  color: "#fff",
  zIndex:"99"
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const hamburgerStyle = {
  fontSize: "24px",
  background: "none",
  border: "none",
  color: "#fff",
  cursor: "pointer",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

export default Header;
