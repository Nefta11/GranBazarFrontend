import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { googleAuth } from '../../services/Api';
import { logIn } from '../../features/authSlice';
import logoGoogle from "../../assets/images/google.png";
import '../../assets/styles/stylesPages/AuthStyles/Login.css';

const GoogleB = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        try {
            const { tokenId } = response;
            const userData = await googleAuth(tokenId);
            dispatch(logIn(userData));
            navigate('/Home');
        } catch (error) {
            console.error('Error en la autenticación con Google:', error);
        }
    };

    const handleFailure = (error) => {
        console.error('Error en la autenticación con Google:', error);
    };

    return (
        <GoogleLogin
            clientId="466150988702-7oi0qkmt99ulrdk6al861k7mffb4phtp.apps.googleusercontent.com"
            buttonText="Continuar con Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            redirectUri="http://localhost:3000"
            render={renderProps => (
                <button className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img src={logoGoogle} alt="Google logo" className="google-icon" />
                    Continuar con Google
                </button>
            )}
        />
    );
};

export default GoogleB;