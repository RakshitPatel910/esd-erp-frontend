import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import './navbar.css'

function Navbar() {
  const navigate = useNavigate();  // Initialize the navigate function

  // Handle logout
  const handleLogout = () => {
    // Clear authentication data (for example, JWT token from localStorage)
    localStorage.removeItem('authToken');  // Assuming the token is stored in localStorage

    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>My Application</h2>
      </div>

      <div className="navbar-links">
        {/* Other links */}
        <a href="/home">Home</a>
        <a href="/profile">Profile</a>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
