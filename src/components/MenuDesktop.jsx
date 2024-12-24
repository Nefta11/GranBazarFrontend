import React, { useState, useEffect } from 'react';
import '../assets/styles/stylesComponents/menu.css';
import { FaHome, FaFemale, FaChild, FaMale, FaBars, FaUser, FaSun, FaMoon, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MenuDesktop = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);

    useEffect(() => {
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(userPrefersDark);
        document.body.classList.toggle('dark-mode', userPrefersDark);
    }, []);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    const toggleUserMenu = () => {
        setUserMenuActive(!userMenuActive);
    };

    return (
        <div className="menu-desktop">
            <button className="btn-dark-mode" onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className="container-logo">
                <Link to="/Home">
                    <img src={logo} alt="icono gran bazar" />
                </Link>
            </div>
            <div className="container-buttons">
                <h1 className="title-app">Gran Bazar</h1>
                <ul className={`list-buttons ${menuActive ? 'active' : ''}`}>
                    <li><Link to=""><FaFemale /> Mujeres</Link></li>
                    <li><Link to=""><FaMale /> Hombres</Link></li>
                    <li><Link to=""><FaChild /> Niñ@s</Link></li>
                    <li><a><FaUser className="user-icon" onClick={toggleUserMenu} />Hola{ }
                        <ul className={`list-user-menu ${userMenuActive ? 'active' : ''}`}>
                            <li><Link to="/Profile"><FaUserCircle /> Mi perfil</Link></li>
                            <li><Link to=""><FaSignOutAlt /> Cerrar sesión</Link></li>
                        </ul></a></li>
                </ul>
                <button className="btn-mobile-menu" onClick={toggleMenu}><FaBars /></button>
            </div>

        </div>
    );
};

export default MenuDesktop;
