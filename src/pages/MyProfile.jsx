import  { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiCamera } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getUser } from '../services/Api';
import '../assets/styles/stylesPages/myProfile/MyProfile.css';
import themeManager from '../utils/themeManager';

const MyProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Inicializar tema global
        themeManager.initialize();

        // Cargar datos del usuario
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const data = await getUser();
            setUserData(data.user);
            setLoading(false);
        } catch (err) {
            console.error('Error al obtener datos del usuario:', err);
            setError('No pudimos cargar tus datos. Por favor intenta de nuevo.');
            setLoading(false);
        }
    };

    // Función para convertir la fecha de nacimiento a formato legible
    const formatBirthday = (dateString) => {
        // Si tenemos un timestamp unix (segundos desde 1970)
        if (userData.birthday_unix) {
            const date = new Date(parseInt(userData.birthday_unix) * 1000);

            // Array de nombres de meses en español
            const months = [
                'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];

            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            return `${day} de ${month} de ${year}`;
        }

        // Si tenemos un formato DD-MM-YYYY
        if (dateString && dateString.includes('-')) {
            const [day, month, year] = dateString.split('-');

            // Array de nombres de meses en español
            const months = [
                'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];

            // Convertir el mes numérico (1-12) a índice de array (0-11)
            const monthIndex = parseInt(month) - 1;
            const monthName = months[monthIndex];

            return `${day} de ${monthName} de ${year}`;
        }

        return dateString; // Si no podemos formatear, devolvemos la fecha original
    };

    // Animaciones
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
            transition: { duration: 0.3 }
        }
    };

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="spinner"></div>
                <p>Cargando tus datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-error">
                <p>{error}</p>
                <button onClick={fetchUserData} className="retry-button">
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    return (
        <motion.div
            className="profile-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="profile-header">
                <div className="profile-cover">
                    <button className="cover-edit-button">
                        <FiCamera /> Cambiar portada
                    </button>
                </div>

                <div className="profile-avatar-container">
                    <div className="profile-avatar">
                        <span className="profile-initials">
                            {userData?.name.charAt(0)}{userData?.last_name.charAt(0)}
                        </span>
                        <button className="avatar-edit-button">
                            <FiCamera />
                        </button>
                    </div>
                    <h1 className="profile-name">{userData?.name} {userData?.last_name}</h1>
                </div>
            </div>

            <div className="profile-content">
                <motion.div
                    className="profile-card"
                    variants={containerVariants}
                >
                    <div className="card-header">
                        <h2>Información Personal</h2>
                        <button className="edit-button">
                            <FiEdit2 /> Editar
                        </button>
                    </div>

                    <div className="profile-info">
                        <motion.div className="info-item" variants={itemVariants}>
                            <div className="info-icon">
                                <FiUser />
                            </div>
                            <div className="info-content">
                                <h3>Nombre completo</h3>
                                <p>{userData?.name} {userData?.last_name}</p>
                            </div>
                        </motion.div>

                        <motion.div className="info-item" variants={itemVariants}>
                            <div className="info-icon">
                                <FiMail />
                            </div>
                            <div className="info-content">
                                <h3>Correo electrónico</h3>
                                <p>{userData?.email}</p>
                            </div>
                        </motion.div>

                        <motion.div className="info-item" variants={itemVariants}>
                            <div className="info-icon">
                                <FiPhone />
                            </div>
                            <div className="info-content">
                                <h3>Teléfono</h3>
                                <p>{userData?.phone}</p>
                            </div>
                        </motion.div>

                        <motion.div className="info-item" variants={itemVariants}>
                            <div className="info-icon">
                                <FiCalendar />
                            </div>
                            <div className="info-content">
                                <h3>Fecha de nacimiento</h3>
                                <p>{formatBirthday(userData?.birthday)}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="profile-card"
                    variants={containerVariants}
                >
                    <div className="card-header">
                        <h2>Seguridad</h2>
                        <button className="edit-button">
                            <FiEdit2 /> Cambiar contraseña
                        </button>
                    </div>

                    <div className="security-info">
                        <p>Puedes cambiar tu contraseña en cualquier momento para mantener tu cuenta segura.</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MyProfile;