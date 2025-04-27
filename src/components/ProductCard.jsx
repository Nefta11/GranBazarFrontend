import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaEye } from 'react-icons/fa';

const ProductCard = ({ id, name, description, price, stock, category_id, image, status, rating }) => {
    // Función para renderizar estrellas basadas en el rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Agregar estrellas completas
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`star-${i}`} className="star-icon filled" />);
        }

        // Agregar media estrella si es necesario
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half-star" className="star-icon half" />);
        }

        // Agregar estrellas vacías
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-star-${i}`} className="star-icon empty" />);
        }

        return stars;
    };

    // Función para truncar descripciones largas
    const truncateDescription = (text, maxLength = 80) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    // Función para formatear precio en pesos mexicanos
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2
        }).format(price);
    };

    // Variables para categoría
    const categoryNames = {
        1: 'Hombres',
        2: 'Mujeres',
        3: 'Niñ@s',
        4: 'Unisex',
        5: 'Accesorios',
        6: 'Deportiva',
        7: 'Infantil',
        8: 'Juvenil'
    };

    const getCategoryName = (categoryId) => {
        return categoryNames[categoryId] || 'Otra Categoría';
    };

    // Animación para cada tarjeta
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        },
        hover: {
            y: -5,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            className="product-placeholder"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
        >
            <div className="product-badge-container">
                {status === 1 && <span className="product-badge new">Nuevo</span>}
                {stock < 10 && stock > 0 && <span className="product-badge limited">¡Últimas unidades!</span>}
                {stock === 0 && <span className="product-badge sold-out">Agotado</span>}
            </div>

            <div className="product-image-container">
                <img
                    src={image || 'https://via.placeholder.com/300x300?text=Imagen+no+disponible'}
                    alt={name}
                    className="product-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x300?text=Imagen+no+disponible';
                    }}
                />

                <div className="product-actions">
                    <button className="action-button cart-button">
                        <FaShoppingCart /> Agregar
                    </button>
                    <button className="action-button view-button">
                        <FaEye /> Ver
                    </button>
                </div>
            </div>

            <div className="product-category">{getCategoryName(category_id)}</div>
            <h3 className="product-title">{name}</h3>
            <p className="product-description">{truncateDescription(description)}</p>

            <div className="product-meta">
                <div className="product-rating">
                    {renderStars(rating)}
                    <span className="rating-value">{rating}</span>
                </div>
                <div className="product-stock">
                    {stock > 0 ? `Stock: ${stock}` : 'Sin existencias'}
                </div>
            </div>

            <div className="price">
                {formatPrice(price)}
            </div>
        </motion.div>
    );
};

export default ProductCard;