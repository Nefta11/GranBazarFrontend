import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import '../assets/styles/stylesPages/main-view.css';
import logoGranBazar from '../assets/images/Gran-Bazar-removebg-preview (2).png';
import MenuDesktop from '../components/MenuDesktop';
import MenuMobile from '../components/MenuMobile';
import Footer from '../components/Footer';
import { FaFire, FaStar, } from 'react-icons/fa';
import { getAllProducts } from '../services/Api';
import ProductSection from '../components/ProductSection';

const Home = () => {
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(0); 

    useEffect(() => {
        console.log("Datos guardados en Redux:", authData);
        // Efecto de scroll suave
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [authData, dispatch]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const storedAuthData = localStorage.getItem('authData');
                if (!storedAuthData) {
                    throw new Error('No hay sesión activa');
                }

                const parsedAuthData = JSON.parse(storedAuthData);
                const token = parsedAuthData?.token;

                if (!token) {
                    throw new Error('Token no disponible');
                }

                console.log('Token obtenido:', token); // Depuración del token
                const productsData = await getAllProducts(token);
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError('No se pudieron cargar los productos. Por favor intenta de nuevo.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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


    // Filtrar productos
    const filterProducts = () => {
        return products.filter(product => {
            const matchesSearch = searchTerm === '' ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = activeCategory === 0 || parseInt(product.category_id) === activeCategory;

            return matchesSearch && matchesCategory;
        });
    };

    // Categorías disponibles
    const categories = [
        { id: 0, name: 'Todos' },
        { id: 1, name: 'Hombres' },
        { id: 2, name: 'Mujeres' },
        { id: 3, name: 'Niñ@s' },
        { id: 4, name: 'Unisex' },
        { id: 5, name: 'Accesorios' },
        { id: 6, name: 'Deportiva' },
        { id: 7, name: 'Infantil' },
        { id: 8, name: 'Juvenil' }
    ];

    // Función para obtener destacados (productos con mayor rating)
    const getFeaturedProducts = () => {
        return [...products]
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            .slice(0, 4);
    };

    const filteredProducts = filterProducts();
    const featuredProducts = products.length > 0 ? getFeaturedProducts() : [];

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

                {loading ? (
                    <div className="products-loader">
                        <div className="loader"></div>
                    </div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <>
                        {featuredProducts.length > 0 && (
                            <ProductSection
                                title="Productos Destacados"
                                icon={<FaStar className="section-icon" />}
                                products={featuredProducts}
                            />
                        )}

                        <ProductSection
                            title="Todos los Productos"
                            icon={<FaFire className="section-icon" />}
                            products={filteredProducts}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            categories={categories}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    </>
                )}
            </motion.main>

            <Footer />
        </div>
    );
};

export default Home;