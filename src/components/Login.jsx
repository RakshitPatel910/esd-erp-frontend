import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Replace with your actual login API endpoint
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });

      console.log(response);

      const { token } = response.data; // Assuming the backend returns a token
      localStorage.setItem('authToken', response.data || " "); // Store the token in localStorage
      onLogin(); // Notify the parent component about successful login

      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password'); // Display error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
