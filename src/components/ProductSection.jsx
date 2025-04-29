import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { FaSearch } from 'react-icons/fa';
import '../assets/styles/stylesComponents/product-section.css';
import PropTypes from 'prop-types';

const ProductSection = ({
    title,
    icon,
    products,
    searchTerm,
    setSearchTerm,
    categories,
    activeCategory,
    setActiveCategory
}) => {
    return (
        <motion.section className="product-section">
            <div className="section-header">
                {icon}
                <h2 className="title-section">{title}</h2>
            </div>

            {searchTerm !== undefined && setSearchTerm && (
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
            )}

            {products.length === 0 ? (
                <div className="no-products">
                    No se encontraron productos que coincidan con tu búsqueda.
                </div>
            ) : (
                <div className="section">
                    {products.map((product) => (
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
    );
};
ProductSection.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            stock: PropTypes.number,
            category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            image: PropTypes.string,
            status: PropTypes.string,
            rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ).isRequired,
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    activeCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setActiveCategory: PropTypes.func,
};

export default ProductSection;
