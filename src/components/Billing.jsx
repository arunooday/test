import React, { useState } from 'react';
import axios from 'axios';

const Billing = () => {
    const [items, setItems] = useState([{ name: '', price: '', quantity: '', gst: '' }]);
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = [...items];
        updatedItems[index][name] = value;
        setItems(updatedItems);
    };

    const handleAddItem = () => {
        setItems([...items, { name: '', price: '', quantity: '', gst: '' }]);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assuming you have token-based authentication
            const response = await axios.post('http://localhost:5000/api/billing/create-bill', 
                { 
                    items, 
                    customer_id: customerId, 
                    customer_name: customerName 
                }, 
                {
                    headers: { 'x-access-token': token }
                }
            );
            alert(response.data.message);
            setItems([{ name: '', price: '', quantity: '', gst: '' }]); // Reset items
            setCustomerId(''); // Reset customer ID
            setCustomerName(''); // Reset customer name
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
            alert('Error creating bill: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handlePrint = () => {
        const printContent = items.map((item) => (
            `Item Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, GST: ${item.gst}`
        )).join('\n');
        const finalBill = `Customer ID: ${customerId}\nCustomer Name: ${customerName}\n${printContent}`;
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<pre>' + finalBill + '</pre>');
        printWindow.document.close();
        printWindow.print();
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            border: '2px solid #4CAF50',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
        },
        input: {
            margin: '10px 0',
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '10px 15px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '5px',
            transition: 'background-color 0.3s ease',
        },
        itemContainer: {
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Billing System</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Customer ID"
                    onChange={(e) => setCustomerId(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Customer Name"
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={styles.input}
                    required
                />
                {items.map((item, index) => (
                    <div key={index} style={styles.itemContainer}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Item Name"
                            onChange={(e) => handleChange(e, index)}
                            style={styles.input}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            onChange={(e) => handleChange(e, index)}
                            style={styles.input}
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            onChange={(e) => handleChange(e, index)}
                            style={styles.input}
                            required
                        />
                        <input
                            type="number"
                            name="gst"
                            placeholder="GST"
                            onChange={(e) => handleChange(e, index)}
                            style={styles.input}
                            required
                        />
                        <button type="button" style={styles.button} onClick={() => handleRemoveItem(index)}>Remove Item</button>
                    </div>
                ))}
                <button type="button" style={styles.button} onClick={handleAddItem}>Add Item</button>
                <button type="submit" style={styles.button}>Submit</button>
                <button type="button" style={styles.button} onClick={handlePrint}>Print</button>
            </form>
        </div>
    );
};

export default Billing;
