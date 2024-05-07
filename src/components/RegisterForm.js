import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8380/auth/addNewUser', {
                name,
                email,
                password,
                roles
            });
            console.log(response.data); // Handle successful registration
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
            <div className="container">
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="text"/>
                    </div>
                    <div className="input">
                        <img src={email_icon} alt=""/>
                        <input type="email"/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password"/>
                    </div>
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="text"/>
                    </div>
                </div>
                <div className="submit-container">
                    <form onSubmit={handleSubmit}>
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <Link to="/loginform">Login</Link></p>
                </div>
            </div>

    );
};

export default RegisterForm;
