import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiCamera } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getUser } from '../services/Api';
import '../assets/styles/stylesPages/myProfile/MyProfile.css';
import themeManager from '../utils/themeManager';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener datos de autenticación desde Redux
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        // Inicializar tema global
        themeManager.initialize();

        // Verificar si ya tenemos datos del usuario en Redux
        if (authData && authData.id) {
            console.log("Usando datos de usuario desde Redux:", authData);
            setUserData({
                id: authData.id,
                name: authData.name || '',
                last_name: authData.last_name || '',
                email: authData.email || '',
                phone: authData.phone || '',
                birthday: authData.birthday || ''
            });
            setLoading(false);
        } else {
            // Si no tenemos datos en Redux, intentamos obtenerlos usando la API o localStorage
            fetchUserData();
        }
    }, [authData]);

    const fetchUserData = async () => {
        console.log("Intentando obtener datos del usuario...");
        try {
            setLoading(true);

            // Obtener datos del localStorage como referencia
            const storedAuthData = localStorage.getItem('authData');
            const parsedData = storedAuthData ? JSON.parse(storedAuthData) : null;
            console.log("Datos almacenados en localStorage:", parsedData);

            if (!parsedData || !parsedData.user) {
                throw new Error('No hay datos de usuario disponibles en localStorage');
            }

            // Usar el ID almacenado para la petición a la API
            const userId = parsedData.user.id;
            console.log(`Obteniendo usuario con ID: ${userId}`);

            // Intentar obtener datos frescos de la API
            try {
                const apiData = await getUser(userId);
                console.log("Datos obtenidos de la API:", apiData);

                if (apiData && apiData.user) {
                    setUserData(apiData.user);
                } else {
                    // Si la API no devuelve datos, usar los de localStorage
                    console.log("La API no devolvió datos, usando localStorage");
                    setUserData(parsedData.user);
                }
            } catch (apiError) {
                console.error("Error al obtener datos de la API:", apiError);
                // Si falla la API, usar los datos de localStorage como fallback
                setUserData(parsedData.user);
            }

            setLoading(false);
        } catch (err) {
            console.error('Error al obtener datos del usuario:', err);
            setError('No pudimos cargar tus datos. Por favor intenta de nuevo.');
            setLoading(false);
        }
    };

    // Extraer iniciales del nombre del usuario de forma segura
    const getUserInitials = () => {
        if (!userData) return '';

        const firstInitial = userData.name ? userData.name.charAt(0).toUpperCase() : '';
        const lastInitial = userData.last_name ? userData.last_name.charAt(0).toUpperCase() : '';

        return `${firstInitial}${lastInitial}`;
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

    // Si no hay datos de usuario después de cargar, mostrar mensaje
    if (!userData) {
        return (
            <div className="profile-error">
                <p>No se pudo cargar la información del perfil. Por favor inicia sesión nuevamente.</p>
                <button onClick={() => window.location.href = '/'} className="retry-button">
                    Ir a inicio de sesión
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
                            {getUserInitials()}
                        </span>
                        <button className="avatar-edit-button">
                            <FiCamera />
                        </button>
                    </div>
                    <h1 className="profile-name">{userData.name} {userData.last_name}</h1>
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
                                <p>{userData.name} {userData.last_name}</p>
                            </div>
                        </motion.div>

                        <motion.div className="info-item" variants={itemVariants}>
                            <div className="info-icon">
                                <FiMail />
                            </div>
                            <div className="info-content">
                                <h3>Correo electrónico</h3>
                                <p>{userData.email}</p>
                            </div>
                        </motion.div>

                        <motion.div className="info-item" variants={itemVariants}>
                            <div className="info-icon">
                                <FiPhone />
                            </div>
                            <div className="info-content">
                                <h3>Teléfono</h3>
                                <p>{userData.phone}</p>
                            </div>
                        </motion.div>

                        <motion.div className="info-item" variants={itemVariants}>
                            <div className="info-icon">
                                <FiCalendar />
                            </div>
                            <div className="info-content">
                                <h3>Fecha de nacimiento</h3>
                                <p>{userData.birthday}</p>
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