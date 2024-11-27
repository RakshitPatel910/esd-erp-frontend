import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css'

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 

    setIsAuthenticated(false);

    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>My Application</h2>
      </div>

      <div className="navbar-links">
        {
          isAuthenticated ? 
            <button onClick={() => handleLogout()} className="logout-button">Logout</button>
            :
            <></>
        }
      </div>
    </nav>
  );
}

export default Navbar;
