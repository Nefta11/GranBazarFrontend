import React from 'react';
import '../../assets/styles/stylesPages/AuthStyles/Register.css';

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-left">
                <h2 className="register-welcome">Regístrate</h2>
                <form className="register-form">
                    <div className="form-group">
                        <label htmlFor="first_name" className='fn'>Nombre:</label>
                        <input type="text" id="first_name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name" className='ln'>Apellido:</label>
                        <input type="text" id="last_name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className='em'>Correo electrónico:</label>
                        <input type="email" id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className='ph'>Teléfono:</label>
                        <input type="text" id="phone" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday" className='bd'>Fecha de nacimiento:</label>
                        <input type="date" id="birthday" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='ps'>Contraseña:</label>
                        <input type="password" id="password" />
                    </div>
                    <button type="submit" className="register-button">Registrarse</button>
                    <p className="login-text">
                        ¿Ya tienes una cuenta? <a href="/Login" className="login-link">Inicia sesión</a>
                    </p>
                </form>
            </div>

            <div className="register-right">
                <div className="register-overlay">
                    <h2 className="register-subtitle">¡Únete al</h2>
                    <h1 className="register-title">Gran Bazar!</h1>
                </div>
            </div>
        </div>
    );
};

export default Register;
