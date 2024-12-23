import React from 'react';

const MenuDesktop = ({ logo }) => {
    return (
        <div className="menu-desktop">
            <div className="container-logo">
                <a href="/">
                    <img src={logo} alt="icono gran bazar" />
                </a>
            </div>
            <div className="container-buttons">
                <h1 className="title-app">Gran Bazar</h1>
                <ul className="list-buttons">
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Mujeres</a></li>
                    <li><a href="/">Niñas</a></li>
                    <li><a href="/" id="cart-link"><i className="bx bxs-cart-alt card-icon"></i></a></li>
                    <li className="dropdown">
                        <i className='bx bx-user card-icon'></i>
                        <div className="dropdown-content">
                            {/* Aquí puedes agregar la lógica de autenticación */}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MenuDesktop;
