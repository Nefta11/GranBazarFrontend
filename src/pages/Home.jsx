import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import '../assets/styles/stylesPages/main-view.css';
import logoGranBazar from '../assets/images/Gran-Bazar-removebg-preview (2).png';
import MenuDesktop from '../components/MenuDesktop';
import MenuMobile from '../components/MenuMobile';
import Footer from '../components/Footer';
import { FaGift, FaFire, FaStar, FaThumbsUp, FaSpinner, FaSearch } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../services/Api';

const Home = () => {
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(0); // 0 significa todas las categorías

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
                            <motion.section className="featured-section" variants={sectionVariants}>
                                <div className="section-header">
                                    <FaStar className="section-icon" />
                                    <h2 className="title-section">Productos Destacados</h2>
                                </div>
                                <div className="section featured-grid">
                                    {featuredProducts.map((product) => (
                                        <ProductCard
                                            key={`featured-${product.id}`}
                                            id={product.id}
                                            name={product.name}
                                            description={product.description}
                                            price={parseFloat(product.price)}
                                            stock={product.stock}
                                            category_id={product.category_id}
                                            image={product.image}
                                            status={product.status}
                                            rating={parseFloat(product.rating)}
                                        />
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        <motion.section className="category-section" variants={sectionVariants}>
                            <div className="section-header">
                                <FaFire className="section-icon" />
                                <h2 className="title-section">Todos los Productos</h2>
                            </div>

                            <div className="filters-section">
                                <div className="search-container">
                                    <FaSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Buscar productos..."
                                        className="search-input"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="categories-filter">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                                            onClick={() => setActiveCategory(category.id)}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {filteredProducts.length === 0 ? (
                                <div className="no-products">
                                    No se encontraron productos que coincidan con tu búsqueda.
                                </div>
                            ) : (
                                <div className="section">
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            description={product.description}
                                            price={parseFloat(product.price)}
                                            stock={product.stock}
                                            category_id={product.category_id}
                                            image={product.image}
                                            status={product.status}
                                            rating={parseFloat(product.rating)}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    </>
                )}
            </motion.main>

            <Footer />
        </div>
    );
};

export default Home;