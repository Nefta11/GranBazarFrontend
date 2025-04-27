import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import '../assets/styles/stylesPages/main-view.css';
import logoGranBazar from '../assets/images/Gran-Bazar-removebg-preview (2).png';
import MenuDesktop from '../components/MenuDesktop';
import MenuMobile from '../components/MenuMobile';
import Footer from '../components/Footer';
import { FaGift, FaFire, FaStar, FaThumbsUp } from 'react-icons/fa';

const Home = () => {
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        console.log("Datos guardados en Redux:", authData);

        // Efecto de scroll suave
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [authData, dispatch]);

    // Animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <div className="home-container">
            <header>
                <MenuMobile logo={logoGranBazar} />
                <MenuDesktop logo={logoGranBazar} />
            </header>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="hero-section">
                    <div className="hero-content">
                        <h1>Bienvenido a Gran Bazar</h1>
                        <p>Tu tienda online con los mejores productos y ofertas</p>
                        <button className="explore-button">Explorar tienda</button>
                    </div>
                </div>

                <motion.section className="featured-section" variants={sectionVariants}>
                    <div className="section-header">
                        <FaGift className="section-icon" />
                        <h1 className="title-section">Ofertas de HASTA un 80%</h1>
                    </div>
                    <div className="oferts section">
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto en oferta</h3>
                            <p className="price"><span className="old-price">$1200</span> $600</p>
                            <span className="discount-badge">-50%</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto en oferta</h3>
                            <p className="price"><span className="old-price">$2500</span> $500</p>
                            <span className="discount-badge">-80%</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto en oferta</h3>
                            <p className="price"><span className="old-price">$1800</span> $900</p>
                            <span className="discount-badge">-50%</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto en oferta</h3>
                            <p className="price"><span className="old-price">$2200</span> $990</p>
                            <span className="discount-badge">-55%</span>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="category-section" variants={sectionVariants}>
                    <div className="section-header">
                        <FaFire className="section-icon" />
                        <h2 className="title-section">Lo más nuevo</h2>
                    </div>
                    <div className="most-new section">
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Nuevo producto</h3>
                            <p className="price">$1350</p>
                            <span className="new-badge">Nuevo</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Nuevo producto</h3>
                            <p className="price">$2100</p>
                            <span className="new-badge">Nuevo</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Nuevo producto</h3>
                            <p className="price">$800</p>
                            <span className="new-badge">Nuevo</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Nuevo producto</h3>
                            <p className="price">$1700</p>
                            <span className="new-badge">Nuevo</span>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="category-section" variants={sectionVariants}>
                    <div className="section-header">
                        <FaStar className="section-icon" />
                        <h2 className="title-section">Lo más solicitado</h2>
                    </div>
                    <div className="most-requested section">
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto popular</h3>
                            <p className="price">$1500</p>
                            <div className="rating">
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="reviews">(120)</span>
                            </div>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto popular</h3>
                            <p className="price">$2200</p>
                            <div className="rating">
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star half">★</span>
                                <span className="reviews">(98)</span>
                            </div>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto popular</h3>
                            <p className="price">$1100</p>
                            <div className="rating">
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">☆</span>
                                <span className="reviews">(75)</span>
                            </div>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto popular</h3>
                            <p className="price">$1800</p>
                            <div className="rating">
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="reviews">(152)</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="category-section" variants={sectionVariants}>
                    <div className="section-header">
                        <FaThumbsUp className="section-icon" />
                        <h2 className="title-section">Lo más recomendado</h2>
                    </div>
                    <div className="recommended section">
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto recomendado</h3>
                            <p className="price">$1900</p>
                            <span className="recommendation-badge">Recomendado</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto recomendado</h3>
                            <p className="price">$2500</p>
                            <span className="recommendation-badge">Recomendado</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto recomendado</h3>
                            <p className="price">$800</p>
                            <span className="recommendation-badge">Recomendado</span>
                        </div>
                        <div className="product-placeholder">
                            <div className="product-image"></div>
                            <h3>Producto recomendado</h3>
                            <p className="price">$1600</p>
                            <span className="recommendation-badge">Recomendado</span>
                        </div>
                    </div>
                </motion.section>
            </motion.main>

            <Footer />
        </div>
    );
};

export default Home;