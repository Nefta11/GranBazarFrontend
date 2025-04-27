import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // URL de la API
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

// Función para registrar un nuevo usuario
const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data; // Retorna la información del usuario creado
    } catch (error) {
        const { message, status } = handleError(error);
        const customError = new Error(message);
        customError.status = status;
        throw customError;
    }
};

// Función para iniciar sesión
const auth = async (email, password) => {
    try {
        const response = await api.post('/auth', { email, password });
        console.log('Respuesta de auth:', response.data); // Para depuración
        return response.data; // Retorna la información del usuario creado
    } catch (error) {
        const { message, status } = handleError(error);
        const customError = new Error(message);
        customError.status = status;
        throw customError;
    }
};

// Función modificada para obtener un usuario por ID (con mejoras para el manejo de token)
const getUser = async () => {
    try {
        // Obtener el ID del usuario desde el localStorage
        const storedAuthData = localStorage.getItem('authData');
        if (!storedAuthData) {
            throw new Error('No hay sesión activa');
        }

        const parsedAuthData = JSON.parse(storedAuthData);
        const id = parsedAuthData?.user?.id;

        if (!id) {
            throw new Error('ID de usuario no disponible');
        }

        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error en getUser:', error);
        throw error;
    }
};

// Función para autenticarse con Google
const googleAuth = async (tokenId) => {
    try {
        const response = await api.post('/google-auth', { tokenId });
        return response.data;
    } catch (error) {
        const { message, status } = handleError(error);
        const customError = new Error(message);
        customError.status = status;
        throw customError;
    }
};

// Función para crear un nuevo producto (requiere token)
const createProduct = async (productData, token) => {
    try {
        const response = await api.post('/products', productData, {
            headers: {
                'auth-token': token, // Enviar el token en los encabezados
            },
        });
        return response.data;
    } catch (error) {
        const { message, status } = handleError(error);
        const customError = new Error(message);
        customError.status = status;
        throw customError;
    }
};

// Función para obtener todos los productos (requiere token)
const getAllProducts = async (token) => {
    try {
        const response = await api.get('/products', {
            headers: {
                'auth-token': token, // Enviar el token en los encabezados
            },
        });
        return response.data;
    } catch (error) {
        const { message, status } = handleError(error);
        const customError = new Error(message);
        customError.status = status;
        throw customError;
    }
};

// Función para actualizar un producto (requiere token)
const updateProduct = async (id, productData, token) => {
    try {
        const response = await api.put(`/products/${id}`, productData, {
            headers: {
                'auth-token': token, // Enviar el token en los encabezados
            },
        });
        return response.data;
    } catch (error) {
        const { message, status } = handleError(error);
        const customError = new Error(message);
        customError.status = status;
        throw customError;
    }
};

// Función para eliminar un producto (requiere token)
const deleteProduct = async (id, token) => {
    try {
        const response = await api.delete(`/products/${id}`, {
            headers: {
                'auth-token': token, // Enviar el token en los encabezados
            },
        });
        return response.data;
    } catch (error) {
        const { message, status } = handleError(error);
        const customError = new Error(message);
        customError.status = status;
        throw customError;
    }
};

export {
    register,
    auth,
    getUser,
    googleAuth,
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
};