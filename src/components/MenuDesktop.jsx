import React, { useState } from 'react';
import '../assets/styles/menu.css';
import { FaHome, FaFemale, FaChild, FaMale, FaBars } from 'react-icons/fa'; // Importa el icono de menú

const MenuDesktop = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <div className="menu-desktop">
            <div className="container-logo">
                <a href="/">
                    <img src={logo} alt="icono gran bazar" />
                </a>
            </div>
            <div className="container-buttons">
                <h1 className="title-app">Gran Bazar</h1>
                <ul className={`list-buttons ${menuActive ? 'active' : ''}`}>
                    <li><a href="/"><FaHome /> Home</a></li>
                    <li><a href="/"><FaFemale /> Mujeres</a></li>
                    <li><a href="/"><FaMale /> Hombres</a></li>
                    <li><a href="/"><FaChild /> Niñas</a></li>
                    <li><a href="/" id="cart-link"><i className="bx bxs-cart-alt card-icon"></i></a></li>
                    <li className="dropdown">
                        <i className='bx bx-user card-icon'></i>
                        <div className="dropdown-content">
                            {/* Aquí puedes agregar la lógica de autenticación */}
                        </div>
                    </li>
                </ul>
                <button className="btn-mobile-menu" onClick={toggleMenu}><FaBars /></button>
            </div>
        </div>
    );
};

export default MenuDesktop;
