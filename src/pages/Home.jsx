import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../assets/styles/stylesPages/main-view.css';
import logoGranBazar from '../assets/images/Gran-Bazar-removebg-preview (2).png';
import MenuDesktop from '../components/MenuDesktop';
import MenuMobile from '../components/MenuMobile';
import Footer from '../components/Footer';

const Home = () => {
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        console.log("Datos guardados en Redux:", authData);
    }, [authData, dispatch]);

    return (
        <div>
            <header>
                <MenuMobile logo={logoGranBazar} />
                <MenuDesktop logo={logoGranBazar} />
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
