# Gran Bazar

Gran Bazar es una tienda en línea que ofrece los mejores productos y ofertas. Este proyecto está construido con **React** y **Vite**, utilizando una arquitectura modular y escalable.

## Tecnologías utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida para proyectos modernos.
- **Redux Toolkit**: Manejo del estado global.
- **Framer Motion**: Animaciones fluidas y modernas.
- **SweetAlert2**: Alertas personalizadas.
- **Axios**: Cliente HTTP para consumir APIs.
- **CSS Modules**: Estilos modulares y reutilizables.

## Características principales

- **Autenticación**: Registro e inicio de sesión de usuarios.
- **Gestión de perfil**: Visualización y edición de información personal.
- **Productos destacados**: Sección de ofertas, productos nuevos y recomendados.
- **Modo oscuro**: Soporte para tema claro y oscuro.
- **Diseño responsivo**: Adaptado para dispositivos móviles y de escritorio.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/gran-bazar.git
   cd gran-bazar
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
   ```
   VITE_API_URL=http://localhost:8080/api
   ```

## Ejecución

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
# o
yarn dev
```

El proyecto estará disponible en [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run preview`: Previsualiza la versión de producción.
- `npm run lint`: Ejecuta ESLint para analizar el código.

## Estructura del proyecto

```plaintext
src/
├── app/                # Configuración global (Redux, rutas, tema)
├── features/           # Funcionalidades principales (auth, profile, products)
├── shared/             # Componentes y utilidades reutilizables
├── index.jsx           # Punto de entrada principal
```

## Contribución

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

---
¡Gracias por visitar Gran Bazar! 🎉
