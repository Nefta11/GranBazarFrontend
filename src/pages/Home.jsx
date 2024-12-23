import React from 'react';
import '../assets/styles/main-view.css';
import logoGranBazar from '../assets/images/logo_gran_bazar.jpeg'; 
import MenuDesktop from '../components/MenuDesktop';
import MenuMobile from '../components/MenuMobile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'; 

const Home = () => {
    return (
        <div>
            <header>
                <div className="menu-desktop">
                    <MenuDesktop logo={logoGranBazar} />
                </div>
                <div className="menu-mobile">
                    <MenuMobile logo={logoGranBazar} />
                </div>
                <NavBar />
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
