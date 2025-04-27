import { useEffect } from 'react';
import '../assets/styles/stylesComponents/footer.css';
import themeManager from '../utils/themeManager';

const Footer = () => {
    useEffect(() => {
        // Inicializar tema global
        themeManager.initialize();
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footer-container">
                {/* Agregamos el link para Boxicons si no está incluido en el proyecto */}
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />

                <div className="footer-main">
                    <div className="footer-info">
                        <h3 className="footer-brand">Gran Bazar</h3>
                        <div className="contact-info">
                            <p><i className='bx bx-envelope'></i> info@granbazar.com</p>
                            <p><i className='bx bx-phone'></i> +52 123 456 7890</p>
                        </div>
                    </div>

                    <div className="footer-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4011.1913055687737!2d-97.9584259705053!3d20.238582122701505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smx!4v1691865537809!5m2!1sen!2smx"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="location-map"
                            title="Ubicación Gran Bazar"
                        ></iframe>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© {currentYear} Gran Bazar, desarrollado por Neftali</p>
                    <div className="social-icons">
                        <a href="#" className="social-icon" aria-label="Facebook">
                            <i className='bx bxl-facebook'></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Instagram">
                            <i className='bx bxl-instagram'></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="TikTok">
                            <i className='bx bxl-tiktok'></i>
                        </a>
                    </div>
                    <button className="theme-button" onClick={() => themeManager.toggleTheme()}>
                        <i className='bx bx-sun light-icon'></i>
                        <i className='bx bx-moon dark-icon'></i>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;