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
        // Error con la respuesta de la API, devolvemos el mensaje de error específico
        return {
            message: error.response.data.message || 'Algo salió mal',
            status: error.response.status || 500, // Código de estado del error
        };
    } else if (error.request) {
        // No se recibió respuesta, retornamos un mensaje de error genérico
        return {
            message: 'No se pudo conectar con el servidor',
            status: 503, // Error de servicio no disponible
        };
    } else {
        // Otro tipo de error, retornamos el mensaje del error
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

// Obtener usuario por ID
export const getUserById = async (id, token) => {
    try {
        const response = await api.get(`/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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
        const response = await api.post('/products', productData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw handleError(error);
    }
};

// Obtener todos los productos
export const getAllProducts = async (token) => {
    try {
        const response = await api.get('/products', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        throw handleError(error);
    }
};

// Actualizar producto
export const updateProduct = async (id, productData, token) => {
    try {
        const response = await api.put(`/products/${id}`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error eliminando producto:', error);
        throw handleError(error);
    }
};
