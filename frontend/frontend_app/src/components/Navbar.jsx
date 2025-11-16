




import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username"); // if stored
    navigate("/login");
  };

  // Inline styles for navbar and buttons
  const styles = {
    navbar: {
      backgroundColor: "#343a40", // Bootstrap dark bg color
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      padding: "0.5rem 1rem",
      fontWeight: "500",
    },
    brand: {
      fontWeight: "700",
      fontSize: "1.5rem",
      color: "#f8f9fa",
      letterSpacing: "1.2px",
    },
    navLink: {
      color: "#f8f9fa",
      fontSize: "1rem",
      marginLeft: "0.8rem",
      transition: "color 0.3s",
      textDecoration: "none",
    },
    navLinkHover: {
      color: "#0d6efd",
    },
    btnLogout: {
      marginLeft: "1rem",
      borderColor: "#f8f9fa",
      color: "#f8f9fa",
      transition: "background-color 0.3s, color 0.3s",
    },
    btnLogoutHover: {
      backgroundColor: "#f8f9fa",
      color: "#343a40",
    },
  };

  
  const [hoveredLink, setHoveredLink] = React.useState(null);
  const [logoutHover, setLogoutHover] = React.useState(false);

  return (
    <nav style={styles.navbar} className="navbar navbar-expand-lg">
      <div className="container">
        <Link to="/" style={styles.brand} className="navbar-brand">
          MovieApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "#f8f9fa" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }} />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center" style={{ gap: "1rem", display: "flex" }}>
            <li className="nav-item">
              <Link
                to="/"
                style={{
                  ...styles.navLink,
                  ...(hoveredLink === "home" ? styles.navLinkHover : {}),
                }}
                onMouseEnter={() => setHoveredLink("home")}
                onMouseLeave={() => setHoveredLink(null)}
                className="nav-link"
              >
                Home
              </Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/profile"
                    style={{
                      ...styles.navLink,
                      ...(hoveredLink === "profile" ? styles.navLinkHover : {}),
                    }}
                    onMouseEnter={() => setHoveredLink("profile")}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="nav-link"
                  >
                    Profile
                  </Link>
                </li>
                {isAdmin() && (
                  <li className="nav-item">
                    <Link
                      to="/admin"
                      style={{
                        ...styles.navLink,
                        ...(hoveredLink === "admin" ? styles.navLinkHover : {}),
                      }}
                      onMouseEnter={() => setHoveredLink("admin")}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="nav-link"
                    >
                      Admin
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    style={{
                      ...styles.btnLogout,
                      ...(logoutHover ? styles.btnLogoutHover : {}),
                    }}
                    onMouseEnter={() => setLogoutHover(true)}
                    onMouseLeave={() => setLogoutHover(false)}
                    className="btn btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    style={{
                      ...styles.navLink,
                      ...(hoveredLink === "login" ? styles.navLinkHover : {}),
                    }}
                    onMouseEnter={() => setHoveredLink("login")}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="nav-link"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    style={{
                      ...styles.navLink,
                      ...(hoveredLink === "register" ? styles.navLinkHover : {}),
                    }}
                    onMouseEnter={() => setHoveredLink("register")}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="nav-link"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
