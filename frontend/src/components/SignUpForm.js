// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Candidate'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', formData);
            console.log(response.data);
            // Redirect to login page or show success message
        } catch (error) {
            console.error(error.response.data);
            // Show error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="Candidate">Candidate</option>
                <option value="Interviewer">Interviewer</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
