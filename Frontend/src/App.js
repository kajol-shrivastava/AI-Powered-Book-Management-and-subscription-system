import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import LoginPage from "./Components/Login/Login";
import SmartSearchPage from "./pages/SmartSearch";
import ReviewsPage from "./pages/Review";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home/Home";
import DashboardSample from "./Components/Dashboard/Dashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import Plans from "./pages/Plan";
import BookLibrary from "./pages/BookLibrary/BookLibrary";
import ProtectedRoute from "./ProtectedRoute";


const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const contentStyle =
  location.pathname === "/"
    ? {}
    : {
        paddingTop: "70px",
        marginLeft: isSidebarOpen ? "20px" : "0",
        transition: "0.3s",
        paddingLeft: isSidebarOpen ? "220px" : "0px",
      };

  return (
    <div>
      {location.pathname !== "/" && (
        <>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Header toggleSidebar={toggleSidebar} />
        </>
      )}
      <div style={contentStyle}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute element={<Home/>} />}/>
          <Route path="/dashboard1" element={<ProtectedRoute element={<DashboardSample/>} />}/>
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard/>} />}/>
          <Route path="/review" element={<ProtectedRoute element={<ReviewsPage/>} />}/>
          <Route path="/smart-search" element={<ProtectedRoute element={<SmartSearchPage/>} />}/>
          <Route path="/plans" element={<ProtectedRoute element={<Plans/>} />}/>
          <Route path="/bookmark" element={<ProtectedRoute element={<BookLibrary/>} />}/>
          <Route path="/books/:bookId" element={<ProtectedRoute element={<BookDetails/>} />}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
