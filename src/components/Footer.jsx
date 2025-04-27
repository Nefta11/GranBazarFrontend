import '../assets/styles/stylesComponents/footer.css';

const Footer = () => {
    return (
        <footer>
            <section className="footer-desktop">
                <div className="footer-item__desktop">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4011.1913055687737!2d-97.9584259705053!3d20.238582122701505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smx!4v1691865537809!5m2!1sen!2smx"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="location"
                        title="Ubicación Gran Bazar Desktop"
                    ></iframe>
                </div>
                <div className="footer-item__desktop two">
                    <p>Encuentranos en nuestras redes sociales</p>
                    <div className="icons-footer-content">
                        <i className='bx bxl-facebook-square'></i> <br />
                        <i className='bx bxl-instagram-alt'></i> <br />
                        <i className='bx bxl-tiktok'></i>
                    </div>
                </div>
            </section>
            <section className="footer-mobile">
                <p className="texto-footer-mobile">Visitanos</p>
                <div className="footer-item__desktop">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4011.1913055687737!2d-97.9584259705053!3d20.238582122701505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smx!4v1691865537809!5m2!1sen!2smx"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="location"
                        title="Ubicación Gran Bazar Mobile"
                    ></iframe>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
