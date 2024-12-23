import React, { useState } from 'react';
import '../assets/styles/menu.css';
import { FaHome, FaFemale, FaChild, FaMale, FaBars, FaUser } from 'react-icons/fa'; // Importa el icono de usuario

const MenuMobile = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <div className="menu-mobile">
            <button className="btn-mobile-menu" onClick={toggleMenu}><FaBars /></button>
            <div className="container-logo menu-mobile__item">
                <a href="/">
                    <img src={logo} alt="logo app" />
                </a>
                <h2>Gran Bazar</h2>
            </div>
            <div className="container-buttons">
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
                <FaUser className="user-icon" />
            </div>
        </div>
    );
};

export default MenuMobile;
