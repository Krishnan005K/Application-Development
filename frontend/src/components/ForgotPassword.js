import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/styles/ForgotPassword.css';

function ForgotPassword() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const navigate = useNavigate(); // Hook for navigation programmatically

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        } else if (!/[a-zA-Z]/.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must contain at least one alphabet';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            console.log(formData);
            // Proceed with password reset logic, e.g., API call
            navigate("/"); // Navigate programmatically after successful form submission
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit} className="forgot-password-form">
 
                <input
                    type="password"
                    placeholder="Enter new password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                />
                {errors.newPassword && <p className="error">{errors.newPassword}</p>}


                <input
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button type="button" onClick={handleSubmit}>
                    Confirm
                </button>
                <p>Remembered your password? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default ForgotPassword;
