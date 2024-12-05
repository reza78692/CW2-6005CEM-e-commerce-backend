import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginFormPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = { username, password };

    axios
      .post('http://localhost:8000/api/login/', loginData)
      .then(response => {
        console.log('Full login response:', response.data); // Debug log to see full response

        setMessage('Login successful!');
        const accessToken = response.data.access_token;
        // Log the token received from the backend
        console.log('Access token received:', accessToken);
        localStorage.setItem('accessToken', accessToken); // Store token
        console.log('Token stored:', localStorage.getItem('accessToken')); // Debug log


        // Product Management session 
        const userRole = response.data.user.user_type; // Assuming this is where user role is in response
        localStorage.setItem('userRole', userRole);       // Store user role with consistent key
        console.log('User Role stored:', localStorage.getItem('userRole'));
        console.log('User Role:', userRole);
        // Check if the response contains these fields
        if (!accessToken || !userRole) {
          console.error('Login response is missing access token or user role');
          return;
      }


        window.location.reload(); // or use a navigation method if using a router
        navigate('/account'); // Redirect to Account page
      })
      .catch(error => {
        if (error.response) {
          setMessage('Error: ' + error.response.data.detail);
        } else if (error.request) {
          setMessage('Error: No response from the server');
        } else {
          setMessage('Error: ' + error.message);
        }
      });
  };

  const styles = {
    container: {
      width: '300px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      width: '100%',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Login
        </button>
      </form>
      <p>{message}</p>

      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginFormPage;




