import React from 'react';
import '../../assets/styles/Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-overlay">
                    <h1 className="login-title">Blockchain</h1>
                    <h2 className="login-subtitle">Revolution in Advertising</h2>
                    <p className="login-features">LOW FEES · CENSORSHIP RESISTANT · AI READY</p>
                </div>
            </div>

            <div className="login-right">
                <h2 className="login-welcome">Hello!</h2>
                <p className="login-description">
                    Etiam pretium dapibus congue. Praesent a lorem erat. Morbi mollis posuere lacus, vel semper risus.
                </p>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="mtpiatek@gmail.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" />
                    </div>
                    <div className="form-options">
                        <div>
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                    <p className="signup-text">
                        Don’t have an account? <a href="#" className="signup-link">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
