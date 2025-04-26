import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCalendar, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import '../../assets/styles/stylesPages/AuthStyles/Register.css';
import { register } from '../../services/Api';
import { format } from 'date-fns';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        password: '',
        confirmPassword: ''
    });

    const [validation, setValidation] = useState({
        firstNameValid: false,
        lastNameValid: false,
        emailValid: false,
        phoneValid: false,
        birthdayValid: false,
        passwordValid: false,
        confirmPasswordValid: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^\d{10}$/;
        return re.test(phone);
    };

    const validateBirthday = (birthday) => {
        if (!birthday) return false;

        const birthdayDate = new Date(birthday);
        const today = new Date();
        const minAgeDate = new Date();
        minAgeDate.setFullYear(today.getFullYear() - 18); // Minimum age of 18

        return birthdayDate <= minAgeDate;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate in real-time
        switch (name) {
            case 'firstName':
                setValidation(prev => ({
                    ...prev,
                    firstNameValid: value.trim().length >= 2
                }));
                break;
            case 'lastName':
                setValidation(prev => ({
                    ...prev,
                    lastNameValid: value.trim().length >= 2
                }));
                break;
            case 'email':
                setValidation(prev => ({
                    ...prev,
                    emailValid: validateEmail(value)
                }));
                break;
            case 'phone':
                setValidation(prev => ({
                    ...prev,
                    phoneValid: validatePhone(value)
                }));
                break;
            case 'birthday':
                setValidation(prev => ({
                    ...prev,
                    birthdayValid: validateBirthday(value)
                }));
                break;
            case 'password': {
                const passwordValid = value.length >= 8;
                setValidation(prev => ({
                    ...prev,
                    passwordValid,
                    confirmPasswordValid: passwordValid && value === formData.confirmPassword
                }));
                break;
            }
            case 'confirmPassword':
                setValidation(prev => ({
                    ...prev,
                    confirmPasswordValid: formData.password.length >= 8 && value === formData.password
                }));
                break;
            default:
                break;
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        const {
            firstName, lastName, email, phone, birthday, password, confirmPassword
        } = formData;

        const {
            firstNameValid, lastNameValid, emailValid, phoneValid,
            birthdayValid, passwordValid, confirmPasswordValid
        } = validation;

        // Check if all fields are filled
        if (!firstName || !lastName || !email || !phone || !birthday || !password || !confirmPassword) {
            Swal.fire({
                title: 'Campos vacíos',
                text: 'Todos los campos son obligatorios',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        // Check if all validations pass
        if (!firstNameValid) {
            Swal.fire({
                title: 'Nombre inválido',
                text: 'El nombre debe tener al menos 2 caracteres',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        if (!lastNameValid) {
            Swal.fire({
                title: 'Apellido inválido',
                text: 'El apellido debe tener al menos 2 caracteres',
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

        if (!phoneValid) {
            Swal.fire({
                title: 'Teléfono inválido',
                text: 'El teléfono debe tener 10 dígitos numéricos',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        if (!birthdayValid) {
            Swal.fire({
                title: 'Fecha de nacimiento inválida',
                text: 'Debes ser mayor de 18 años para registrarte',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        if (!passwordValid) {
            Swal.fire({
                title: 'Contraseña insegura',
                text: 'La contraseña debe tener al menos 8 caracteres',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        if (!confirmPasswordValid) {
            Swal.fire({
                title: 'Las contraseñas no coinciden',
                text: 'Por favor verifica que las contraseñas sean iguales',
                icon: 'warning',
                confirmButtonColor: '#5D5FEF'
            });
            return;
        }

        try {
            setIsLoading(true);

            // Llamada a la API para registrar al usuario
            const userData = {
                name: firstName,
                last_name: lastName,
                email,
                phone,
                birthday: format(new Date(birthday), 'dd/MM/yyyy'), // Formatear la fecha al formato esperado por la API
                password
            };

            console.log('Datos enviados a la API:', userData); // Agregar un console.log para verificar los datos enviados

            await register(userData);

            Swal.fire({
                title: '¡Registro exitoso!',
                text: 'Tu cuenta ha sido creada correctamente',
                icon: 'success',
                confirmButtonColor: '#5D5FEF'
            });
            navigate('/');

        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'Ha ocurrido un error al registrarte',
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
                staggerChildren: 0.1
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
            className="register-container no-scroll"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="register-left">
                <motion.div className="register-header" variants={itemVariants}>
                    <FiUser className="register-icon" />
                    <h2 className="register-welcome">Crea tu cuenta</h2>
                    <p className="register-prompt">Completa tus datos para unirte a Gran Bazar</p>
                </motion.div>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <motion.div className="form-group" variants={itemVariants}>
                            <label htmlFor="firstName">Nombre</label>
                            <div className="input-container">
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Tu nombre"
                                    className={validation.firstNameValid && formData.firstName ? "valid-input" : ""}
                                />
                                {validation.firstNameValid && formData.firstName && <span className="valid-check">✓</span>}
                            </div>
                        </motion.div>

                        <motion.div className="form-group" variants={itemVariants}>
                            <label htmlFor="lastName">Apellido</label>
                            <div className="input-container">
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Tu apellido"
                                    className={validation.lastNameValid && formData.lastName ? "valid-input" : ""}
                                />
                                {validation.lastNameValid && formData.lastName && <span className="valid-check">✓</span>}
                            </div>
                        </motion.div>
                    </div>

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
                                placeholder="ejemplo@correo.com"
                                className={validation.emailValid && formData.email ? "valid-input" : ""}
                            />
                            {validation.emailValid && formData.email && <span className="valid-check">✓</span>}
                        </div>
                    </motion.div>

                    <div className="form-row">
                        <motion.div className="form-group" variants={itemVariants}>
                            <label htmlFor="phone">Teléfono</label>
                            <div className="input-container">
                                <FiPhone className="input-icon" />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="1234567890"
                                    className={validation.phoneValid && formData.phone ? "valid-input" : ""}
                                />
                                {validation.phoneValid && formData.phone && <span className="valid-check">✓</span>}
                            </div>
                        </motion.div>

                        <motion.div className="form-group" variants={itemVariants}>
                            <label htmlFor="birthday">Fecha de nacimiento</label>
                            <div className="input-container">
                                <FiCalendar className="input-icon" />
                                <input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleInputChange}
                                    className={validation.birthdayValid && formData.birthday ? "valid-input" : ""}
                                />
                                {validation.birthdayValid && formData.birthday && <span className="valid-check">✓</span>}
                            </div>
                        </motion.div>
                    </div>

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
                                placeholder="Mínimo 8 caracteres"
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

                    <motion.div className="form-group" variants={itemVariants}>
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <div className="input-container">
                            <FiLock className="input-icon" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Repite tu contraseña"
                                className={validation.confirmPasswordValid && formData.confirmPassword ? "valid-input" : ""}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={toggleConfirmPasswordVisibility}
                                tabIndex="-1"
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                            {validation.confirmPasswordValid && formData.confirmPassword && <span className="valid-check">✓</span>}
                        </div>
                    </motion.div>

                    <motion.button
                        type="submit"
                        className={`register-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                        variants={itemVariants}
                    >
                        {isLoading ? 'Registrando...' : 'Crear cuenta'}
                    </motion.button>

                    <motion.p className="login-text" variants={itemVariants}>
                        ¿Ya tienes una cuenta? <Link to="/" className="login-link">Iniciar sesión</Link>
                    </motion.p>
                </form>
            </div>

            <div className="register-right">
                <div className="register-overlay">
                    <motion.div variants={itemVariants}>
                        <h2 className="register-subtitle">¡Únete al</h2>
                        <h1 className="register-title">Gran Bazar!</h1>
                        <p className="register-description">Descubre miles de productos increíbles y ofertas exclusivas</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;