// src/GeolocationForm.js
import React, { useState } from "react";
import axios from "axios";
import "./GeolocationForm.css"; // لاستيراد أنماط CSS

const GeolocationForm = () => {
  const [address, setAddress] = useState("");
  const [geolocation, setGeolocation] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3001/geolocation", {
        address,
        email: email || undefined,
      });
      setGeolocation(response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="geolocation-container">
      <h1>Find Geolocation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Get Geolocation</button>
      </form>
      {geolocation && (
        <div className="geolocation-result">
          <h2>Geolocation Results</h2>
          <div className="geolocation-details">
            <div className="geo-item">
              <span className="geo-label">🌍 Latitude:</span>
              <span className="geo-value">{geolocation.lat}</span>
            </div>
            <div className="geo-item">
              <span className="geo-label">🧭 Longitude:</span>
              <span className="geo-value">{geolocation.lon}</span>
            </div>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GeolocationForm;
