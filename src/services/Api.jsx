import axios from 'axios';

const api = axios.create({
    baseURL: 'http://tu-dominio.com/api', // Cambia esto a la URL base de tu API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Registro de usuario
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registrando usuario:', error);
        throw error;
    }
};

// Autenticación de usuario
export const authUser = async (credentials) => {
    try {
        const response = await api.post('/auth', credentials);
        return response.data;
    } catch (error) {
        console.error('Error autenticando usuario:', error);
        throw error;
    }
};

// Obtener usuario por ID
export const getUserById = async (id) => {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        throw error;
    }
};

// Autenticación con Google
export const googleAuth = async (tokenId) => {
    try {
        const response = await api.post('/google-auth', { tokenId });
        return response.data;
    } catch (error) {
        console.error('Error en autenticación con Google:', error);
        throw error;
    }
};

// Crear producto
export const createProduct = async (productData) => {
    try {
        const response = await api.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw error;
    }
};

// Obtener todos los productos
export const getAllProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        throw error;
    }
};

// Actualizar producto
export const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error actualizando producto:', error);
        throw error;
    }
};

// Eliminar producto
export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando producto:', error);
        throw error;
    }
};
