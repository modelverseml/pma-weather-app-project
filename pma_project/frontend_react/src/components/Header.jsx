import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom mb-4">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          {username && (
            <span
              className={`nav-link ${isActive("/weather-records") ? "active fw-bold text-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/weather-records")}
            >
              🌦️ Weather Records
            </span>
          )}

          <span
            className={`nav-link ${isActive("/weather-api") ? "active fw-bold text-primary" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/weather-api")}
          >
            Weather API
          </span>
        </div>

        <ul className="navbar-nav ms-auto align-items-center">
          {username ? (
            <>
              <li className="nav-item me-3">
                <span className="nav-link text-dark">
                  Hello,&nbsp;<strong>{username}</strong>
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    localStorage.removeItem("username");
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/")}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
