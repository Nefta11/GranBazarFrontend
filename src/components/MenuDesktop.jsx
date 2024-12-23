import React, { useState, useEffect } from 'react';
import '../assets/styles/menu.css';
import { FaHome, FaFemale, FaChild, FaMale, FaBars, FaUser, FaSun, FaMoon } from 'react-icons/fa';

const MenuDesktop = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

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

    return (
        <div className="menu-desktop">
            <div className="container-logo">
                <a href="/">
                    <img src={logo} alt="icono gran bazar" />
                </a>
                <button className="btn-dark-mode" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
            <div className="container-buttons">
                <h1 className="title-app">Gran Bazar</h1>
                <ul className={`list-buttons ${menuActive ? 'active' : ''}`}>
                    <li><a href="/"><FaHome /> Home</a></li>
                    <li><a href="/"><FaFemale /> Mujeres</a></li>
                    <li><a href="/"><FaMale /> Hombres</a></li>
                    <li><a href="/"><FaChild /> Niñ@s</a></li>
                    <li><a href="/"><FaUser/> Mi Perfil</a></li>
                </ul>
                <button className="btn-mobile-menu" onClick={toggleMenu}><FaBars /></button>
            </div>
        </div>
    );
};

export default MenuDesktop;
