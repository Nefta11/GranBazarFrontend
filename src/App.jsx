import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/MyProfile';
import themeManager from './utils/themeManager';

function App() {
  const token = useSelector((state) => state.auth.token);

  // Inicializar el tema global al cargar la aplicación
  useEffect(() => {
    // Inicializa el sistema de tema (aplica el tema guardado o la preferencia del sistema)
    themeManager.initialize();

    // Opcional: detecta cambios en las preferencias del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Solo cambiamos automáticamente si el usuario no ha guardado una preferencia
      if (localStorage.getItem('darkMode') === null) {
        themeManager.applyTheme(e.matches);
      }
    };

    // Agregar listener para cambios en la preferencia del sistema
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback para navegadores antiguos
      mediaQuery.addListener(handleChange);
    }

    // Limpieza al desmontar
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback para navegadores antiguos
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Home"
            element={token ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/Profile"
            element={token ? <Profile /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;