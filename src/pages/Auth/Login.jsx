import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import '../../assets/styles/stylesPages/AuthStyles/Login.css';
import { auth } from '../../services/Api';
import { logIn } from '../../features/authSlice';
import themeManager from '../../utils/themeManager';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [validation, setValidation] = useState({
        emailValid: false,
        passwordValid: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        // Inicializar tema global
        themeManager.initialize();

        // Check if user is already logged in
        const savedAuthData = localStorage.getItem('authData');
        if (savedAuthData && !authData.isAuthenticated) {
            try {
                const parsedAuthData = JSON.parse(savedAuthData);
                if (parsedAuthData.token) {
                    dispatch(logIn({ ...parsedAuthData.user, token: parsedAuthData.token }));
                    navigate('/Home');
                }
            } catch (error) {
                console.error('Error parsing auth data from localStorage:', error);
                localStorage.removeItem('authData');
            }
        }
    }, [authData, dispatch, navigate]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: inputValue
        }));

        // Validate in real-time
        if (name === 'email') {
            setValidation(prev => ({
                ...prev,
                emailValid: validateEmail(value)
            }));
        } else if (name === 'password') {
            setValidation(prev => ({
                ...prev,
                passwordValid: value.length >= 8
            }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        const { email, password } = formData;
        const { emailValid, passwordValid } = validation;

        if (!email || !password) {
            Swal.fire({
                title: 'Campos vacíos',
                text: 'Todos los campos deben ser llenados',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        if (!emailValid) {
            Swal.fire({
                title: 'Correo inválido',
                text: 'Por favor ingresa un correo electrónico válido',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        if (!passwordValid) {
            Swal.fire({
                title: 'Contraseña corta',
                text: 'La contraseña debe tener al menos 8 caracteres',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await auth(email, password);
            const { token, user } = response;

            // Save to Redux
            dispatch(logIn({ ...user, token }));

            // Save to localStorage if remember me is checked
            if (formData.rememberMe) {
                const authDataToSave = { token, user };
                localStorage.setItem("authData", JSON.stringify(authDataToSave));
            }

            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
                confirmButtonColor: '#5D5FEF'
            });

            navigate('/Home');
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'Ha ocurrido un error al iniciar sesión',
                icon: 'error',
                confirmButtonColor: '#5D5FEF'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            className="login-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="login-left">
                <div className="login-overlay">
                    <motion.div variants={itemVariants}>
                        <h2 className="login-subtitle">¡Bienvenido de vuelta al</h2>
                        <h1 className="login-title">Gran Bazar!</h1>
                        <p className="login-description">Tu destino para encontrar todo lo que necesitas</p>
                    </motion.div>
                </div>
            </div>

            <motion.div className="login-right" variants={itemVariants}>
                <div className="login-header">
                    <FiUser className="login-icon" />
                    <h2 className="login-welcome">Iniciar sesión</h2>
                    <p className="login-prompt">Ingresa tus credenciales para continuar</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <motion.div className="form-group" variants={itemVariants}>
                        <label htmlFor="email">Correo electrónico</label>
                        <div className="input-container">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="email"
                                placeholder="ejemplo@correo.com"
                                className={validation.emailValid && formData.email ? "valid-input" : ""}
                            />
                            {validation.emailValid && formData.email && <span className="valid-check">✓</span>}
                        </div>
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-container">
                            <FiLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className={validation.passwordValid && formData.password ? "valid-input" : ""}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                                tabIndex="-1"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                            {validation.passwordValid && formData.password && <span className="valid-check">✓</span>}
                        </div>
                    </motion.div>

                    <motion.div className="form-options" variants={itemVariants}>
                        <div className="remember-container">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="rememberMe" className="remember-label">Recordarme</label>
                        </div>
                        <Link to="/reset-password" className="forgot-password">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </motion.div>

                    <motion.button
                        type="submit"
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                        variants={itemVariants}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </motion.button>

                    <motion.p className="signup-text" variants={itemVariants}>
                        ¿No tienes una cuenta? <Link to="/Register" className="signup-link">Regístrate ahora</Link>
                    </motion.p>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Login;