// Actualización del API para manejar el cambio en el token
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para manejar las respuestas de error
const handleError = (error) => {
    if (error.response) {
        return {
            message: error.response.data.message || 'Algo salió mal',
            status: error.response.status || 500,
        };
    } else if (error.request) {
        return {
            message: 'No se pudo conectar con el servidor',
            status: 503,
        };
    } else {
        return {
            message: error.message || 'Error desconocido',
            status: 500,
        };
    }
};

// Registro de usuario
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registrando usuario:', error);
        throw handleError(error);
    }
};

// Autenticación de usuario
export const authUser = async (credentials) => {
    try {
        const response = await api.post('/auth', credentials);
        return response.data;
    } catch (error) {
        console.error('Error autenticando usuario:', error);
        throw handleError(error);
    }
};

// Obtener usuario por ID (cambiando cómo se pasa el token)
export const getUserById = async (id, token) => {
    try {
        const response = await api.post(`/user/${id}`, { token });
        return response.data;
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        throw handleError(error);
    }
};

// Autenticación con Google
export const googleAuth = async (tokenId) => {
    try {
        const response = await api.post('/google-auth', { tokenId });
        return response.data;
    } catch (error) {
        console.error('Error en autenticación con Google:', error);
        throw handleError(error);
    }
};

// Crear producto
export const createProduct = async (productData, token) => {
    try {
        const response = await api.post('/products', { ...productData, token });
        return response.data;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw handleError(error);
    }
};

// Obtener todos los productos
export const getAllProducts = async (token) => {
    try {
        const response = await api.post('/products', { token });
        return response.data;
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        throw handleError(error);
    }
};

// Actualizar producto
export const updateProduct = async (id, productData, token) => {
    try {
        const response = await api.put(`/products/${id}`, { ...productData, token });
        return response.data;
    } catch (error) {
        console.error('Error actualizando producto:', error);
        throw handleError(error);
    }
};

// Eliminar producto
export const deleteProduct = async (id, token) => {
    try {
        const response = await api.delete(`/products/${id}`, {
            data: { token },
        });
        return response.data;
    } catch (error) {
        console.error('Error eliminando producto:', error);
        throw handleError(error);
    }
};
