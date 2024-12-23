import React from 'react';
import '../assets/styles/main-view.css'; // Importa el archivo CSS

const Home = () => {
    return (
        <div>
            <header>
                <div className="menu-desktop">
                    <div className="container-logo">
                        <a href="index.php">
                            <img src="../assets/images/logo_gran_bazar.jpeg" alt="icono gran bazar" />
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
                <div className="menu-mobile">
                    <div className="container-bottom-menu menu-mobile__item">
                        <i className='bx bx-menu menu-icon btn-mobile-menu'></i>
                    </div>
                    <div className="container-logo menu-mobile__item">
                        <a href="index.php">
                            <img src="../assets/images/logo_gran_bazar.jpeg" alt="logo app" />
                        </a>
                    </div>
                    <div className="container-shopping-cart menu-mobile__item" id="mobile-cart-icon">
                        <a href="cart.php">
                            <i className='bx bx-cart-alt menu-icon'></i>
                        </a>
                    </div>
                </div>
                <div className="nav-menu">
                    {/* Aquí puedes agregar los enlaces de navegación */}
                </div>
            </header>
            <main>
                <h1 className="title-section">Ofertas de HASTA un 80%</h1>
                <section className="oferts section">
                    {/* Aquí puedes agregar los productos */}
                </section>
                <h2 className="title-section">Lo más nuevo</h2>
                <section className="most-new section">
                    {/* Aquí puedes agregar los productos */}
                </section>
                <h2 className="title-section">Lo más solicitado</h2>
                <section className="most-requested section">
                    {/* Aquí puedes agregar los productos */}
                </section>
                <h2 className="title-section">Lo más recomendado</h2>
                <section className="recommended section">
                    {/* Aquí puedes agregar los productos */}
                </section>
            </main>
            <footer>
                <section className="footer-desktop">
                    <div className="footer-item__desktop">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4011.1913055687737!2d-97.9584259705053!3d20.238582122701505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smx!4v1691865537809!5m2!1sen!2smx" 
                            width="600" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade" 
                            className="location"
                            title="Ubicación Gran Bazar Desktop"
                        ></iframe>
                    </div>
                    <div className="footer-item__desktop two">
                        <p>Encuentranos en nuestras redes sociales</p>
                        <div className="icons-footer-content">
                            <i className='bx bxl-facebook-square'></i> <br />
                            <i className='bx bxl-instagram-alt'></i> <br />
                            <i className='bx bxl-tiktok'></i>
                        </div>
                    </div>
                </section>
                <section className="footer-mobile">
                    <p className="texto-footer-mobile">Visitanos</p>
                    <div className="footer-item__desktop">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4011.1913055687737!2d-97.9584259705053!3d20.238582122701505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smx!4v1691865537809!5m2!1sen!2smx" 
                            width="600" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade" 
                            className="location"
                            title="Ubicación Gran Bazar Mobile"
                        ></iframe>
                    </div>
                </section>
            </footer>
        </div>
    );
};

export default Home;
