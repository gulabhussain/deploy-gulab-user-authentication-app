import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Signup.css';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
        return handleError('name, email and password are required');
    }

    try {
        const url = `https://deploy-gulab-user-authentication-ap.vercel.app/auth/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupInfo)
        });

        const result = await response.json();
        
        if (!response.ok) {
            handleError(result.message || 'Signup failed');
            return;
        }

        handleSuccess(result.message || 'Signup successful');
        setTimeout(() => navigate('/login'), 1000);

    } catch (err) {
        handleError('Something went wrong');
        console.error(err);
    }
};

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h2>Create Account ✨</h2>
                <p className="subtitle">Signup to get started</p>

                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={signupInfo.name}
                            onChange={handleChange}
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={signupInfo.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={signupInfo.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="signup-btn">
                        Signup
                    </button>

                    <p className="login-text">
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>
                </form>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Signup;
