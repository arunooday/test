import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ phone_number: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error message for the current field on change
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        const phonePattern = /^\d{10}$/; // Example: 10 digit phone number
        if (!phonePattern.test(formData.phone_number)) {
            newErrors.phone_number = 'Phone number must be 10 digits.';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Login failed. Please check your credentials.');
        }
    };

    // Inline CSS styles
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '50px auto',
            padding: '20px',
            border: '2px solid #4CAF50',
            borderRadius: '10px',
            maxWidth: '400px',
            backgroundColor: '#f9f9f9',
        },
        input: {
            margin: '10px 0',
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '10px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '100%',
        },
        error: {
            color: 'red',
            fontSize: '12px',
            marginTop: '-8px',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number (10 digits)"
                    style={styles.input}
                    onChange={handleChange}
                    required
                />
                {errors.phone_number && <div style={styles.error}>{errors.phone_number}</div>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={styles.input}
                    onChange={handleChange}
                    required
                />
                {errors.password && <div style={styles.error}>{errors.password}</div>}
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default Login;
