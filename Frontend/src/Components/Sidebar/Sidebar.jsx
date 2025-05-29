import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { BsAmd } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const sidebarLinkStyle = {
    color: "#000",
    textDecoration: "none",
    padding: "8px 0",
    marginBlock: "2px",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
  };

  const activeLinkStyle = {
    ...sidebarLinkStyle,
    background: "#7C2EA0",
    color: "#fff",
    borderRadius: "4px",
  };

  return (
    <div
      style={{
        width: isOpen ? "200px" : "0",
        height: "100vh",
        marginTop: "70px",
        color: "#fff",
        overflowX: "hidden",
        position: "fixed",
        top: "0",
        borderRight: "2px solid #ccc",
        left: "0",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        padding: isOpen ? "20px" : "0",
        // zIndex: "999",
      }}
    >
      {isOpen && (
        <>
          <Link
            to="/home"
            style={
              location.pathname === "/home"
                ? activeLinkStyle
                : sidebarLinkStyle
            }
          >
            <FaHome style={{ marginInline: "10px" }} /> Home
          </Link>

          <Link
            to="/dashboard"
            style={
              location.pathname === "/dashboard" ? activeLinkStyle : sidebarLinkStyle
            }
          >
            <IoDocumentText style={{ marginInline: "10px" }} /> Dashboard
          </Link>



           <Link
            to="/smart-search"
            style={
              location.pathname === "/smart-search"
                ? activeLinkStyle
                : sidebarLinkStyle
            }
          >
            <IoSearchCircleSharp  style={{ marginInline: "10px" }} /> Smart Search
          </Link>

          

           <Link
            to="/review"
            style={
              location.pathname === "/review"
                ? activeLinkStyle
                : sidebarLinkStyle
            }
          >
            <MdRateReview style={{ marginInline: "10px" }} /> My Reviews
          </Link>

           <Link
            to="/plans"
            style={
              location.pathname === "/plans"
                ? activeLinkStyle
                : sidebarLinkStyle
            }
          >
            <BsAmd   style={{ marginInline: "10px" }} /> Plans
          </Link>
          

           <Link
            to="/bookmark"
            style={
              location.pathname === "/bookmark"
                ? activeLinkStyle
                : sidebarLinkStyle
            }
          >
            <FaBookmark  style={{ marginInline: "10px" }} /> Book Mark
          </Link>

        </>
      )}
    </div>
  );
};

export default Sidebar;
