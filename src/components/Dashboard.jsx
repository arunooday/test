import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Dummy data for customer search (you can replace this with actual data)
    const customers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
        { id: 4, name: 'Bob Brown' },
    ];

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Inline CSS styles
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
        },
        navbar: {
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px',
            backgroundColor: '#4CAF50',
            borderRadius: '5px',
            marginBottom: '20px',
        },
        navLink: {
            color: 'white',
            textDecoration: 'none',
            fontSize: '18px',
            padding: '10px 15px',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
        },
        searchContainer: {
            marginBottom: '20px',
        },
        searchInput: {
            padding: '10px',
            width: '70%',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
        },
        searchButton: {
            padding: '10px 20px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        customerList: {
            listStyleType: 'none',
            padding: '0',
        },
        customerItem: {
            padding: '10px',
            borderBottom: '1px solid #ccc',
        },
    };

    return (
        <div style={styles.container}>
            <h1>Billing Dashboard</h1>
            <div style={styles.navbar}>
                <Link to="/billing" style={styles.navLink}>Billing</Link>
                <Link to="/customer-details" style={styles.navLink}>Customer Details</Link>
            </div>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search for customers..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
                <button style={styles.searchButton}>Search</button>
            </div>
            <h2>Customer List</h2>
            <ul style={styles.customerList}>
                {filteredCustomers.map(customer => (
                    <li key={customer.id} style={styles.customerItem}>
                        {customer.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
