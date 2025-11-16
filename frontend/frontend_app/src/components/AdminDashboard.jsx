


import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { isAdmin } from "../utils/auth";

const styles = {
  container: {
    maxWidth: 960,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textShadow: "0 1px 3px rgba(0,0,0,0.15)",
  },
  searchWrapper: {
    boxShadow: "0 0 8px rgba(0, 123, 255, 0.25)",
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 16,
    borderRadius: 8,
    borderColor: "#0d6efd",
    transition: "border-color 0.3s",
  },
  searchInputFocus: {
    borderColor: "#0a58ca",
    boxShadow: "0 0 5px #0a58ca",
  },
  card: {
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    overflow: "hidden",
    cursor: "default",
  },
  cardHover: {
    boxShadow: "0 8px 40px rgba(13,110,253,0.3)",
    transform: "translateY(-6px)",
  },
  cardImgWrapper: {
    position: "relative",
    overflow: "hidden",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 250,
  },
  cardImg: {
    width: "95%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    display: "block",
    padding: "10px 30px 10px 40px",
    borderRadius: "4rem",
  },
  cardImgOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(13,110,253,0.15)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  btn: {
    borderRadius: 8,
    padding: "8px 14px",
    fontWeight: 600,
    transition: "background-color 0.3s ease",
  },
  btnPrimary: {
    backgroundColor: "#0d6efd",
    borderColor: "#0d6efd",
  },
  btnPrimaryHover: {
    backgroundColor: "#0a58ca",
    borderColor: "#0a58ca",
  },
  btnWarning: {
    backgroundColor: "#ffc107",
    borderColor: "#ffc107",
    color: "#212529",
  },
  btnWarningHover: {
    backgroundColor: "#e0a800",
    borderColor: "#d39e00",
  },
  btnDanger: {
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
  },
  btnDangerHover: {
    backgroundColor: "#b02a37",
    borderColor: "#842029",
  },
};

export default function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    genre: "",
    release_date: "",
    description: "",
    poster: ""
  });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!isAdmin()) {
      alert("You must be an admin to access this page.");
      return;
    }
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("/movies/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Normalize each movie so string fields are never undefined/null
      const normalized = (Array.isArray(res.data) ? res.data : []).map((m) => ({
        id: m.id,
        title: m.title ?? "",
        director: m.director ?? "",
        genre: m.genre ?? "",
        release_date: m.release_date ?? "",
        description: m.description ?? "",
        poster: m.poster ?? "",
        // keep any other fields
        ...m,
      }));

      setMovies(normalized);
    } catch (err) {
      alert("Failed to fetch movies");
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newMovie.title || !newMovie.director || !newMovie.genre) {
      alert("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/movies/", newMovie, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // normalize returned movie
      const added = {
        id: res.data.id,
        title: res.data.title ?? "",
        director: res.data.director ?? "",
        genre: res.data.genre ?? "",
        release_date: res.data.release_date ?? "",
        description: res.data.description ?? "",
        poster: res.data.poster ?? "",
        ...res.data,
      };

      setMovies([...movies, added]);
      setNewMovie({ title: "", director: "", genre: "", release_date: "", description: "", poster: "" });
    } catch (err) {
      alert("Failed to add movie");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await axios.delete(`/movies/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(movies.filter((m) => m.id !== id));
    } catch (err) {
      alert("Failed to delete movie");
      console.error(err);
    }
  };

  const startEdit = (movie) => setEditing({ ...movie });

  const saveEdit = async () => {
    if (!editing) return;
    try {
      setLoading(true);
      await axios.put(`/movies/${editing.id}/`, editing, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure normalized update
      const updated = {
        ...editing,
        title: editing.title ?? "",
        director: editing.director ?? "",
        genre: editing.genre ?? "",
        release_date: editing.release_date ?? "",
        description: editing.description ?? "",
        poster: editing.poster ?? "",
      };

      setMovies(movies.map((m) => (m.id === editing.id ? updated : m)));
      setEditing(null);
    } catch (err) {
      alert("Failed to update movie");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Defensive search: fallback to empty strings before calling toLowerCase()
  const q = (search || "").toLowerCase();
  const filteredMovies = movies.filter((m) => {
    const title = (m?.title || "").toLowerCase();
    const director = (m?.director || "").toLowerCase();
    const genre = (m?.genre || "").toLowerCase();
    return title.includes(q) || director.includes(q) || genre.includes(q);
  });

  return (
    <div className="container py-4" style={styles.container}>
      <h2 className="mb-4 text-center fw-bold text-primary display-6" style={styles.header}>
        🎬 Admin Dashboard
      </h2>

      {/* Search Bar */}
      <div className="input-group mb-5 shadow-sm" style={styles.searchWrapper}>
        <span className="input-group-text bg-primary text-white" style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, director, or genre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            ...styles.searchInput,
            ...(searchFocused ? styles.searchInputFocus : {}),
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Add Movie Form (hidden if searching) */}
      {isAdmin() && !search && (
        <div className="card mb-5" style={{ ...styles.card, padding: "1.5rem" }}>
          <h5 className="text-secondary mb-4 fw-semibold">Add New Movie</h5>
          <form onSubmit={handleAdd}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  required
                  style={{ borderRadius: 8 }}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Director"
                  value={newMovie.director}
                  onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
                  required
                  style={{ borderRadius: 8 }}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Genre"
                  value={newMovie.genre}
                  onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                  required
                  style={{ borderRadius: 8 }}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control"
                  value={newMovie.release_date}
                  onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
                  style={{ borderRadius: 8 }}
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  rows={3}
                  value={newMovie.description}
                  onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                  style={{ borderRadius: 8 }}
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Poster URL"
                  value={newMovie.poster || ""}
                  onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
                  style={{ borderRadius: 8 }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-4 fw-semibold"
              disabled={loading}
              style={{ borderRadius: 8, padding: "10px 0", fontSize: 18 }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = "#0a58ca"}
              onMouseOut={e => e.currentTarget.style.backgroundColor = "#0d6efd"}
            >
              {loading ? "Adding..." : "Add Movie"}
            </button>
          </form>
        </div>
      )}

      {/* Movie List */}
      {filteredMovies.length === 0 ? (
        <div className="alert alert-info text-center p-4 shadow-sm rounded-3">
          No movies found
        </div>
      ) : (
        <div className="row g-4">
          {filteredMovies.map((m) => (
            <div className="col-md-6" key={m.id}>
              <div
                className="card h-100"
                style={styles.card}
                onMouseEnter={e => {
                  Object.assign(e.currentTarget.style, styles.cardHover);
                }}
                onMouseLeave={e => {
                  Object.assign(e.currentTarget.style, styles.card);
                }}
              >
                {(m.poster || "").trim() !== "" && (
                  <div style={styles.cardImgWrapper}>
                    <img
                      src={m.poster}
                      alt={m.title || ""}
                      style={styles.cardImg}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div style={styles.cardImgOverlay}></div>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold" style={{ textShadow: "0 0 3px rgba(13,110,253,0.4)" }}>
                    {m.title || "Untitled"}
                  </h5>
                  <p className="small text-muted mb-1">
                    {(m.genre || "Unknown")} — {(m.director || "Unknown")}
                  </p>
                  <p className="text-muted small">{m.release_date || ""}</p>
                  <p className="card-text">{m.description || ""}</p>
                </div>
                {isAdmin() && (
                  <div className="card-footer bg-white border-0 d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      style={{ borderRadius: 8, padding: "6px 10px", fontWeight: 600 }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = "#e0a800"}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = "#ffc107"}
                      onClick={() => startEdit(m)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ borderRadius: 8, padding: "6px 10px", fontWeight: 600 }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = "#b02a37"}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = "#dc3545"}
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          onClick={() => setEditing(null)}
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            transition: "opacity 0.3s ease"
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ borderRadius: 16, boxShadow: "0 0 25px rgba(0,0,0,0.25)" }}>
              <div className="modal-header bg-primary text-white rounded-top p-3">
                <h5 className="modal-title">Edit Movie</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setEditing(null)} />
              </div>
              <div className="modal-body p-4">
                <input
                  className="form-control mb-3"
                  value={editing.title ?? ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="Title"
                  style={{ borderRadius: 8 }}
                />
                <input
                  className="form-control mb-3"
                  value={editing.director ?? ""}
                  onChange={(e) => setEditing({ ...editing, director: e.target.value })}
                  placeholder="Director"
                  style={{ borderRadius: 8 }}
                />
                <input
                  className="form-control mb-3"
                  value={editing.genre ?? ""}
                  onChange={(e) => setEditing({ ...editing, genre: e.target.value })}
                  placeholder="Genre"
                  style={{ borderRadius: 8 }}
                />
                <input
                  type="date"
                  className="form-control mb-3"
                  value={editing.release_date ?? ""}
                  onChange={(e) => setEditing({ ...editing, release_date: e.target.value })}
                  style={{ borderRadius: 8 }}
                />
                <textarea
                  className="form-control mb-3"
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  placeholder="Description"
                  rows={3}
                  style={{ borderRadius: 8 }}
                />
              </div>
              <div className="modal-footer p-3">
                <button className="btn btn-secondary" style={{ borderRadius: 8, padding: "8px 16px" }} onClick={() => setEditing(null)}>Cancel</button>
                <button
                  className="btn btn-primary fw-semibold"
                  onClick={saveEdit}
                  disabled={loading}
                  style={{ borderRadius: 8, padding: "8px 16px" }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = "#0a58ca"}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = "#0d6efd"}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





