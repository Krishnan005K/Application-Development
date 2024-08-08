import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../assets/styles/Register.css';
import img from '../assets/images/reg img.png';
import axios from "axios";

function Register() {
    const apiUrl = 'http://127.0.0.1:8080/api/users';
    const [formData, setFormData] = useState({
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '' // Default role set to an empty string
    });
    const [errors, setErrors] = useState({
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '' // Add role error handling
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // if (!formData.firstname) {
        //     newErrors.firstname = 'Firstname is required';
        // }

        // if (!formData.email) {
        //     newErrors.email = 'Email is required';
        // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        //     newErrors.email = 'Email address is invalid';
        // }

        // if (!formData.password) {
        //     newErrors.password = 'Password is required';
        // } else if (formData.password.length < 6) {
        //     newErrors.password = 'Password must be at least 6 characters';
        // } else if (!/[a-zA-Z]/.test(formData.password)) {
        //     newErrors.password = 'Password must contain at least one alphabet';
        // }

        // if (!formData.confirmPassword) {
        //     newErrors.confirmPassword = 'Confirm Password is required';
        // } else if (formData.password !== formData.confirmPassword) {
        //     newErrors.confirmPassword = 'Passwords must match';
        // }

        // if (!formData.role) {
        //     newErrors.role = 'Role is required'; // Error handling for role
        // }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            console.log(formData);
            const newData = await axios.post(apiUrl, {
                id: 0,
                name: formData.firstname,
                email: formData.email,
                password: formData.password,
                roles: formData.role,
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })

        }
    };

    return (
        <div className="background-wrapper">
            <div className="login-container">
                <div className="whole">
                    <div className="left-half">
                        <img src={img} style={{ color: "#2f65ad" }} alt="register" />
                    </div>
                    <div className="right-half">
                        <form onSubmit={handleSubmit} className="login-form">
                            <h1>Register</h1>
                            <input
                                type="text"
                                placeholder="Username"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                            {errors.firstname && <p className="error">{errors.firstname}</p>}
                            <input
                                type="email"
                                placeholder="E-mail address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                            <input
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="ROLE_STUDENT">ROLE_STUDENT</option>
                                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                <option value="ROLE_MENTOR">ROLE_MENTOR</option>
                                <option value="ROLE_INTERVIEWER">ROLE_INTERVIEWER</option>
                                <option value="ROLE_HEAD">ROLE_HEAD</option>
                            </select>
                            {errors.role && <p className="error">{errors.role}</p>} {/* Display role error */}
                            <button type="submit">Sign Up</button>
                            <p>Have an account? <Link to='/login'>Sign In</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
