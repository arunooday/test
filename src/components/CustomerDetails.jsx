// src/components/CustomerDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerDetails = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customer data from the backend
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customers');
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();
    }, []);

    // Inline CSS styles
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
        },
        customerList: {
            listStyleType: 'none',
            padding: '0',
            marginTop: '20px',
        },
        customerItem: {
            padding: '10px',
            borderBottom: '1px solid #ccc',
        },
    };

    return (
        <div style={styles.container}>
            <h1>Customer Details</h1>
            <ul style={styles.customerList}>
                {customers.map(customer => (
                    <li key={customer.id} style={styles.customerItem}>
                        <strong>Name:</strong> {customer.name}<br />
                        <strong>Phone:</strong> {customer.phone_number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerDetails;
