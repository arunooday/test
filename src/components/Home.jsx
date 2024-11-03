import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    // Inline CSS styles
    const styles = {
        container: {
            textAlign: 'center',
            margin: '50px auto',
            padding: '20px',
            border: '2px solid #4CAF50',
            borderRadius: '10px',
            maxWidth: '600px', // Set maximum width for the container
            width: '100%', // Use full width of the page
            backgroundColor: '#f9f9f9',
        },
        heading: {
            color: '#4CAF50',
        },
        button: {
            margin: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
        fullWidth: {
            width: '100vw', // Full viewport width
            position: 'relative', // To help with positioning if needed
        }
    };

    // Handlers for button clicks
    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div style={{ ...styles.container, ...styles.fullWidth }}>
            <h1 style={styles.heading}>Welcome to the Billing System</h1>
            <p>Please log in or register:</p>
            <button
                style={styles.button}
                onClick={handleLogin}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
                Log In
            </button>
            <button
                style={styles.button}
                onClick={handleRegister}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
                Register
            </button>
        </div>
    );
};

export default Home;
