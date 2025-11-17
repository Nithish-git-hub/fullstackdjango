


import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed successfully with ${email}`);
      setEmail("");
    }
  };

  const styles = {
    footer: {
      backgroundColor: "#1a1a1a",
      color: "#fff",
      padding: "40px 20px 20px 20px",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "30px",
      maxWidth: "1200px",
      margin: "auto",
    },
    column: {
      flex: 1,
      minWidth: "220px",
    },
    heading: {
      fontSize: "18px",
      marginBottom: "15px",
      color: "#ff6347",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    listItem: {
      marginBottom: "10px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    newsletterForm: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
    },
    button: {
      padding: "10px",
      border: "none",
      backgroundColor: "#ff6347",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    socialIcons: {
      display: "flex",
      gap: "15px",
      marginTop: "10px",
      fontSize: "24px",
    },
    footerBottom: {
      textAlign: "center",
      marginTop: "30px",
      borderTop: "1px solid #333",
      paddingTop: "15px",
      fontSize: "14px",
      color: "#aaa",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Quick Links */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            {["Home", "Movies", "Profile", "Admin"].map((item) => (
              <li key={item} style={styles.listItem}>
                <a
                  href={`/${item.toLowerCase()}`}
                  style={styles.link}
                  onMouseOver={(e) => (e.target.style.color = "#ff6347")}
                  onMouseOut={(e) => (e.target.style.color = "#fff")}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Subscribe to our MovieApp</h4>
          <form onSubmit={handleSubscribe} style={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#ff4500")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6347")}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact & Social */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p>Email: support@movieapp.com</p>
          <p>Phone: +91 63020 67890</p>
          <div style={styles.socialIcons}>
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                style={{ color: "#fff", transition: "color 0.3s, transform 0.3s" }}
                onMouseOver={(e) => {
                  e.target.style.color = "#ff6347";
                  e.target.style.transform = "scale(1.2)";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#fff";
                  e.target.style.transform = "scale(1)";
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.footerBottom}>
        &copy; {new Date().getFullYear()} MovieApp. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

