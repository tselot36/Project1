import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';
import { FaUser, FaLock  } from "react-icons/fa";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8380/auth/generateToken', {
                username,
                password
            });
            const token = response.data; // Get the token from the response
            localStorage.setItem('token', token); // Store token in localStorage
            console.log('Token:', token); // Log the token for verification
            // Redirect to todo list page upon successful login
            // For example, you can use window.location.href or React Router history.push
            window.location.href = '/todos'; // Redirect to the todos page
        } catch (error) {
            setError('Invalid username or password.'); // Display error message
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    {/*<label htmlFor="username">Username:</label>*/}
                    <input type="text" placeholder="username" value={username}
                           onChange={(e) => setUsername(e.target.value)} required/>
                    <FaUser className='icon'/>
                </div>
                <div className="input-box">
                    {/*<label htmlFor="password">Password:</label>*/}
                    <input type="password" placeholder="password" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <FaLock className='icon'/>
                </div>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register"><a href="#">Register</a></Link></p>
                </div>
                <div className="remember-forgot">
                    <p>Forgot your password? <Link to="/forgot-password"><a href="#">Reset password</a></Link></p>
                </div>
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            {/*<p>Don't have an account? <Link to="/register">Register</Link></p>*/}
            {/*<p>Forgot your password? <Link to="/forgot-password">Reset Password</Link></p>*/}
        </div>
    );

    // return (
    //     <div className='wrapper'>
    //         <form action="">
    //             <h1>Login</h1>
    //             <div className="input-box">
    //                 <input type="text" placeholder='Username' required />
    //                 <FaUser className='icon' />
    //             </div>
    //             <div className="input-box">
    //                 <input type="password" placeholder='password' required />
    //                 <FaLock className='icon' />
    //             </div>
    //             <div className="remember-forgot">
    //                 <label><input type="checkbox"/>Remember me</label>
    //                 <a href="#">Forgot password?</a>
    //             </div>
    //
    //             <button type="submit">Login</button>
    //
    //             <div className="register-link">
    //                 <p>Don't have an account? <a href="#">Register</a> </p>
    //             </div>
    //         </form>
    //
    //     </div>
    // )
};

export default LoginForm;
