import React, { useState } from 'react';

const NavBar = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleClickOutside = (e) => {
        if (menuActive && e.target.closest('.nav-menu') === null && e.target.closest('.btn-mobile-menu') === null) {
            setMenuActive(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [menuActive]);

    return (
        <div>
            <button className="btn-mobile-menu" onClick={toggleMenu}>Menu</button>
            <nav className={`nav-menu ${menuActive ? 'nav-menu__active' : ''}`}>
                {/* Aquí puedes agregar los enlaces de navegación */}
            </nav>
        </div>
    );
};

export default NavBar;
