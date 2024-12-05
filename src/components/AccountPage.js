import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // Adjust this path based on actual location

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log('Retrieved token:', token); // Debug log

        const fetchUserProfile = async () => {
            if (!token) {
                setError('No token found. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
                return;
            }

            try {
                console.log('Token used in request:', token); // Debug log
                const response = await axios.get("http://localhost:8000/api/account/", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('User profile data:', response.data); // Debug log
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError(error.response ? error.response.data.detail : 'Failed to fetch account data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);
    // Logout function
    const handleLogout = () => {
        const token = localStorage.getItem('accessToken');
        
        axios.post('http://localhost:8000/api/logout/', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Logout successful:', response.data);
            localStorage.removeItem('accessToken'); // Clear the token
            navigate('/login'); // Redirect to login page
        })
        .catch(error => {
            console.error('Error during logout:', error);
            setError('Failed to log out. Please try again.');
        });
    };


    if (loading) return <div>Loading...</div>;

    if (error) {
        return (
            <div className="error-message">
                {error}
                <LoginForm /> {/* Render LoginForm if there's an error */}
            </div>
        );
    }

    if (!user) {
        return <LoginForm />; // Render LoginForm if user data is not found
    }

    return (
        <div className="account-page">
            <h1>Account Information</h1>
            <div className="account-details">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phone_number}</p>
                <p><strong>User Type:</strong> {user.user_type}</p>
                <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Logout
            </button>
            </div>
        </div>
    );
};

export default AccountPage;









