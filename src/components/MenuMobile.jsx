import React from 'react';

const MenuMobile = ({ logo }) => {
    return (
        <div className="menu-mobile">
            <div className="container-bottom-menu menu-mobile__item">
                <i className='bx bx-menu menu-icon btn-mobile-menu'></i>
            </div>
            <div className="container-logo menu-mobile__item">
                <a href="index.php">
                    <img src={logo} alt="logo app" />
                </a>
            </div>
            <div className="container-shopping-cart menu-mobile__item" id="mobile-cart-icon">
                <a href="cart.php">
                    <i className='bx bx-cart-alt menu-icon'></i>
                </a>
            </div>
        </div>
    );
};

export default MenuMobile;
