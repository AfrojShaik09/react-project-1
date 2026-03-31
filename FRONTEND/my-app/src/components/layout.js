import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function Navbar() {
  const { logout, role } = useAuth();
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);
  const [showActiveUsers, setShowActiveUsers] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowActiveUsers(false);
      setActiveUsers([]);
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

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Vehicle Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {role && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {role === "admin" ? "Admin" : "User"}
                </a>
                <ul className="dropdown-menu">
                  {role === "admin" && (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/admin/products">
                          Products
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={fetchActiveUsers}
                        >
                          Active Users
                        </button>
                      </li>
                    </>
                  )}
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>

      {showActiveUsers && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Active Users</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowActiveUsers(false);
                    setActiveUsers([]);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {activeUsers.length > 0 ? (
                  <ul>
                    {activeUsers.map((user, index) => (
                      <li key={index}>{user.username}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No active users at the moment.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowActiveUsers(false);
                    setActiveUsers([]);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return <div className="text-center p-4 border-top">Vehicle Store</div>;
}
