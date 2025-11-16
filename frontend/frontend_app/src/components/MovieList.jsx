




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import UpcomingFeaturedMovies from "./FeaturedMovies";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating); // full stars
  const halfStar = rating - fullStars >= 0.5; // half star if true
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={"full" + i} style={{ color: "#ff9900", fontSize: 16 }}>
        ★
      </span>
    );
  }
  if (halfStar) {
    stars.push(
      <span key="half" style={{ color: "#ff9900", fontSize: 16 }}>
        ☆
      </span>
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={"empty" + i} style={{ color: "#ccc", fontSize: 16 }}>
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
}

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchMovies = async (query) => {
    try {
      let url = "/movies/";
      if (query) url += `?search=${encodeURIComponent(query)}`;
      const res = await axios.get(url);
      setMovies(res.data);
    } catch {
      setMovies([]);
    }
  };

  const handleReview = async (movieId) => {
    if (!rating[movieId]) return alert("Please enter a rating between 1 and 5");
    try {
      await axios.post(
        `/movies/${movieId}/reviews/`,
        { rating: parseInt(rating[movieId]) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review submitted!");
      setRating({ ...rating, [movieId]: "" });
      fetchMovies(searchTerm);
    } catch {
      alert("Failed to submit review");
    }
  };

  const styles = {
    container: {
      backgroundColor:"#e5f1f1ff",
      minHeight: "100vh",
      // padding: "20px 60px 20px 60px",
      padding:"40px 100px",
      borderRadius:"30px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    movieCard: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      overflow: "hidden",
      height: "100%",
      cursor: "pointer",
      boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    },
    movieCardHover: {
      transform: "translateY(-6px)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
    },
    // posterWrapper: {
    //   width: "100%",
    //   height: 320,
    //   overflow: "hidden",
    //   borderTopLeftRadius: "0.5rem",
    //   borderTopRightRadius: "0.5rem",
    //   boxShadow: "inset 0 -15px 30px -15px rgba(0,0,0,0.25)",
    // },
    // poster: {
      // width: "100%",
      // height: "100%",
      // objectFit: "cover",
      // display: "block",
      // transition: "transform 0.3s ease",
    // },

   posterWrapper: {
  width: "100%",
  height: 320,
  backgroundColor: "#f0f0f0",
  overflow: "hidden",
  borderTopLeftRadius: "0.5rem",
  borderTopRightRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  borderRadius: "50%",
  justifyContent: "center",
  margin:"0.5%",
},


poster: {
  width: "100%",
  height: "100%",
  objectFit: "contain",    // FULL image visible
  objectPosition: "center",
  backgroundColor: "#f4f1f1ff",
   

  // IMPORTANT: prevent distortion, keep uniform fit
  maxWidth: "100%",
  maxHeight: "100%",
  display: "block",
  marginTop:"40px",
  padding:"30px",
borderRadius: "10rem",
  transition: "transform 0.3s ease",
},


    posterHover: {
      transform: "scale(1.05)",
    },
    cardBody: {
      flex: "1 1 auto",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    },
    title: {
      fontWeight: 600,
      fontSize: "1.25rem",
      marginBottom: "0.25rem",
    },
    genreDate: {
      fontStyle: "italic",
      color: "#6c757d",
      marginBottom: "0.5rem",
    },
    description: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginBottom: "0.75rem",
      color: "#444",
    },
    reviewsContainer: {
      marginTop: "auto",
      textAlign: "left",
    },
    buttonReview: {
      width: "100%",
      border: "1px solid #0d6efd",
      color: "#0d6efd",
      backgroundColor: "transparent",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
      borderRadius: "0.375rem",
      cursor: "pointer",
      padding: "0.375rem 0.75rem",
      transition: "background-color 0.15s ease-in-out, color 0.15s ease-in-out",
    },
  };

  return (
    <div style={styles.container}>
      <div className="d-flex mb-4">
        <input
          className="form-control me-2 shadow-sm"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search movies"
          style={{ fontSize: 16 }}
        />
      </div>

      {searchTerm.trim() === "" && <UpcomingFeaturedMovies />}

      {movies.length === 0 && searchTerm.trim() !== "" ? (
        <div className="alert alert-info" style={{ fontSize: 16, padding: 15 }}>
          No movies found
        </div>
      ) : (
        movies.length > 0 && (
          <div className="row g-4">
            <h2 className="mb-3">
              {searchTerm ? "🔍 Search Results" : "🎬 Review Movies"}
            </h2>
            {movies.map((m) => (
              <div key={m.id} className="col-12 col-sm-6 col-lg-4">
                <div
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    ...styles.movieCard,
                    ...(hoveredId === m.id ? styles.movieCardHover : {}),
                  }}
                >
                  <Link
                    to={`/movies/${m.id}`}
                    className="text-decoration-none text-dark"
                    aria-label={`View details of ${m.title}`}
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={styles.posterWrapper}
                      onMouseEnter={() => setHoveredId(m.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <img
                        src={
                          m.poster
                            ? m.poster.startsWith("http")
                              ? m.poster
                              : `http://localhost:8000${m.poster}`
                            : "/default-poster.jpg"
                        }
                        alt={`${m.title} poster`}
                        style={{
                          ...styles.poster,
                          ...(hoveredId === m.id ? styles.posterHover : {}),
                        }}
                      />
                    </div>
                    <div style={styles.cardBody}>
                      <h5 style={styles.title}>{m.title}</h5>
                      <StarRating rating={m.average_rating || 0} />
                      <p style={styles.genreDate}>
                        {m.genre} • {m.release_date}
                      </p>
                      {m.description && (
                        <p style={styles.description} title={m.description}>
                          {m.description}
                        </p>
                      )}
                      {token && (
                        <div style={styles.reviewsContainer}>
                          <button
                            style={styles.buttonReview}
                            onClick={() => handleReview(m.id)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#0d6efd";
                              e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "#0d6efd";
                            }}
                            aria-label={`Submit review for ${m.title}`}
                          >
                            Add Review
                          </button>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}




