import React from 'react';
import '../assets/styles/main-view.css'; // Importa el archivo CSS
import logoGranBazar from '../assets/images/logo_gran_bazar.jpeg'; // Importa la imagen
import MenuDesktop from '../components/MenuDesktop';
import MenuMobile from '../components/MenuMobile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'; // Importa el nuevo componente Footer

const Home = () => {
    return (
        <div>
            <header>
                <MenuDesktop logo={logoGranBazar} />
                <MenuMobile logo={logoGranBazar} />
                <NavBar />
                <div className="nav-menu">
                    {/* Aquí puedes agregar los enlaces de navegación */}
                </div>
            </header>
            <main>
                <h1 className="title-section">Ofertas de HASTA un 80%</h1>
                <section className="oferts section">
                    {/* Aquí puedes agregar los productos */}
                </section>
                <h2 className="title-section">Lo más nuevo</h2>
                <section className="most-new section">
                    {/* Aquí puedes agregar los productos */}
                </section>
                <h2 className="title-section">Lo más solicitado</h2>
                <section className="most-requested section">
                    {/* Aquí puedes agregar los productos */}
                </section>
                <h2 className="title-section">Lo más recomendado</h2>
                <section className="recommended section">
                    {/* Aquí puedes agregar los productos */}
                </section>
            </main>
            <Footer /> {/* Utiliza el nuevo componente Footer */}
        </div>
    );
};

export default Home;
