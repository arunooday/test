import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Billing from './components/Billing';
import Home from './components/Home';
import CustomerDetails from './components/CustomerDetails';

const App = () => {
    return (
        <Router>
            <Routes>
              
               
                 <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />
        
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/customer-details" element={<CustomerDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
