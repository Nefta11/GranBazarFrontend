// src/utils/themeManager.js

/**
 * Maneja el tema global de la aplicación (claro/oscuro)
 */
const themeManager = {
    // Obtiene el tema actual guardado o detecta preferencias del sistema
    getTheme: () => {
        const savedTheme = localStorage.getItem('darkMode');

        if (savedTheme !== null) {
            return savedTheme === 'true';
        }

        // Si no hay tema guardado, detecta preferencias del sistema
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    // Aplica el tema (dark o light) al body del documento
    applyTheme: (isDarkMode) => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    },

    // Guarda la preferencia del usuario en localStorage y aplica el tema
    setTheme: (isDarkMode) => {
        localStorage.setItem('darkMode', isDarkMode);
        themeManager.applyTheme(isDarkMode);
    },

    // Alterna entre los temas claro y oscuro
    toggleTheme: () => {
        const currentTheme = themeManager.getTheme();
        themeManager.setTheme(!currentTheme);
        return !currentTheme;
    },

    // Inicializa el tema al cargar la aplicación
    initialize: () => {
        const isDarkMode = themeManager.getTheme();
        themeManager.applyTheme(isDarkMode);

        // Escucha cambios en las preferencias del sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Solo aplicamos automáticamente si el usuario no ha guardado una preferencia
                if (localStorage.getItem('darkMode') === null) {
                    themeManager.applyTheme(e.matches);
                }
            });
        }
    }
};

export default themeManager;