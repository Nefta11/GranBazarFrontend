import React, { useState } from 'react';
import '../assets/styles/menu.css';
import { FaHome, FaFemale, FaChild, FaMale, FaBars, FaUser } from 'react-icons/fa'; 

const MenuMobile = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <div className="menu-mobile">
            <button className="btn-mobile-menu" onClick={toggleMenu}><FaBars /></button>
            <div className="container-logo menu-mobile__item">
                <img src={logo} alt="logo app" />
                <h2>Gran Bazar</h2>
            </div>
            <div className="container-buttons">
                <ul className={`list-buttons ${menuActive ? 'active' : ''}`}>
                    <li><a href="/"><FaHome /> Home</a></li>
                    <li><a href="/"><FaFemale /> Mujeres</a></li>
                    <li><a href="/"><FaMale /> Hombres</a></li>
                    <li><a href="/"><FaChild /> Niñas</a></li>
                </ul>
            </div>
            <a href="/">
            <FaUser className="user-icon" />
            </a>
        </div>
    );
};

export default MenuMobile;
