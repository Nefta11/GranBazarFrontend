import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/styles/stylesComponents/menu.css';
import {
    FaFemale,
    FaChild,
    FaMale,
    FaUser,
    FaSun,
    FaMoon,
    FaSignOutAlt,
    FaUserCircle,
    FaSearch,
    FaShoppingCart
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/authSlice';
import themeManager from '../utils/themeManager';

const MenuDesktop = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        // Inicializar el gestor de tema
        themeManager.initialize();

        // Obtener el estado actual del tema
        const isDarkMode = themeManager.getTheme();
        setDarkMode(isDarkMode);

        // Añadir detector de clics fuera del menú
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (e) => {
        if (userMenuActive && !e.target.closest('.user-menu-container')) {
            setUserMenuActive(false);
        }
    };

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const toggleDarkMode = () => {
        const newDarkMode = themeManager.toggleTheme();
        setDarkMode(newDarkMode);
    };

    const toggleUserMenu = (e) => {
        e.stopPropagation();
        setUserMenuActive(!userMenuActive);
    };

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        if (!searchActive) {
            setTimeout(() => {
                document.getElementById('search-input')?.focus();
            }, 100);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Buscando:', searchQuery);
            // Implementar la búsqueda
            setSearchQuery('');
            setSearchActive(false);
        }
    };

    const handleLogOut = () => {
        Swal.fire({
            icon: 'warning',
            title: '¿Seguro que desea cerrar sesión?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#5D5FEF',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar el token del localStorage
                localStorage.removeItem('authData');

                // Despachar la acción de cerrar sesión
                dispatch(logOut());

                // Redirigir al login
                window.location.href = '/';
            }
        });
    };

    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    const searchVariants = {
        hidden: { width: 0, opacity: 0 },
        visible: {
            width: "250px",
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <div className="menu-desktop">
            <div className="desktop-left">
                <button
                    className="btn-dark-mode"
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                >
                    {darkMode ? <FaSun className="icon-transition" /> : <FaMoon className="icon-transition" />}
                </button>

                <div className="container-logo">
                    <Link to="/Home">
                        <img src={logo} alt="Logo Gran Bazar" />
                    </Link>
                    <h1 className="title-app">Gran Bazar</h1>
                </div>
            </div>

            <div className="desktop-center">
                <ul className={`list-buttons ${menuActive ? 'active' : ''}`}>
                    <li>
                        <Link to="/women" className="nav-link">
                            <FaFemale className="nav-icon" /> <span>Mujeres</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/men" className="nav-link">
                            <FaMale className="nav-icon" /> <span>Hombres</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/kids" className="nav-link">
                            <FaChild className="nav-icon" /> <span>Niñ@s</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="desktop-right">
                <div className="search-container">
                    <button
                        className="search-button"
                        onClick={toggleSearch}
                        aria-label="Buscar"
                    >
                        <FaSearch />
                    </button>

                    <AnimatePresence>
                        {searchActive && (
                            <motion.form
                                className="search-form"
                                variants={searchVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onSubmit={handleSearchSubmit}
                            >
                                <input
                                    id="search-input"
                                    type="text"
                                    placeholder="Buscar productos..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <Link to="/cart" className="cart-button">
                    <FaShoppingCart />
                    <span className="cart-count">0</span>
                </Link>

                <div className="user-menu-container">
                    <button
                        className="user-icon"
                        onClick={toggleUserMenu}
                        aria-label="Menú de usuario"
                    >
                        <FaUser />
                    </button>

                    <AnimatePresence>
                        {userMenuActive && (
                            <motion.ul
                                className="list-user-menu"
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <li>
                                    <Link to="/Profile" className="user-menu-item">
                                        <FaUserCircle /> <span>Mi perfil</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="user-menu-item logout-button"
                                        onClick={handleLogOut}
                                    >
                                        <FaSignOutAlt /> <span>Cerrar sesión</span>
                                    </button>
                                </li>
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default MenuDesktop;