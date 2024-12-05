

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/register/', { withCredentials: true })
            .then(response => {
                console.log('CSRF token retrieved');
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
            });
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();

        const registrationData = {
            username,
            email,
            password1: password,
            password2: confirmPassword,
            user_type: userType,
        };

        const csrfToken = getCookie('csrftoken');

        axios.post('http://localhost:8000/api/register/', registrationData, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
            withCredentials: true
        })
        .then(response => {
            setMessage('Registration successful!');
            console.log('Registration successful:', response.data);
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
        formContainer: {
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f8f8f8',
            border: '1px solid #ddd',
            borderRadius: '4px'
        },
        input: {
            width: '100%',
            padding: '8px',
            margin: '10px 0',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
        },
        label: {
            fontWeight: 'bold'
        }
    };

    return (
        <div style={styles.formContainer}>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <label style={styles.label}>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <br />

                <label style={styles.label}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <br />

                <label style={styles.label}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <br />

                <label style={styles.label}>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                />
                <br />

                <label style={styles.label}>Account Type:</label>
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    style={styles.input}
                >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                </select>
                <br />

                <button type="submit" style={styles.button}>Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

// Function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default Register;
