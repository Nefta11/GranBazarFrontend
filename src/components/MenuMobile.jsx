import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/styles/stylesComponents/menu.css';
import {
    FaFemale,
    FaChild,
    FaMale,
    FaBars,
    FaUser,
    FaMoon,
    FaSun,
    FaSignOutAlt,
    FaUserCircle,
    FaSearch,
    FaShoppingCart,
    FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/authSlice';

const MenuMobile = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';

        // Use saved preference or system preference
        const shouldEnableDarkMode = savedDarkMode !== null ? savedDarkMode : userPrefersDark;

        setDarkMode(shouldEnableDarkMode);
        document.body.classList.toggle('dark-mode', shouldEnableDarkMode);
    }, []);

    useEffect(() => {
        // Prevent scrolling when menu is open
        if (menuActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuActive]);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
        // Close user menu when main menu toggles
        if (userMenuActive) {
            setUserMenuActive(false);
        }
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.body.classList.toggle('dark-mode', newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
    };

    const toggleUserMenu = () => {
        setUserMenuActive(!userMenuActive);
        // Close main menu when user menu toggles
        if (menuActive) {
            setMenuActive(false);
        }
    };

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        // Close menus when search is active
        if (!searchActive) {
            setMenuActive(false);
            setUserMenuActive(false);

            setTimeout(() => {
                document.getElementById('mobile-search-input')?.focus();
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
                dispatch(logOut());
                // Redirigir al login
                window.location.href = '/';
            }
        });
    };

    const menuVariants = {
        hidden: { x: '-100%' },
        visible: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        },
        exit: {
            x: '-100%',
            transition: {
                duration: 0.2,
                ease: 'easeInOut'
            }
        }
    };

    const userMenuVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        exit: {
            y: -50,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    const searchVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: 'auto',
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        exit: {
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <div className="menu-mobile">
            <div className="mobile-header">
                <button
                    className="menu-toggle-button"
                    onClick={toggleMenu}
                    aria-label={menuActive ? "Cerrar menú" : "Abrir menú"}
                >
                    {menuActive ? <FaTimes /> : <FaBars />}
                </button>

                <div className="container-logo">
                    <Link to="/Home">
                        <img src={logo} alt="Logo Gran Bazar" />
                    </Link>
                    <h2>Gran Bazar</h2>
                </div>

                <div className="mobile-actions">
                    <button
                        className="search-toggle"
                        onClick={toggleSearch}
                        aria-label="Buscar"
                    >
                        <FaSearch />
                    </button>

                    <Link to="/cart" className="mobile-cart-button">
                        <FaShoppingCart />
                        <span className="cart-count">0</span>
                    </Link>

                    <button
                        className="user-icon"
                        onClick={toggleUserMenu}
                        aria-label="Menú de usuario"
                    >
                        <FaUser />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {searchActive && (
                    <motion.div
                        className="mobile-search-wrapper"
                        variants={searchVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
                            <input
                                id="mobile-search-input"
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button type="submit" className="search-submit">
                                <FaSearch />
                            </button>
                            <button
                                type="button"
                                className="search-close"
                                onClick={toggleSearch}
                            >
                                <FaTimes />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {menuActive && (
                    <>
                        <motion.div
                            className="menu-backdrop"
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={toggleMenu}
                        />

                        <motion.div
                            className="mobile-menu-container"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="mobile-menu-header">
                                <h3>Menú</h3>
                                <button
                                    className="menu-close"
                                    onClick={toggleMenu}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <ul className="mobile-menu-items">
                                <li>
                                    <Link to="/women" className="mobile-nav-item" onClick={toggleMenu}>
                                        <FaFemale className="mobile-nav-icon" />
                                        <span>Mujeres</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/men" className="mobile-nav-item" onClick={toggleMenu}>
                                        <FaMale className="mobile-nav-icon" />
                                        <span>Hombres</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/kids" className="mobile-nav-item" onClick={toggleMenu}>
                                        <FaChild className="mobile-nav-icon" />
                                        <span>Niñ@s</span>
                                    </Link>
                                </li>
                                <li>
                                    <button className="mobile-dark-toggle" onClick={toggleDarkMode}>
                                        {darkMode ? (
                                            <>
                                                <FaSun className="mobile-nav-icon" />
                                                <span>Modo Claro</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaMoon className="mobile-nav-icon" />
                                                <span>Modo Oscuro</span>
                                            </>
                                        )}
                                    </button>
                                </li>
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {userMenuActive && (
                    <>
                        <motion.div
                            className="menu-backdrop"
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={toggleUserMenu}
                        />

                        <motion.ul
                            className="mobile-user-menu"
                            variants={userMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <li>
                                <Link to="/Profile" className="user-menu-item" onClick={toggleUserMenu}>
                                    <FaUserCircle className="user-menu-icon" />
                                    <span>Mi perfil</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="user-menu-item logout-button"
                                    onClick={handleLogOut}
                                >
                                    <FaSignOutAlt className="user-menu-icon" />
                                    <span>Cerrar sesión</span>
                                </button>
                            </li>
                        </motion.ul>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MenuMobile;