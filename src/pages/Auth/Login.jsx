import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/styles/stylesPages/AuthStyles/Login.css';
import GoogleB from '../../components/AuthComponents/GoogleB';
import { auth } from '../../services/Api';  // Aquí importas la API de autenticación
import { logIn } from '../../features/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
    }, [authData, dispatch]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailValid(validateEmail(value));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordValid(value.length >= 8);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            Swal.fire('Error', 'Todos los campos deben ser llenados', 'error');
            return;
        }
        if (!emailValid) {
            Swal.fire('Error', 'El correo electrónico no es válido', 'error');
            return;
        }
        if (!passwordValid) {
            Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres', 'error');
            return;
        }
        try {
            const response = await auth(email, password); // Aquí se usa la API que importaste

            // Extrae el token de los headers y lo agrega a la respuesta
            const { token, user } = response;

            // Ahora pasa el token junto con los datos del usuario al dispatch
            dispatch(logIn({ ...user, token }));

            // Guarda el token y los datos del usuario en el localStorage
            localStorage.setItem("tokenUser", JSON.stringify({ token, user }));

            Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
            navigate('/Home');
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-overlay">
                    <h2 className="login-subtitle">¡ Bienvenido de vuelta al</h2>
                    <h1 className="login-title">Gran Bazar !</h1>
                </div>
            </div>

            <div className="login-right">
                <h2 className="login-welcome">Iniciar sesión</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className='em'>Correo electrónico: </label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} autoComplete="email" />
                        {emailValid && <span className="valid-check">✔️</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='ps'>Contraseña:</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} autoComplete="current-password" />
                        {passwordValid && <span className="valid-check">✔️</span>}
                    </div>
                    <div className="form-options">
                        <div>
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Recordarme</label>
                        </div>
                        <Link to="#" className="forgot-password">
                            Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <button type="submit" className="login-button">Iniciar sesión</button>
                    { /* <GoogleB />*/}
                    <p className="signup-text">
                        ¿No tienes una cuenta?<Link to="/Register" className="signup-link"> Registrarse</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
