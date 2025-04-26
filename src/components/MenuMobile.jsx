import { useState } from 'react';
import '../assets/styles/stylesComponents/menu.css';
import { FaFemale, FaChild, FaMale, FaBars, FaUser, FaMoon, FaSun, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/authSlice';

const MenuMobile = ({ logo }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);
    const dispatch = useDispatch();

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

    const handleLogOut = () => {
        Swal.fire({
            icon: 'warning',
            title: '¿Seguro que desea cerrar sesión?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logOut());
            }
        });
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
                    <li><Link to=""><FaFemale /> Mujeres</Link></li>
                    <li><Link to=""><FaMale /> Hombres</Link></li>
                    <li><Link to=""><FaChild /> Niñas</Link></li>
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
                    <li><Link to="/Profile"><FaUserCircle /> Mi perfil</Link></li>
                    <li><a onClick={handleLogOut}><FaSignOutAlt /> Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
    );
};

export default MenuMobile;
