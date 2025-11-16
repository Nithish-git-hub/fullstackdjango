// import React, { useState } from "react";
// import axios from "../../utils/axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({ username: "", email: "", password: "", password2: "", role: "user" });
//   const [errors, setErrors] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("register/", form);
//       alert("Registered — login now");
//       navigate("/login");
//     } catch (err) {
//       setErrors(err.response?.data || { error: "Registration failed" });
//     }
//   };

//   return (
//     <div className="row justify-content-center mt-5">
//       <div className="col-md-7 col-lg-5">
//         <div className="card shadow">
//           <div className="card-body">
//             <h4 className="card-title mb-3">Register</h4>
//             <form onSubmit={handleSubmit}>
//               <input name="username" placeholder="Username" onChange={handleChange} className="form-control mb-2" required />
//               <input name="email" type="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" required />
//               <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" required />
//               <input name="password2" type="password" placeholder="Confirm Password" onChange={handleChange} className="form-control mb-2" required />
//               <select name="role" value={form.role} onChange={handleChange} className="form-select mb-3">
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//               {errors && <pre className="text-danger small">{JSON.stringify(errors, null, 2)}</pre>}
//               <button className="btn btn-success w-100">Register</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "user",
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("register/", form);
      alert("Registered — login now");
      navigate("/login");
    } catch (err) {
      setErrors(err.response?.data || { error: "Registration failed" });
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1470&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
      position: "relative",
      overflow: "hidden",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 0,
    },
    card: {
      zIndex: 1,
      maxWidth: 450,
      width: "100%",
      padding: "30px 25px",
      borderRadius: 12,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      marginBottom: 24,
      textAlign: "center",
      color: "#2d3748",
      fontSize: "1.75rem",
      fontWeight: 700,
      letterSpacing: "0.05em",
    },
    errorBox: {
      whiteSpace: "pre-wrap",
      backgroundColor: "#ffe6e6",
      padding: "10px 15px",
      borderRadius: 6,
      marginBottom: 15,
      color: "#b00020",
      fontSize: 13,
      fontFamily: "monospace",
      overflowX: "auto",
    },
    input: {
      padding: "12px 14px",
      fontSize: 16,
      borderRadius: 8,
      border: "1.5px solid #cbd5e0",
      marginBottom: 15,
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
      transition: "border-color 0.3s",
    },
    select: {
      marginBottom: 20,
      padding: "10px 14px",
      fontSize: 16,
      borderRadius: 8,
      border: "1.5px solid #cbd5e0",
      outline: "none",
      width: "100%",
      transition: "border-color 0.3s",
    },
    button: {
      width: "100%",
      padding: "14px",
      fontSize: 18,
      fontWeight: 700,
      borderRadius: 10,
      border: "none",
      backgroundColor: "#2b6cb0",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  // Optional: Handle focus styling (not required but nice)
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.overlay} />
      <div style={styles.card}>
        <h4 style={styles.title}>Register</h4>
        <form onSubmit={handleSubmit} noValidate>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === "username" ? { borderColor: "#3182ce", boxShadow: "0 0 6px rgba(66,153,225,0.6)" } : {}),
            }}
            onFocus={() => setFocusedInput("username")}
            onBlur={() => setFocusedInput(null)}
            autoComplete="username"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === "email" ? { borderColor: "#3182ce", boxShadow: "0 0 6px rgba(66,153,225,0.6)" } : {}),
            }}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            autoComplete="email"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === "password" ? { borderColor: "#3182ce", boxShadow: "0 0 6px rgba(66,153,225,0.6)" } : {}),
            }}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            autoComplete="new-password"
          />
          <input
            name="password2"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === "password2" ? { borderColor: "#3182ce", boxShadow: "0 0 6px rgba(66,153,225,0.6)" } : {}),
            }}
            onFocus={() => setFocusedInput("password2")}
            onBlur={() => setFocusedInput(null)}
            autoComplete="new-password"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors && <pre style={styles.errorBox}>{JSON.stringify(errors, null, 2)}</pre>}
          <button
            className="btn"
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2c5282")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2b6cb0")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

