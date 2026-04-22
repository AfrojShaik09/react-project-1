import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Button from "../components/common/Button";
import "./Navbar.css";

export function Navbar() {
  const { logout, role } = useAuth();
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);
  const [showActiveUsers, setShowActiveUsers] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowActiveUsers(false);
      setActiveUsers([]);
      setMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getActiveUsers");
      if (response.ok) {
        const users = await response.json();
        setActiveUsers(users);
        setShowActiveUsers(true);
      } else {
        console.error("Failed to fetch active users");
      }
    } catch (error) {
      console.error("Error fetching active users:", error);
    }
  };

  useEffect(() => {
    if (!role) {
      setActiveUsers([]);
      setShowActiveUsers(false);
    }
  }, [role]);

  const closeModal = () => {
    setShowActiveUsers(false);
    setActiveUsers([]);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link className="nav-brand" to="/">
            <i className="bi bi-shop"></i> Store
          </Link>

          <button
            className={`nav-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>

            <div className="nav-auth">
              {role ? (
                <div className="nav-dropdown">
                  <button className="nav-user">
                    <i className="bi bi-person"></i>
                    {role === "admin" ? "Admin" : "User"}
                  </button>
                  <div className="dropdown-menu">
                    {role === "admin" && (
                      <>
                        <Link
                          to="/admin/products"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <i className="bi bi-box"></i> Products
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="dropdown-btn"
                          onClick={fetchActiveUsers}
                        >
                          <i className="bi bi-people"></i> Active Users
                        </Button>
                        <hr />
                      </>
                    )}
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <i className="bi bi-person-check"></i> Profile
                    </Link>
                    <hr />
                    <Button
                      variant="outline"
                      size="sm"
                      className="dropdown-btn"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="nav-login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showActiveUsers && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Active Users</h3>
              <button className="modal-close" onClick={closeModal}>
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="modal-body">
              {activeUsers.length > 0 ? (
                <ul className="users-list">
                  {activeUsers.map((user, index) => (
                    <li key={index}>
                      <i className="bi bi-circle-fill"></i>
                      {user.username}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-users">No active users</p>
              )}
            </div>
            <div className="modal-footer">
              <Button variant="secondary" size="sm" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2026 Vehicle Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
