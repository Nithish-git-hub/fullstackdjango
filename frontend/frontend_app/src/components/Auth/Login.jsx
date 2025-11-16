
// import React, { useState } from "react";
// import axios from "../../utils/axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("token/", form);
//       localStorage.setItem("token", res.data.access);
//       // Fetch current user data to set role properly
//       const userRes = await axios.get("users/me/");
//       const user = userRes.data;
//       localStorage.setItem("role", user.role || "user");
//       setError("");
//       navigate("/");
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="row justify-content-center mt-5">
//       <div className="col-md-6">
//         <div className="card shadow">
//           <div className="card-body">
//             <h4 className="card-title mb-3">Login</h4>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <input name="username" value={form.username} onChange={handleChange} className="form-control" placeholder="Username" required />
//               </div>
//               <div className="mb-3">
//                 <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Password" required />
//               </div>
//               {error && <div className="alert alert-danger">{error}</div>}
//               <button className="btn btn-primary w-100">Login</button>
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

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("token/", form);
      localStorage.setItem("token", res.data.access);
      // Fetch current user data to set role properly
      const userRes = await axios.get("users/me/");
      const user = userRes.data;
      localStorage.setItem("role", user.role || "user");
      setError("");
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", padding: "15px" }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 10,
          padding: "30px 25px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
        }}
      >
        <h4 className="card-title mb-4 text-center text-primary" style={{ fontWeight: "700", fontSize: "1.8rem" }}>
          Login
        </h4>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Username"
              required
              style={{ fontSize: 16, padding: "12px 15px", borderRadius: 6, borderColor: "#ced4da" }}
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
              required
              style={{ fontSize: 16, padding: "12px 15px", borderRadius: 6, borderColor: "#ced4da" }}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="alert alert-danger py-2" role="alert" style={{ fontSize: 14, marginBottom: 20 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ fontSize: 18, fontWeight: 600, padding: "12px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

