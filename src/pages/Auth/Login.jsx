import React from 'react';
import '../../assets/styles/stylesPages/AuthStyles/Login.css';
import GoogleB from '../../components/AuthComponents/GoogleB';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-overlay">
                    <h2 className="login-subtitle">¡ Bienvenido de vuelta ! al</h2>
                    <h1 className="login-title">Gran Bazar</h1>
                </div>
            </div>

            <div className="login-right">
                <h2 className="login-welcome">Iniciar sesión</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className='em'>Correo electrónico: </label>
                        <input type="email" id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='ps'>Contraseña:</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="form-options">
                        <div>
                            <input type="checkbox" id="remember-me" />
                            <label  htmlFor="remember-me">Recordarme</label>
                        </div>
                        <a href="#" className="forgot-password">
                            Olvidaste tu contraseña?
                        </a>
                    </div>
                    <button type="submit" className="login-button">Iniciar sesión</button>
                    <GoogleB />
                    <p className="signup-text">
                        ¿No tienes una cuenta?<a href="/Register" className="signup-link"> Registrarse</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
