


import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    
    axios
      .get("users/me/")
      .then((res) => {
        setUser(res.data);
        return axios.get(`reviews/?user=${res.data.id}`);
      })
      .then(async (r) => {
        const rawReviews = r.data || [];

        
        const movieIds = new Set();
        const userIds = new Set();

        rawReviews.forEach((rv) => {
          
          if (rv.movie && (typeof rv.movie === "number" || /^[0-9]+$/.test(String(rv.movie)))) {
            movieIds.add(Number(rv.movie));
          }
          
          if (rv.user && (typeof rv.user === "number" || /^[0-9]+$/.test(String(rv.user)))) {
            userIds.add(Number(rv.user));
          }
        });

        
        const fetchByIds = async (ids, basePath) => {
          if (ids.size === 0) return {};
          
          const promises = Array.from(ids).map((id) =>
            axios
              .get(`${basePath}${id}/`)
              .then((res) => ({ id, data: res.data }))
              .catch(() => ({ id, data: null }))
          );
          const results = await Promise.all(promises);
          const map = {};
          results.forEach((r) => {
            if (r.data) map[r.id] = r.data;
          });
          return map;
        };

       
        const [movieMap, userMap] = await Promise.all([
          fetchByIds(movieIds, "movies/"),
          fetchByIds(userIds, "users/"),
        ]);

        
        const enriched = rawReviews.map((rv) => {
          let movieTitle = null;
          if (rv.movie) {
            if (typeof rv.movie === "object" && rv.movie.title) {
              movieTitle = rv.movie.title;
            } else if (movieMap[rv.movie]) {
              movieTitle = movieMap[rv.movie].title || String(movieMap[rv.movie].name || movieMap[rv.movie].title);
            } else if (typeof rv.movie === "string" || typeof rv.movie === "number") {
              
              movieTitle = `Movie #${rv.movie}`;
            }
          }

          let username = null;
          if (rv.user) {
            if (typeof rv.user === "object" && rv.user.username) {
              username = rv.user.username;
            } else if (userMap[rv.user]) {
              username = userMap[rv.user].username;
            } else if (user && user.username && rv.user === user.id) {
              
              username = user.username;
            } else {
              username = `${rv.user}`;
            }
          }

          return {
            ...rv,
            movie_title: movieTitle,
            username,
          };
        });

        setReviews(enriched);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !user) return <div style={{ padding: 20, fontSize: 18 }}>Loading...</div>;

  const containerStyle = {
    maxWidth: 900,
    margin: "20px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const headerStyle = {
    borderBottom: "2px solid #3399ff",
    paddingBottom: 8,
    marginBottom: 20,
    color: "#1a202c",
  };

  const infoStyle = {
    fontSize: 18,
    marginBottom: 12,
    color: "#2d3748",
  };

  const reviewsContainerStyle = {
    marginTop: 30,
  };

  const reviewCardStyle = {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
  };

  const reviewHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    flexWrap: "wrap",
    gap: 10,
    color: "#4a5568",
    fontWeight: 600,
  };

  const reviewContentStyle = {
    fontSize: 16,
    color: "#2d3748",
    marginBottom: 8,
    whiteSpace: "pre-wrap",
  };

  const ratingStyle = {
    fontWeight: 700,
    color: "#3182ce",
  };

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>{user.username}'s Profile</h3>
      <p style={infoStyle}>
        <strong>Email:</strong> {user.email}
      </p>
      <p style={infoStyle}>
        <strong>Role:</strong> {user.role || "User"}
      </p>

      <div style={reviewsContainerStyle}>
        <h5 style={{ color: "#2b6cb0", marginBottom: 12 }}>All Reviews</h5>
        {reviews.length === 0 && <p style={{ color: "#718096" }}>No reviews yet</p>}
        {reviews.map((rv) => (
          <div key={rv.id} style={reviewCardStyle}>
            <div style={reviewHeaderStyle}>
              <div>
                <strong>Movie:</strong> {rv.movie_title || (rv.movie && rv.movie.title) || `Movie #${rv.movie}`}
              </div>
              <div>
                <strong>User:</strong> {rv.username || (rv.user && rv.user.username) || `User #${rv.user}`}
              </div>
            </div>
            <div style={reviewContentStyle}>{rv.content}</div>
            <div style={ratingStyle}>Rating: {rv.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
