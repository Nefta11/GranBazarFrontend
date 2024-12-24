import React from "react";
import logoGoogle from "../../assets/images/google.png"
import '../../assets/styles/stylesPages/AuthStyles/Login.css';

const GoogleB = () => {
    return (
        <button className="google-button">
            <img src={logoGoogle} alt="Google logo" className="google-icon" />
            Continuar con Google
        </button>
    );
};

export default GoogleB;