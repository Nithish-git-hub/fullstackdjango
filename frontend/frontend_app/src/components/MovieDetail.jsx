import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  // Editing states
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(5);

  const token = localStorage.getItem("token");

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`movies/${id}/`);
      setMovie(res.data);
    } catch (err) {
      console.error("fetchMovie error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitReview = async () => {
    if (!token) return alert("Please login to add review");
    if (!content || content.trim().length === 0) return alert("Please add review content.");
    try {
      await axios.post(
        "reviews/",
        { movie: id, content, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent("");
      setRating(5);
      fetchMovie();
    } catch (err) {
      console.error("submitReview error", err);
      if (err.response?.status === 401) alert("Please login to add review");
      else alert("Could not add review.");
    }
  };

  const deleteReview = async (reviewId) => {
    if (!token) return alert("Please login");
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`reviews/${reviewId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovie();
    } catch (err) {
      console.error("deleteReview error", err);
      alert("Could not delete review.");
    }
  };

  const startEdit = (r) => {
    setEditingReviewId(r.id);
    setEditContent(r.content);
    setEditRating(r.rating);
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditContent("");
    setEditRating(5);
  };

  const submitEdit = async () => {
    if (!token) return alert("Please login");
    if (!editContent || editContent.trim().length === 0) return alert("Please add review content.");
    try {
      await axios.put(
        `reviews/${editingReviewId}/`,
        { content: editContent, rating: editRating, movie: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      cancelEdit();
      fetchMovie();
    } catch (err) {
      console.error("submitEdit error", err);
      if (err.response?.status === 403) alert("Not authorized to edit this review.");
      else alert("Could not update review.");
    }
  };

  if (loading || !movie)
    return <div style={{ padding: "20px", fontSize: "18px" }}>Loading...</div>;

  // Generate rating counts for 1–5 stars
  const getRatingData = () => {
    if (!movie.reviews) return [0, 0, 0, 0, 0];
    const counts = [0, 0, 0, 0, 0];
    movie.reviews.forEach((r) => counts[r.rating - 1]++);
    return counts;
  };

  const ratingCounts = getRatingData();

  const chartData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Number of Reviews",
        data: ratingCounts,
        backgroundColor: [
          "#dc3545",
          "#fd7e14",
          "#ffc107",
          "#0d6efd",
          "#198754",
        ],
        maxBarThickness: 35,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 13 } },
      },
      title: {
        display: true,
        text: "Review Ratings Distribution",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Reviews" },
        grid: { drawBorder: false, display: false },
      },
      x: {
        title: { display: true, text: "Rating" },
        grid: { drawBorder: false, display: false, barPercentage: 0.7, categoryPercentage: 0.8 },
      },
    },
  };

  return (
    <div
      className="card p-4 shadow"
      style={{
        maxWidth: 700,
        margin: "20px auto",
        borderRadius: 10,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3 className="mb-3" style={{ fontWeight: 700, color: "#3366cc" }}>
        {movie.title}
      </h3>

      <p style={{ fontSize: 16, color: "#555555", whiteSpace: "pre-wrap" }}>
        {movie.description}
      </p>

      <p style={{ fontWeight: 600, fontSize: 17, color: "#222222" }}>
        Average Rating: <span style={{ color: "#ff9900" }}>{movie.average_rating}</span>
      </p>

      <h5
        className="mt-4 mb-3"
        style={{
          color: "#334455",
          borderBottom: "2px solid #ccc",
          paddingBottom: 5,
        }}
      >
        Reviews
      </h5>

      {movie.reviews && movie.reviews.length > 0 ? (
        movie.reviews.map((r) => (
          <div
            key={r.id}
            className="border rounded p-3 mb-3"
            style={{ backgroundColor: "#fafafa", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }}
          >
            <div style={{ marginBottom: 6, fontWeight: 600, color: "#444", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <strong>{r.user}</strong> • Rating: <span style={{ color: "#ff9900" }}>{r.rating}</span>
              </div>

              {/* Edit/Delete buttons shown only when backend set r.can_modify true */}
              {token &&  (
                <div>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => startEdit(r)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteReview(r.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* inline edit UI */}
            {editingReviewId === r.id ? (
              <div style={{ marginTop: 8 }}>
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="d-flex align-items-center mb-2">
                  <select
                    className="form-select me-2"
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    style={{ maxWidth: 120 }}
                  >
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1 ? "s" : ""}</option>)}
                  </select>
                  <button className="btn btn-primary me-2" onClick={submitEdit}>Save</button>
                  <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ whiteSpace: "pre-wrap", fontSize: 15, color: "#333" }}>
                {r.content}
              </div>
            )}
          </div>
        ))
      ) : (
        <p style={{ fontStyle: "italic", color: "#777" }}>No reviews yet</p>
      )}

      {movie.reviews && movie.reviews.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <Bar data={chartData} options={chartOptions} height={250} />
        </div>
      )}

      {token && (
        <div className="mt-4">
          <h6 style={{ fontWeight: 600, color: "#3366cc", marginBottom: 10 }}>Add Review</h6>
          <textarea
            className="form-control mb-3"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your review..."
            style={{ fontSize: 15, borderRadius: 6, borderColor: "#ccc" }}
          />
          <select
            className="form-select mb-3 w-auto"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{ fontSize: 15, maxWidth: 120 }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={submitReview} style={{ fontSize: 16, padding: "10px 20px", fontWeight: 600 }}>
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}





