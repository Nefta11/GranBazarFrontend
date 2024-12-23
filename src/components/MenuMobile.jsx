import React, { useState } from 'react';
import '../assets/styles/menu.css';
import { FaHome, FaFemale, FaChild, FaMale, FaBars, FaUser, FaMoon, FaSun } from 'react-icons/fa'; 

const MenuMobile = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
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
                    <li><a href="/"><FaHome /> Home</a></li>
                    <li><a href="/"><FaFemale /> Mujeres</a></li>
                    <li><a href="/"><FaMale /> Hombres</a></li>
                    <li><a href="/"><FaChild /> Niñas</a></li>
                    <li><button className="btn-dark-mode2 " onClick={toggleDarkMode}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button></li>
                </ul>
            </div>
            <a href="/">
                <FaUser className="user-icon" />
            </a>
        </div>
    );
};

export default MenuMobile;
