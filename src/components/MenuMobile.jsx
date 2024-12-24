import React, { useState } from 'react';
import '../assets/styles/stylesComponents/menu.css';
import { FaHome, FaFemale, FaChild, FaMale, FaBars, FaUser, FaMoon, FaSun, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const MenuMobile = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);

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
        <div className="menu-mobile">
            <button className="btn-mobile-menu" onClick={toggleMenu}><FaBars /></button>
            <div className="container-logo">
                <img src={logo} alt="logo app" />
                <h2>Gran Bazar</h2>
            </div>
            <div className="container-buttons">
                <ul className={`list-buttons ${menuActive ? 'active' : ''}`}>
                    <li><a href="/"><FaFemale /> Mujeres</a></li>
                    <li><a href="/"><FaMale /> Hombres</a></li>
                    <li><a href="/"><FaChild /> Niñas</a></li>
                    <li>
                        <a className="btn-dark-mode2" onClick={toggleDarkMode}>
                            {darkMode ? <><FaSun /> Claro</> : <><FaMoon /> Oscuro</>}
                        </a>
                    </li>
                </ul>
            </div>
            <div className="user-menu">
                <FaUser className="user-icon" onClick={toggleUserMenu} />
                <ul className={`list-user-menu ${userMenuActive ? 'active' : ''}`}>
                    <li><a href="/Profile"><FaUserCircle /> Mi perfil</a></li>
                    <li><a href=""><FaSignOutAlt /> Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
    );
};

export default MenuMobile;
